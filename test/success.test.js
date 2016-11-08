const assert = require('assert');
const chai = require('chai');
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
});