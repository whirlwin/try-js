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

    getOrElse(value) {
        return value;
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
        ValidationUtil.requireNonNull(fn, '(arg1 - function) not provided for function onFailure');
        fn(this.result);
        return new Failure(this.err);
    }

    onSuccess(fn) {
        ValidationUtil.requireNonNull(fn, '(arg1 - function) not provided for function onSuccess');
        return new Failure(this.err);
    }

    orElse(fn) {
        ValidationUtil.requireNonNull(fn, '(arg1 - function) not provided for function orElse');
        return fn();
    }

    peek() {
        return new Failure(this.err);
    }

    peekFailure(fn) {
        DeprecationUtil.notifyDeprecation('peekFailure() is deprecated - use onFailure instead');
        return this.onFailure(fn);
    }

    resolve(successFn, failureFn) {
        super.resolve(successFn, failureFn);
        return failureFn(this.err);
    }
}

export default Failure;
