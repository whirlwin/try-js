import DeprecationUtil from './deprecation-util';
import Try from './try';
import ValidationUtil from './validation-util';

class Failure extends Try {

    constructor(err) {
        super(err, null);
        this.err = err;
    }

    filter() {
        return new Failure(this.err);
    }

    flatMap() {
        return new Failure(this.err);
    }

    get() {
        throw new Error('Cannot call get on a failure Try');
    }

    getOrElse(value) {
        return value;
    }

    getOrElseThrow(fn) {
        ValidationUtil.requireNonNullFunction(fn, '(arg1 - function) not provided for function onSuccess');
    }

    isFailure() {
        return true;
    }

    isSuccess() {
        return false;
    }

    map() {
        return new Failure(this.err);
    }

    onFailure(fn) {
        ValidationUtil.requireNonNullFunction(fn, '(arg1 - function) not provided for function onFailure');
        fn(this.err);
        return new Failure(this.err);
    }

    onSuccess(fn) {
        ValidationUtil.requireNonNullFunction(fn, '(arg1 - function) not provided for function onSuccess');
        return new Failure(this.err);
    }

    orElse(fn) {
        ValidationUtil.requireNonNullFunction(fn, '(arg1 - function) not provided for function orElse');
        return fn();
    }

    resolve(successFn, failureFn) {
        super.resolve(successFn, failureFn);
        return failureFn(this.err);
    }
}

export default Failure;
