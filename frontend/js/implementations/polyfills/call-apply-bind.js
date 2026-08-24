// Call - Predefined function that allows you to call a function with a given this value and arguments provided individually, comma separated.
// Ex: originalFunc.call(thisArg, arg1, arg2, arg3)

// Apply - Similar to `call`, but arguments are provided as an array (or array-like object). Useful when you want to pass an existing array of arguments to a function.
// Ex: originalFunc.apply(thisArg, [arg1, arg2, arg3])

// Bind - Returns a new function that, when called, has its `this` keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called. Useful for partial application and preserving context.
// Ex: const bound = originalFunc.bind(thisArg, arg1);
// Note: once a function is bound, the binding is permanent for the returned function — the bound `this` and leading arguments cannot be undone.


// Polyfills: implement as `myCall`, `myApply`, `myBind` to avoid replacing
// native implementations.

/* eslint-disable no-unused-vars */
function getThisArg(obj) {
	if (obj === null || obj === undefined) return globalThis;
	return Object(obj);
}

Function.prototype.myCall = function (thisArg, ...args) {
	const ctx = getThisArg(thisArg);
	const fnSym = Symbol('fn');
	ctx[fnSym] = this;
	const result = ctx[fnSym](...args);
	delete ctx[fnSym];
	return result;
};

Function.prototype.myApply = function (thisArg, argsArray) {
	const ctx = getThisArg(thisArg);
	const fnSym = Symbol('fn');
	ctx[fnSym] = this;
	let result;
	if (argsArray == null) {
		result = ctx[fnSym]();
	} else {
		if (typeof argsArray[Symbol.iterator] !== 'function' && typeof argsArray.length !== 'number') {
			throw new TypeError('CreateListFromArrayLike called on non-object');
		}
		result = ctx[fnSym](...argsArray);
	}
	delete ctx[fnSym];
	return result;
};

Function.prototype.myBind = function (thisArg, ...boundArgs) {
	if (typeof this !== 'function') {
		throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
	}
	const fn = this;

	function boundFunction(...args) {
		// Allow using bound function as a constructor.
		const isNew = this instanceof boundFunction;
		const ctx = isNew ? this : getThisArg(thisArg);
		return fn.apply(ctx, boundArgs.concat(args));
	}

	// Maintain prototype chain when used with `new`.
	if (fn.prototype) {
		boundFunction.prototype = Object.create(fn.prototype);
		// It's common to restore constructor reference, but native bind does not.
	}

	return boundFunction;
};

// Examples / quick checks
if (typeof module !== 'undefined' && module.exports) {
	const obj = { value: 10 };
	function add(a, b) {
		return this.value + a + b;
	}

    add.call(obj, 1, 2); // 13
	console.log('myCall:', add.myCall(obj, 1, 2)); // 13
	console.log('myApply:', add.myApply(obj, [1, 2])); // 13

	const bound = add.myBind(obj, 5);
	console.log('myBind:', bound(3)); // 18 (10 + 5 + 3)

	// Bind used as constructor
	function Person(name) {
		this.name = name;
	}
	Person.prototype.greet = function () {
		return 'Hi ' + this.name;
	};

	const BoundPerson = Person.myBind({});
	const p = new BoundPerson('Alice');
	console.log('bind as constructor:', p.name, typeof p.greet === 'function');
}

module.exports = {};

    