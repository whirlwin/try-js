import ValidationUtil from './validation-util';

class Try {

    constructor(err, value) {
        this.err = err;
        this.value = value;
    }

    filter() {}

    flatMap() {}

    get() {}

    getOrElse() {}

    isFailure() {}

    isSuccess() {}

    map() {}

    onFailure() {}

    onSuccess() {}

    orElse() {}

    resolve(successFn, failureFn) {
        ValidationUtil.requireNonNullFunction(successFn, '(arg 1 - function) not provided for function resolve');
        ValidationUtil.requireNonNullFunction(failureFn, '(arg 2 - function) not provided for function resolve');
    }
}

export default Try;
