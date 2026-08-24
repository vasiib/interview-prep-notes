/**
 * Currying and Infinite Currying (polyfills)
 *
 * Definition - Currying:
 * Currying is the process of transforming a function that takes multiple
 * arguments into a sequence of functions each taking a single (or fewer)
 * argument(s). It allows partial application of a function's arguments.
 *
 * Definition - Infinite Currying:
 * Infinite currying (also called variadic or chained currying) produces a
 * chainable function API where calls can be chained indefinitely, usually
 * accumulating a result, and the final value is obtained when the chain
 * is terminated (commonly by calling with no arguments or by coercion).
 *
 * Implementations below:
 */

// Generic curry: transforms a function (fn) into its curried form.
function curry(originalFunction) {
  return function curried(...args) {
    if (args.length >= originalFunction.length) {
      return originalFunction.apply(this, args);
    }
    return function (...next) {
    // recursively call curried with the accumulated arguments (args + next)
      return curried.apply(this, args.concat(next));
    };
  };
}

// Infinite currying (sum example): sum(1)(2)(3)() -> 6
function infiniteSum(a) {
  function inner(b) {
    if (arguments.length === 0) return a;
    return infiniteSum(a + b);
  }
  // Make coercion to primitive yield the accumulated value.
  inner.valueOf = function () {
    return a;
  };
  inner.toString = function () {
    return String(a);
  };
  return inner;
}

// Examples / quick tests
if (typeof module !== 'undefined' && module.exports) {
  // Curry example
  const add3 = (a, b, c) => a + b + c;
  const curriedAdd3 = curry(add3);

  console.log('curry examples:');
  console.log(curriedAdd3(1)(2)(3)); // 6
  console.log(curriedAdd3(1, 2)(3)); // 6
  console.log(curriedAdd3(1)(2, 3)); // 6

  // Infinite currying example
  console.log('\ninfinite currying examples:');
  console.log(infiniteSum(1)(2)(3)()); // 6 - explicit termination with ()
  // Coercion example: no terminating call, coerces to primitive when needed
  const s = infiniteSum(5)(10);
  console.log(+s); // 15 (using unary + to coerce)
  console.log(s + 5); // 20 (coercion via addition)
}

module.exports = { curry, infiniteSum };
