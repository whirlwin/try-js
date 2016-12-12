const assert = require('assert');
const mocha = require('mocha');
const Try = require('../dist');

mocha.describe('Try', () => {

    mocha.describe('chained promises', () => {

        mocha.it('should chain Try flatMap in correct order', (done) => {
            Try.of(() => new Promise((resolve, reject) => { resolve('hello'); }))
                .map(value => value + ' world')
                .flatMap(value => Try.of(() => value + ' 2.0' ))
                .flatMap(value => Try.of(() => value + ' !!!' ))
                .onSuccess(value => {
                    assert.equal(value, 'hello world 2.0 !!!');
                    done();
                });
        });

        mocha.it('should chain promised Try flatMap in correct order', (done) => {
            Try.of(() => new Promise((resolve, reject) => { resolve('hello'); }))
                .map(value => value + ' world')
                .flatMap(value => Try.of(() => new Promise((resolve, reject) => { resolve(value + ' 2.0'); }) ))
                .flatMap(value => Try.of(() => new Promise((resolve, reject) => { resolve(value + ' !!!'); }) ))
                .onSuccess(value => {
                    assert.equal(value, 'hello world 2.0 !!!');
                    done();
                });
        });

    });
});