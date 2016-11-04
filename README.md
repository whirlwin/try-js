# try-js
Type/construct for handling errors in Node.js, inspired by Scala's Try type.

[![Build Status](https://travis-ci.org/whirlwin/try-js.svg?branch=master)](https://travis-ci.org/whirlwin/try-js)

Example usage #1, happy case:
```javascript
var Try = require('try-js');

var result = Try.of(() => 10)
    .map(res => res + 10)
    .resolve(res => res,
             err => -1);

console.log(result); // Prints 20
```

Example usage #2, failure case:
```javascript
var Try = require('try-js');

var result = Try.of(() => { throw new Error('Internal failure') })
    .map(res => res + 10 )
    .resolve(res => res,
             err => -1);

console.log(result); // Prints -1
```

## API doc

#### of

Accepts a supplier function resulting in a failure or success Try.

```javascript
var newTry = Try.of(() => 'foobar');
```

---

#### success

Static helper function for creating a success Try.

```javascript
var successTry = Try.success('Yay! It worked!');
```

---

#### failure

Static helper function for creating a failure Try.

```javascript
var failureTry = Try.failure('Aw. It failed...');
```

---

#### filter

Function for filtering, where a predicate match results in a success try, and a failure.

```javascript
var successTry = Try.of(() => 100)
    .filter(value => value > 50);
```
    
```javascript
var failureTry = Try.of(() => 20)
    .filter(value => value > 50);
```

---

#### flatMap

Function for mapping on another Try, used to flatten a nested Try instances.

```javascript
var successTry = Try.of(() => 'Some value')
    .flatMap(value => Try.of(() => 'Something else'));
```

```javascript
var failureTry = Try.of(() => 'Some value')
    .flatMap(value => Try.of(() => { throw new Error('Oh snap!'); }));
```

---

#### getOrElse

Accepts a default value which is returned in case of failure, otherwise the value is returned.

```javascript
var two = Try.of(() => { throw new Error('one'); })
    .getOrElse(2);
```

---

#### isFailure

Returns whether the Try is a Failure or not.

```javascript
var correct = Try.of(() => { throw new Error(); })
    .isFailure();
```

---

#### isSuccess

Returns whether the Try is a Success or not.

```javascript
var correct = Try.of(() => 'Victory!')
    .isSuccess();
```

---

#### onFailure

Function for performing an operation on the failure Try. Disregards the return value of the provided function.

```javascript
var failureTry = Try.of(() => { throw new Error('Critical failure') })
    .onFailure(err => console.error(err));
```

---

#### onSuccess

Function for performing an operation on the success Try. Disregards the return value of the provided function.

```javascript
var successTry = Try.of(() => { throw new Error('Superb win') })
    .onSuccess(value => console.log(value));
```

---

#### map

Accepts function that transforms a value if the current Try is a success Try.

```javascript
var twentySuccessTry = Try.of(() => 10)
    .map(value => value + 10);
```

---

#### orElse

Accepts a function with a another try for Failure mapping.

```javascript
var successTry = Try.of(() => { throw new Error('Oops'); })
    .orElse(() => Try.of(() => 'Much better'));
```

---

#### resolve

Returns the success value or failure value. Accepts a success and failure function used to
[fold](https://en.wikipedia.org/wiki/Fold_(higher-order_function)) the Try to a single return value.

```javascript
var helloWorld = Try.of(() => 'Hello')
    .resolve(value => value + ' World', err => ' Errr....');
```

```javascript
var badStuff = Try.of(() => { throw new Error('Bad stuff'); })
    .resolve(value => value + 'Good things', err => err);
```
