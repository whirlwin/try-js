import Success from './lib/success';
import Failure from './lib/failure';
import TryPromise from './lib/try-promise';

function of(fn) {
    if (!fn) {
        throw new Error('Function not provided for Try.of');
    } else {
        try {
            const result = fn();
            if (result instanceof Promise) {
                return new TryPromise(result);
            } else {
                return new Success(fn());
            }
        } catch (err) {
            return new Failure(err);
        }
    }
}

function success(result) {
    return new Success(result);
}

function failure(err) {
    return new Failure(err);
}

export { of, success, failure };

