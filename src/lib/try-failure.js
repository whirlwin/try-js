import Try from './try';

class Failure extends Try {

    constructor(err) {
        super(err, null);
        this.err = err;
    }

    map() {
        return new Failure(this.err);
    }

    peek() {
        return new Failure(this.err);
    }

    peekFailure(fn) {
        if (!fn) {
            throw new Error("(arg1 - function) not provided for peekFailure function");
        }
        fn(this.err);
        return new Failure(this.err);
    }

    resolve(successFn, failureFn) {
        super.resolve(successFn, failureFn);
        return failureFn(this.err);
    }
}

export default Failure;
