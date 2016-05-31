import Success from './lib/try-success';
import Failure from './lib/try-failure';

const of = (fn) => {
    if (!fn) {
        throw new Error('Function not provided for Try.of');
    } else {
        try {
            return new Success(fn());
        } catch (err) {
            return new Failure(err);
        }
    }
};

export { of };

