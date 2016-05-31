class ValidationUtil {

    constructor(validator) {
        this.validator = validator;
    }

    static validatePresenceOfFunction(fn) {
        return new ValidationUtil((errMsg) => {
            if (!fn || typeof fn !== 'function') {
                throw new Error(errMsg);
            }
        });
    }

    orThrow(errMsg) {
        this.validator(errMsg);
    }
}

export default ValidationUtil;
