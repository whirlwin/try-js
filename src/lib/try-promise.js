import Success from './success';
import Failure from './failure';

const REJECTED = 'rejected';
const RESOLVED = 'resolved';

class TryPromise {

    constructor(promise) {
        this.promise = promise;
    }

    filter(fn) {
        return new TryPromise(this.promise.then(value => {
            if (value.try_state !== REJECTED) {
                let predicateMatch = fn(value);
                if (predicateMatch) {
                    return value;
                } else {
                    return { try_state: REJECTED };
                }
            }
        }).catch(err => ({ try_state: REJECTED })));
    }

    flatMap(fn) {
        return new TryPromise(this.promise.then(value => {
            if (value.try_state !== REJECTED) {
                let result = fn(value);
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

    get() {
        return this.promise;
    }

    getOrElse(val) {
        return new TryPromise(this.promise.then(value => {
            if (value.try_state !== REJECTED) {
                return val;
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
        return new TryPromise(this.promise.then(value => {
            if (value.try_state === REJECTED) {
                let result = fn(value);
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
}

export default TryPromise;