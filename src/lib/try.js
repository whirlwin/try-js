import ValidationUtil from './validation-util';

class Try {

    constructor(err, result) {
        this.err = err;
        this.result = result;
    }

    flatMap() {}

    getOrElse() {}

    isFailure() {}

    isSuccess() {}

    map() {}

    peek() {}

    peekFailure() {}

    resolve(successFn, failureFn) {
        ValidationUtil.validatePresenceOfFunction(successFn)
            .orThrow('(arg 1 - function) not provided for function resolve');
        ValidationUtil.validatePresenceOfFunction(failureFn)
            .orThrow('(arg 2 - function) not provided for function resolve');
    }
}

export default Try;
