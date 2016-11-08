var Try = require('../dist/index');

var r = Try.of(() => { throw Error('foo bar baz'); })
    .orElse(() => Try.of(() => 1))
    .map(val => val + 2)
    .getOrElse(6);

var x = Try.of(() => new Promise((resolve, reject) => { resolve(10) }))
    .flatMap(v => new Promise((resolve, reject) => { resolve(v + 2) }))
    .map(v => v + 20)
    .onSuccess(v => console.log(v));

//console.log(x)

