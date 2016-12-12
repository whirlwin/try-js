import Try from './try';
import TryPromise from './try-promise';

class ValidationUtil {

    static requireNonNull(value, errMsg) {
        if (value == null) {
            throw new Error(errMsg);
        }
    }

    static requireFunction(value, errMsg) {
        if (typeof value !== 'function') {
            throw new Error(errMsg);
        }
    }

    static requireNonNullFunction(value, errMsg) {
        ValidationUtil.requireFunction(value, errMsg);
        ValidationUtil.requireNonNull(value, errMsg);
    }

    static requireNonPromise(value, errMsg) {
        if (value instanceof Promise) {
            throw new Error(errMsg);
        }
    }

    static requireTry(value, errMsg) {
        if (!ValidationUtil.isTry(value)) {
            throw new Error(errMsg);
        }
    }

    static isTry(value) {
        return (value instanceof Try || value instanceof TryPromise);
    }

    static isFunction(fn) {
        return fn != null && typeof fn === 'function';
    }
}

export default ValidationUtil;
