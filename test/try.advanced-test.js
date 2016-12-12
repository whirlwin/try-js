const assert = require('assert');
const mocha = require('mocha');
const Try = require('../dist');

mocha.describe('Try', () => {

    mocha.describe('chained promises', () => {

        mocha.it('should do something', (done) => {
            Try.of(() => new Promise((resolve, reject) => { resolve('hello'); }))
                .map(value => value + ' world')
                .flatMap(value => Try.of(() => value + ' 2.0' ))
                .flatMap(value => Try.of(() => value + ' end' ))
                .onSuccess(value => {
                    console.log('onSuccess: ' + value);
                    //console.log(value);
                    //assert.equal(value, 'hello world 2.0');
                    done();
                })
                .onFailure(err => {
                    done('failed with ' + JSON.stringify(err));
                });
        });
    });
});