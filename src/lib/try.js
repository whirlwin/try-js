class Try {

    constructor(err, result) {
        this.err = err;
        this.result = result;
    }

    map(fn) {}

    flatMap(fn) {}

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

export default Try;
