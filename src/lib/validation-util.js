class ValidationUtil {

    static requireNonNull(value, errMsg) {
        if (value == null) {
            throw new Error(errMsg);
        }
    }

    static requireNonNullFunction(value, errMsg) {
        if (value === null || typeof value !== 'function') {
            throw new Error(errMsg);
        }
    }

    static isFunction(fn) {
        return fn != null && typeof fn === 'function';
    }
}

export default ValidationUtil;
