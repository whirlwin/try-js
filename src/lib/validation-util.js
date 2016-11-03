class ValidationUtil {

    constructor(validator) {
        this.validator = validator;
    }

    static requireNonNull(value, errMsg) {
        if (value == null) {
            throw new Error(errMsg);
        }
    }

    static isFunction(fn) {
        return fn != null && typeof fn === 'function';
    }
}

export default ValidationUtil;
