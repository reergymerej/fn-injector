# fn-injector

Ever want to splice a function into a call stack, say for debugging or logging?

fn-injector allows you a quick way to replace a function with another.  When the original function is called, it will actually execute your replacement.


```js
var fnInjector = require('fn-injector');

var greet = function (name) {
  console.log('Hello, %s.', name);
};

greet = fnInjector(greet, function (greet, name) {
  // The replacement gets the same args,
  // unshifted with the original function.

  if (name === 'World') {
    console.log('not again');
  } else {

    // Pass through to the original function.
    greet(name);
  }
});

greet('Benjamin Franklin');  // Hello, Benjamin Franklin.
greet('World');  // not again
```

## Logging Example
```js
console.log = fnInjector(console.log, function (log) {
  var args = Array.prototype.slice.apply(arguments);
  args[0] = new Date();

  log.apply(this, args);
});

console.log('hello');  // Fri Aug 28 2015 22:58:46 GMT-0400 (EDT) 'hello'
```