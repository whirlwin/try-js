import Try from './try';

class Success extends Try {

    constructor(result) {
        super(null, result);
    }

    map(fn) {
        if (!fn) {
            throw new Error("(arg1 - function) not provided for function map")
        }
        return new Success(fn(this.result));
    }

    peek(fn) {
        if (!fn) {
            throw new Error("(arg1 - function) not provided for function peek")
        }
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
