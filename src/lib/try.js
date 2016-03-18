class Try {

    constructor(result, err) {
        this.result = result;
        this.err = err;
    }

    static exec(fn) {
        try {
            return new Success(fn());
        } catch (err) {
            return new Failure(err);
        }
    }

    map(fn) {}

    peek(fn) {}

    peekFailure(fn) {}

    resolve(successFn, failureFn) {
        if (!successFn) {
            throw new Error("(arg 1 - function) not provided for function resolve");
        } else if (!failureFn) {
            throw new Error("(arg 2 - function) not provided for function resolve");
        }
    }
}

class Success extends Try {

    constructor(result) {
        super(result, null);
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

class Failure extends Try {

    constructor(err) {
        super(null, err);
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

export default Try;
