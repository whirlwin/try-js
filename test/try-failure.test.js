var Try = require('../dist/index');

var result = Try.of(() => { throw Error('foo bar baz'); })
    .orElse(() => Try.of(() => 1))
    .map(val => val + 2)
    .getOrElse(6);

console.log(result);
