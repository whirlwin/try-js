import Success from './try-success';
import Failure from './try-failure';

const REJECTED = 'rejected';

class TryPromise {

    constructor(promise) {
        this.promise = promise;
    }

    flatMap(fn) {
        return new TryPromise(this.promise.then(value => {
            if (value.try_state !== REJECTED) {
                const result = fn(value);
                if (result instanceof Success) {
                    return result.result;
                } else if (result instanceof Failure) {
                    return { try_state: REJECTED };
                } else {
                    return result.promise;
                }
            } else {
                return value;
            }
        }).catch(err => ({ try_state: REJECTED })));
    }

    map(fn) {
        return new TryPromise(this.promise.then(value => {
            if (value.try_state !== REJECTED) {
                return fn(value);
            } else {
                return value;
            }
        }).catch(err => ({ try_state: REJECTED })));
    }

    onFailure(fn) {
        return new TryPromise(this.promise.then(value => {
            if (value.try_state === REJECTED) {
                fn(value);
            }
            return value;
        }).catch(err => ({ try_state: REJECTED })));
    }

    onSuccess(fn) {
        return new TryPromise(this.promise.then(value => {
            if (value.try_state !== REJECTED) {
                fn(value);
            }
            return value;
        }).catch(err => ({ try_state: REJECTED })));
    }

    orElse(fn) {

    }

    peek(fn) {
        return new TryPromise(this.promise.then(value => {
            if (value.try_state !== REJECTED) {
                fn(value);
            }
            return value;
        }).catch(err => ({ try_state: REJECTED })));
    }

    peekFailure(fn) {
        return new TryPromise(this.promise.then(value => {
            if (value.try_state !== REJECTED) {
                fn(value);
            }
            return value;
        }).catch(err => ({ try_state: REJECTED })));
    }
}

export default TryPromise;