# try-js
Type/construct for handling errors in Node.js, inspired by Scala's Try type.

[![Build Status](https://travis-ci.org/whirlwin/try-js.svg?branch=master)](https://travis-ci.org/whirlwin/try-js)

Example usage #1, happy case:
```javascript
var Try = require("try-js");

var result = Try.of(function() { return 10 })
    .map(function(res) { return res + 10 })
    .resolve(function(res) { return res; },
             function(err) { return -1 });

console.log(result); // Prints 20
```

Example usage #2, failure case:
```javascript
var Try = require("try-js");

var result = Try.of(function() { throw new Error("Internal failure") })
    .map(function(res) { return res + 10 })
    .resolve(function(res) { return res; },
             function(err) { return -1 });

console.log(result); // Prints -1
```

## Functions

### Try.of(computeFn)
Accepts a function resulting in an Error or value
