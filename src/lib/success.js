import Failure from './failure';
import Try from './try';
import ValidationUtil from './validation-util';

class Success extends Try {

    constructor(value) {
        super(null, value);
    }

    filter(fn) {
        ValidationUtil.requireNonNullFunction(fn, '(arg1 - function) not provided for function filter');
        const predicateMatch = fn.call(this, this.value);
        if (predicateMatch) {
            return new Success(this.value);
        } else {
            return new Failure(new Error('Element did not match filter predicate'));
        }
    }

    flatMap(fn) {
        ValidationUtil.requireNonNullFunction(fn, '(arg1 - function) not provided for function flatMap');
        const result = fn.call(this, this.value);
        ValidationUtil.requireTryOrTryPromise(result, 'Argument to flatMap was not a Try');
        return result;
    }

    get() {
        return this.value;
    }

    getOrElse() {
        return this.value;
    }

    getOrElseThrow(fn) {
        ValidationUtil.requireNonNullFunction(fn, '(arg1 - function) not provided for function onSuccess');
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

    resolve(successFn, failureFn) {
        super.resolve(successFn, failureFn);
        return successFn(this.value);
    }
}

export default Success;
