const assert = require('assert');
const mocha = require('mocha');
const Try = require('../dist');

mocha.describe('Try', () => {

    mocha.describe('chained promises', () => {

        mocha.it('should do something', (done) => {
            Try.of(() => new Promise((resolve, reject) => { resolve('hello'); }))
                .map(value => {
                    console.log('map...');
                    return value + ' world';
                })
                .flatMap(value => Try.of(() => { console.log('flatMap...' + value); return value + ' 2.0'; }))
                .flatMap(value => Try.of(() => { console.log('flatMap...' + value); return value + ' 2.0'; }))
                .onSuccess(value => {
                    //console.log(value);
                    //assert.equal(value, 'hello world 2.0');
                    done();
                });
        });
    });
});