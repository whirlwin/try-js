const assert = require('assert');
const mocha = require('mocha');
const Try = require('../dist');

mocha.describe('Success', () => {

    mocha.describe('.filter()', () => {

        mocha.it('should return success when filter predicate matches', () => {
            var success = Try.success(100)
                .filter(value => value > 50);
            assert(success.isSuccess());
        });

        mocha.it('should return failure when predicate does not match', () => {
            var success = Try.success(100)
                .filter(value => value > 500);
            assert(success.isFailure());
        });

        mocha.it('should throw error when function argument is not present', () => {
            var success = Try.success(100);
            assert.throws(() => success.filter());
        });

        mocha.it('should throw error when function argument is not a function', () => {
            var success = Try.success(100);
            assert.throws(() => success.filter({}), Error);
        });

    });

    mocha.describe('.flapMap()', () => {

        mocha.it('should flat map success try value', () => {
            var success = Try.success(100)
                .flatMap(value => Try.success(value + 10));
            assert(success.isSuccess());
            assert.equal(success.value, 110);
        });

        mocha.it('should not flat map failure try value', () => {
            var failure = Try.success(100)
                .flatMap(value => Try.failure('Something went wrong'));
            assert(failure.isFailure());
            assert.equal(failure.err, 'Something went wrong');
        });

        mocha.it('should throw error when function argument is not present', () => {
            var success = Try.success(100);
            assert.throws(() => success.flatMap());
        });

        mocha.it('should throw error when function argument is not a function', () => {
            var success = Try.success(100);
            assert.throws(() => success.flatMap({}));
        });

    });
});
