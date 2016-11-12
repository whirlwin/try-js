const assert = require('assert');
const mocha = require('mocha');
const Try = require('../dist');

mocha.describe('Success', () => {

    mocha.describe('.filter()', () => {

        mocha.it('should return success when filter predicate matches', () => {
            let success = Try.success(100)
                .filter(value => value > 50);
            assert(success.isSuccess());
        });

        mocha.it('should return failure when predicate does not match', () => {
            let success = Try.success(100)
                .filter(value => value > 500);
            assert(success.isFailure());
        });

        mocha.it('should throw error when function argument is not present', () => {
            let success = Try.success(100);
            assert.throws(() => success.filter());
        });

        mocha.it('should throw error when function argument is not a function', () => {
            let success = Try.success(100);
            assert.throws(() => success.filter({}), Error);
        });
    });

    mocha.describe('.flapMap()', () => {

        mocha.it('should flat map success try value', () => {
            let success = Try.success(100)
                .flatMap(value => Try.success(value + 10));
            assert(success.isSuccess());
            assert.equal(success.value, 110);
        });

        mocha.it('should not flat map failure try value', () => {
            let failure = Try.success(100)
                .flatMap(value => Try.failure('Something went wrong'));
            assert(failure.isFailure());
            assert.equal(failure.err, 'Something went wrong');
        });

        mocha.it('should throw error when function argument is not present', () => {
            let success = Try.success(100);
            assert.throws(() => success.flatMap());
        });

        mocha.it('should throw error when function argument is not a function', () => {
            let success = Try.success(100);
            assert.throws(() => success.flatMap({}));
        });
    });

    mocha.describe('.getOrElse()', () => {

        mocha.it('should get alternative value upon failure', () => {
            let failure = Try.failure('Boom!');
            assert.equal(failure.getOrElse('foobar'), 'foobar');
        });
    });

    mocha.describe('.isFailure()', () => {

        mocha.it('should indicate that a failure is a failure', () => {
            let failure = Try.failure('Oh no!');
            assert(failure.isFailure());
        });

        mocha.it('should indicate that a success is not a failure', () => {
            let success = Try.success(100);
            assert(!success.isFailure());
        });
    });

    mocha.describe('.isSuccess()', () => {

        mocha.it('should indicate that a success is a success', () => {
            let success = Try.success(100);
            assert(success.isSuccess());
        });

        mocha.it('should indicate that a failure is not a success', () => {
            let failure = Try.failure('Hmpf!');
            assert(!failure.isSuccess());
        });
    });

    mocha.describe('.map()', () => {

        mocha.it('should map a success value', () => {
            let value = Try.success(100)
                .map(value => value + 10)
                .get();

            assert.equal(value, 110);
        });
    });
});
