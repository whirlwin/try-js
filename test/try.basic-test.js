const assert = require('assert');
const mocha = require('mocha');
const Try = require('../dist');
const TryError = require('../dist/lib/try-error');

mocha.describe('Try', () => {

    mocha.describe('.failure()', () => {

        mocha.it('should yield try failure', () => {
            let failure = Try.failure('No');
            assert(failure.isFailure());
        });

        mocha.it('should not accept promise argument', () => {
            assert.throws(() => Try.failure(Promise.reject('No').catch(() => {})), Error);
        });
    });

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

        mocha.it('should not invoke filter for failure', () => {
            Try.failure('Err')
                .filter(value => assert.fail(null, null, 'should not be invoked: value ' + value, null))
        });

        mocha.it('should throw error when function argument is not present', () => {
            let success = Try.success(100);
            assert.throws(() => success.filter());
        });

        mocha.it('should throw error when function argument is not a function', () => {
            let success = Try.success(100);
            assert.throws(() => success.filter({}), Error);
        });

        mocha.it('should yield TryError when filter predicate does not match', done => {
            Try.of(() => Promise.resolve(100))
                .filter(value => value > 500)
                .onFailure(err => {
                    assert(err instanceof TryError.default);
                    done();
                });
        });

        mocha.it('should return success promise when filter predicate matches', done => {
            Try.of(() => Promise.resolve(100))
                .filter(value => value > 50)
                .onSuccess(value => {
                    assert.equal(value, 100);
                    done();
                });
        });

        mocha.it('should return failure promise when filter predicate does not match', (done) => {
            Try.of(() => Promise.resolve(100))
                .filter(value => value > 500)
                .onFailure(err => done());
        });

        mocha.it('should not invoke filter for failure promise', () => {
            Try.of(() => Promise.reject('Err'))
                .filter(value => assert.fail(null, null, 'should not be invoked: ' + value, null));
        });
    });

    mocha.describe('.flapMap()', () => {

        mocha.it('should flat map success try value', () => {
            let success = Try.success(100)
                .flatMap(value => Try.success(value + 10));
            assert(success.isSuccess());
            assert.equal(success.value, 110);
        });

        mocha.it('should flat map failure try value', () => {
            let failure = Try.success(100)
                .flatMap(value => Try.failure('Something went wrong'));
            assert(failure.isFailure());
            assert.equal(failure.err, 'Something went wrong');
        });

        mocha.it('should not flat map on failure', () => {
            Try.failure('Err')
                .flatMap(value => assert.fail(null, null, 'should not be invoked: ' + value, null));
        });

        mocha.it('should throw error when filter argument is not present', () => {
            let success = Try.success(100);
            assert.throws(() => success.flatMap());
        });

        mocha.it('should throw error when flatMap argument is not a function', () => {
            let success = Try.success(100);
            assert.throws(() => success.flatMap({}));
        });

        mocha.it('should yield Failure when flapMap yields failure', done => {
            Try.of(() => Promise.resolve('yep'))
                .flatMap(value => Try.failure('ouch'))
                .onFailure(err => {
                    assert(err instanceof TryError.default);
                    assert(err.err.includes('ouch'));
                    done();
                });
        });

        mocha.it('should throw error for Try when flatMap argument does not yield a Try', () => {
            let success = Try.of(() => 'yep');
            assert.throws(() => success.flatMap(value => 'not a Try'));
        });

        mocha.it('should yield failure for promised Try when flatMap argument does not yield a Try', (done) => {
            Try.of(() => Promise.resolve('yep'))
                .flatMap(value => 'not a Try')
                .onFailure(err =>  done());
        });

        mocha.it('should flatMap from try to promised try', (done) => {
            Try.of(() => 'yep')
                .flatMap(value => Try.of(() => Promise.resolve('yes')))
                .onSuccess(value => done());
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

    mocha.describe('.getOrElseThrow()', () => {

        mocha.it('should throw failure when failure', () => {
            let failure = Try.failure('nope');
            assert.throws(() => failure.getOrElseThrow(err => new Error(err)), Error);
        });

        mocha.it('should get value when success', () => {
            let value = Try.success('yep')
                .getOrElseThrow(err => new Error(err));
            assert.equal(value, 'yep');
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

        mocha.it('should not map a failure value', () => {
            Try.failure('Nope')
                .map(value => {
                    assert.fail(null, null, 'should not be called: value ' + value, null);
                });
        });
    });

    mocha.describe('.onFailure()', () => {

        mocha.it('should trigger on a failure', (done) => {
            Try.failure('No')
                .onFailure(err => done());
        });

        mocha.it('should not trigger on a success', (done) => {
            Try.success(100)
                .onFailure(err => done('Should not be invoked'));
            done();
        });

        mocha.it('should not trigger on a success promise', (done) => {
            Try.of(() => Promise.resolve(100))
                .onFailure(err => done('Should not be invoked'));
            done();
        });

        mocha.it('should be invoked in correct order', (done) => {
            let word = '';
            Try.of(() => Promise.reject('no'))
                .onFailure(err => word += 'foo')
                .onFailure(err => word += 'bar')
                .onFailure(err => word += 'baz')
                .onFailure(() => {
                    assert.equal(word, 'foobarbaz');
                    done();
                });
        });

        mocha.it('should throw error when argument is not a function', () => {
            assert.throws(() => Try.failure('nope').onFailure({}), Error);

            assert.throws(() => Try.of(() => Promise.reject('nope')).onFailure({}), Error);
        });
    });

    mocha.describe('.onSuccess()', () => {

        mocha.it('should trigger on a success', (done) => {
            Try.success(100)
                .onSuccess(value => done());
        });

        mocha.it('should not trigger on a failure', (done) => {
            Try.failure('Args!')
                .onSuccess(value => done('Should not be invoked'));
            done();
        });

        mocha.it('should not trigger on a failure promise', (done) => {
            Try.of(() => Promise.reject(100))
                .onSuccess(err => done('Should not be invoked'));
            done();
        });

        mocha.it('should be invoked in correct order', (done) => {
            let word = '';
            Try.of(() => Promise.resolve(100))
                .onSuccess(err => word += 'foo')
                .onSuccess(err => word += 'bar')
                .onSuccess(err => word += 'baz')
                .onSuccess(() => {
                    assert.equal(word, 'foobarbaz');
                    done();
                });
        });

        mocha.it('should throw error when argument is not a function', () => {
            assert.throws(() => Try.success('yep').onSuccess({}), Error);

            assert.throws(() => Try.of(() => Promise.resolve('yep')).onSuccess({}), Error);
        });
    });

    mocha.describe('.orElse()', () => {

        mocha.it('should invoke another try on failure', () => {
            let success = Try.failure('nope')
                .orElse(() => Try.success('yep'));
            assert.equal(success.get(), 'yep');
        });

        mocha.it('should invoke another try on failure promise', (done) => {
            Try.of(() => Promise.reject('nope'))
                .orElse(() => Try.success('yep'))
                .onSuccess(value => {
                    assert.equal(value, 'yep');
                    done();
                });
        });

        mocha.it('should invoke another try on first failure promise', (done) => {
            Try.of(() => Promise.reject('nope 1'))
                .orElse(() => Try.failure('nope 2'))
                .onFailure(err => {
                    assert(err.err.includes('nope 2'));
                    done();
                });
        });

        mocha.it('should invoke third try on first failure promise', (done) => {
            Try.of(() => Promise.reject('nope 1'))
                .orElse(() => Try.failure('nope 2'))
                .orElse(() => Try.failure('nope 3'))
                .onFailure((err) => {
                    assert(err.err.includes('nope 3'));
                    done();
                });
        });

        mocha.it('should not invoke another try on success', () => {
            let value = Try.success(100)
                .orElse(() => Try.success(1234))
                .get();
            assert.equal(value, 100);
        });

        mocha.it('should not invoke another try on failure promise', (done) => {
            Try.of(() => Promise.resolve('yep'))
                .orElse(() => done('Should not be invoked'));
            done();
        });
    });

    mocha.describe('.success()', () => {

        mocha.it('should yield try success', () => {
            let success = Try.success(100);
            assert(success.isSuccess());
        });

        mocha.it('should not accept promise argument', () => {
            assert.throws(() => Try.success(Promise.reject('No').catch(() => {})), Error);
        });
    });
});
