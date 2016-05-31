import Try from './try';
import ValidationUtil from './validation-util';

class Success extends Try {

    constructor(result) {
        super(null, result);
    }

    getOrElse() {
        return this.result;
    }

    flatMap(fn) {
        ValidationUtil.validatePresenceOfFunction(fn)
            .orThrow('(arg1 - function) not provided for function flatMap');
        return fn.call(this, this.result);
    }

    isFailure() {
        return false;
    }

    isSuccess() {
        return true;
    }

    map(fn) {
        ValidationUtil.validatePresenceOfFunction(fn)
            .orThrow('(arg1 - function) not provided for function map');
        return new Success(fn(this.result));
    }

    peek(fn) {
        ValidationUtil.validatePresenceOfFunction(fn)
            .orThrow('(arg1 - function) not provided for function peek');
        fn(this.result);
        return new Success(this.result);
    }

    peekFailure() {
        return new Success(this.result);
    }

    resolve(successFn, failureFn) {
        super.resolve(successFn, failureFn);
        return successFn(this.result);
    }
}

export default Success;
