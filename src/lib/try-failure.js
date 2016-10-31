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

    peek() {
        return new Failure(this.err);
    }

    peekFailure(fn) {
        ValidationUtil.validatePresenceOfFunction(fn)
            .orThrow('(arg1 - function) not provided for peekFailure function');
        fn(this.err);
        return new Failure(this.err);
    }

    resolve(successFn, failureFn) {
        super.resolve(successFn, failureFn);
        return failureFn(this.err);
    }
}

export default Failure;
