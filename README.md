# try-js
Type/construct for handling errors in Node.js, inspired by Scala's Try type.

[![Build Status](https://travis-ci.org/whirlwin/try-js.svg?branch=master)](https://travis-ci.org/whirlwin/try-js)

Example usage #1, happy case:
```javascript
var Try = require("try-js");

var result = Try.of(() => 10)
    .map(res => res + 10)
    .resolve(res => res,
             err => -1);

console.log(result); // Prints 20
```

Example usage #2, failure case:
```javascript
var Try = require("try-js");

var result = Try.of(() => { throw new Error("Internal failure") })
    .map(res => res + 10 )
    .resolve(res => res,
             err => -1);

console.log(result); // Prints -1
```

## Functions

### Try.of(computeFn) - Returns new Try instance
Accepts a function resulting in failure or success

### .flatMap(flatMapFn) - Returns a flat mapped value
Accepts a function that transforms a nested Try

### .getOrElse(defaultValue) - Returns the value or default value
Accepts a default value which is returned in case of failure, otherwise the value is returned

### .isFailure() - Returns a boolean

### .isSuccess() - Returns a boolean

### .map(mapFn) - Returns mapped value
Accepts function that transforms a value

### .peek(peekFn) - Returns itself
Accepts a function used to peek at a success value without modifying the value

### .peekFailure(peekFailureFn) - Returns itself
Accepts a function used to peek at a failure value without modifying the value

### .resolve(successFn, failureFn) - Returns the success value or failure value
Accepts a success and failure function used to [fold](https://en.wikipedia.org/wiki/Fold_(higher-order_function) the Try to a single return value
