import Try from './try';
import ValidationUtil from './validation-util';

class Success extends Try {

    constructor(result) {
        super(null, result);
    }

    map(fn) {
        ValidationUtil.validatePresenceOfFunction(fn).orThrow("(arg1 - function) not provided for function map");
        return new Success(fn(this.result));
    }

    flatMap(fn) {
        ValidationUtil.validatePresenceOfFunction(fn).orThrow('(arg1 - function) not provided for function flatMap');
    }

    peek(fn) {
        ValidationUtil.validatePresenceOfFunction(fn).orThrow("(arg1 - function) not provided for function peek");
        fn(this.result);
        return new Success(this.result);
    }

    peekFailure(fn) {
        return new Success(this.result);
    }

    resolve(successFn, failureFn) {
        super.resolve(successFn, failureFn);
        return successFn(this.result);
    }
}

export default Success;
