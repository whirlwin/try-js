class Try {

    constructor(result, err) {
        this.result = result;
        this.err = err;
    }

    static exec(fn) {
        try {
            return new Try(fn(), null);
        } catch (err) {
            return new Try(null, err);
        }
    }

    map(fn) {
        let result;
        if (!this.err) {
            result = new Try(fn(this.result), null);
        } else {
            result = new Try(null, this.err);
        }
        return result;
    }

    resolve(successFn, failureFn) {
        let terminalResult;
        if (!successFn) {
            throw new Error("Success function (arg 1) not provided for Try.resolve");
        } else if (!failureFn) {
            throw new Error("Failure function (arg 2) not provided for Try.resolve");
        }

        if (this.err) {
            terminalResult = failureFn(this.err);
        } else {
            terminalResult = successFn(this.result);
        }
        return terminalResult;
    }
}

module.exports = Try;
