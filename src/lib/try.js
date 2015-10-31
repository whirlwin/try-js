class Try {

    constructor(result, err) {
        this.result = result;
        this.err = err;
    }

    exec(fn) {
        try {
            return new Try(fn(), null);
        } catch (err) {
            return new Try(null, err);
        }
    }

    map(fn) {
        if (!this.err) {
            return new Try(fn(this.result), null);
        } else {
            return new Try(null, this.err);
        }
    }

    resolve(successFn, failureFn) {
        if (!successFn) {
            throw new Error("Success function (arg 1) not provided for Try.resolve");
        } else if (!failureFn) {
            throw new Error("Failure function (arg 2) not provided for Try.resolve");
        }

        if (this.err) {
            return failureFn(this.err);
        } else {
            return successFn(this.result);
        }
    }
}

module.exports = Try;
