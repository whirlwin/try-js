//const Try = require("./lib/try");
import Try from "./lib/try";

const of = (fn) => {
    if (!fn) {
        throw new Error("Function not provided for Try.of");
    }
    return Try.exec(fn);
};

module.exports = {
    of: of
};
