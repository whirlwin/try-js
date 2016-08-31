import Success from './lib/try-success';
import Failure from './lib/try-failure';
import TypeUtils from './lib/type-utils';

function of(fn) {
    if (!fn) {
        throw new Error('Function not provided for Try.of');
    } else {
        try {
            return new Success(fn());
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

