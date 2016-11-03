import ValidationUtil from './validation-util';

class Try {

    constructor(err, result) {
        this.err = err;
        this.result = result;
    }

    filter() {}

    flatMap() {}

    getOrElse() {}

    isFailure() {}

    isSuccess() {}

    map() {}

    onFailure() {}

    onSuccess() {}

    orElse() {}

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
