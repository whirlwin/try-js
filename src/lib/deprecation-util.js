import ValidationUtil from './validation-util';

class DeprecationUtil {

    static notifyDeprecation(msg) {
        if (console && ValidationUtil.isFunction(console.log)) {
            console.log(msg);
        }
    }
}

export default DeprecationUtil;
