import DeprecationUtil from './deprecation-util';
import Failure from './failure';
import Try from './try';
import ValidationUtil from './validation-util';

class Success extends Try {

    constructor(value) {
        super(null, value);
    }

    filter(fn) {
        ValidationUtil.requireNonNull(fn,'(arg1 - function) not provided for function filter');
        const shouldProceed = fn.call(this, this.value);
        if (shouldProceed) {
            return new Success(this.value);
        } else {
            return new Failure(new Error('Element did not match filter predicate'));
        }
    }

    flatMap(fn) {
        ValidationUtil.requireNonNull(fn, '(arg1 - function) not provided for function flatMap');
        return fn.call(this, this.value);
    }

    getOrElse() {
        return this.value;
    }

    isFailure() {
        return false;
    }

    isSuccess() {
        return true;
    }

    map(fn) {
        ValidationUtil.requireNonNull(fn, '(arg1 - function) not provided for function map');
        return new Success(fn(this.value));
    }

    onFailure(fn) {
        ValidationUtil.requireNonNull(fn, '(arg1 - function) not provided for function onFailure');
        return new Success(this.value);
    }

    onSuccess(fn) {
        ValidationUtil.requireNonNull(fn, '(arg1 - function) not provided for function onSuccess');
        fn(this.value);
        return new Success(this.value);
    }

    orElse() {
        return new Success(this.value);
    }

    peek(fn) {
        DeprecationUtil.notifyDeprecation('peek() is deprecated - use onSuccess instead');
        this.onSuccess(fn);
    }

    peekFailure() {
        return new Success(this.value);
    }

    resolve(successFn, failureFn) {
        super.resolve(successFn, failureFn);
        return successFn(this.value);
    }
}

export default Success;
