import Success from './success';
import Failure from './failure';
import TryError from './try-error';
import ValidationUtil from './validation-util';

class TryPromise {

    constructor(promise) {
        this.promise = promise.catch(err => new TryError(err));
    }

    filter(fn) {
        return new TryPromise(this.promise.then(value => {
            ValidationUtil.requireNonNullFunction(fn, '(arg1 - function) not provided for function filter');
            if (!(value instanceof TryError)) {
                let predicateMatch = fn(value);
                if (predicateMatch) {
                    return value;
                } else {
                    return new TryError(`filter did not match for value ${value}`);
                }
            } else {
                return value;
            }
        }).catch(err => new TryError(err) ));
    }

    flatMap(fn) {
       return new TryPromise(this.promise.then(value => {
            ValidationUtil.requireNonNullFunction(fn, '(arg1 - function) not provided for function flatMap');
            if (!(value instanceof TryError)) {
                let result = fn(value);
                if (result instanceof Success) {
                    return result.result;
                } else if (result instanceof Failure) {
                    return new TryError(`flatMap yielded failure with err "${result.err}"`);
                } else {
                    return result.promise;
                }
            } else {
                return value;
            }
        }).catch(err => new TryError(err) ));
    }

    get() {
        return this.promise;
    }

    getOrElse(val) {
        return new TryPromise(this.promise.then(value => {
            if (!(value instanceof TryError)) {
                return val;
            } else {
                return value;
            }
        }).catch(err => new TryError(err)));
    }

    map(fn) {
        return new TryPromise(this.promise.then(value => {
            if (!(value instanceof TryError)) {
                return fn(value);
            } else {
                return value;
            }
        }).catch(err => new TryError(err)));
    }

    onFailure(fn) {
        return new TryPromise(this.promise.then(value => {
            if (value instanceof TryError) {
                fn(value);
            }
            return value;
        }).catch(err => {
            if (typeof err != 'undefined') {
                fn(err);
            }
            return new TryError(err)
        }));
    }

    onSuccess(fn) {
        return new TryPromise(this.promise.then(value => {
            if (!(value instanceof TryError)) {
                fn(value);
            }
            return value;
        }).catch(err => new TryError(err)));
    }

    orElse(fn) {
        return new TryPromise(this.promise.then(value => {
            if (value instanceof TryError) {
                let result = fn(value);
                if (result instanceof Success) {
                    return result.result;
                } else if (result instanceof Failure) {
                    return new TryError(`orElse yielded failure for value ${value}`);
                } else {
                    return result.promise;
                }
            } else {
                return value;
            }
        }).catch(err => {
            if (typeof err != 'undefined') {
                return fn(err).value;
            } else {
                return new TryError(err)
            }
        }));
    }
}

export default TryPromise;
