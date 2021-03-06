import Failure from './lib/failure';
import Success from './lib/success';
import TryPromise from './lib/try-promise';
import ValidationUtil from './lib/validation-util';

function of(fn) {
    if (!fn) {
        throw new Error('Function not provided for Try.of');
    } else {
        try {
            const result = fn();
            if (result instanceof Promise) {
                return new TryPromise(result);
            } else {
                return new Success(result);
            }
        } catch (err) {
            return new Failure(err);
        }
    }
}

function success(result) {
    ValidationUtil.requireNonPromise(result, 'Value provided for Try.success is a promise. Use Try.of instead');
    return new Success(result);
}

function failure(err) {
    ValidationUtil.requireNonPromise(err, 'Value provided for Try.success is a promise. Use Try.of instead');
    return new Failure(err);
}

export { of, success, failure };

