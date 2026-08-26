// Implementations and demos for the five coding questions

// 1) Memoization helper
// `memoize` returns a wrapped version of `fn` that caches results by arguments.
// It works with functions that accept JSON-serializable arguments.
function memoize(fn) {
	const cache = new Map();
	return function (...args) {
		// Create a cache key based on arguments. JSON.stringify is simple and
		// sufficient for primitives and plain objects/arrays (avoid functions).
		const key = JSON.stringify(args);
		if (cache.has(key)) {
			return cache.get(key);
		}
		const result = fn.apply(this, args);
		cache.set(key, result);
		return result;
	};
}

// Example: an expensive Fibonacci (naive) to demonstrate speed-up
function slowFib(n) {
	if (n < 2) return n;
	return slowFib(n - 1) + slowFib(n - 2);
}
const fastFib = memoize(function fib(n) {
	if (n < 2) return n;
	return fib(n - 1) + fib(n - 2);
});


// 2) Retry mechanism for failed async functions (e.g., API calls)
// `retryAsync(fn, retries, delayMs)` will call `fn` and, if it rejects,
// retry up to `retries` times, waiting `delayMs` between attempts.
async function retryAsync(fn, retries = 3, delayMs = 500) {
	let attempt = 0;
	while (true) {
		try {
			return await fn();
		} catch (err) {
			attempt++;
			if (attempt > retries) throw err;
			// simple linear backoff; could use exponential by multiplying delay
			await new Promise((res) => setTimeout(res, delayMs));
		}
	}
}

// Example: mock API that fails a number of times before succeeding
function makeFailingMock(failures) {
	let count = 0;
	return async function () {
		count++;
		if (count <= failures) {
			throw new Error('Transient error, try again');
		}
		return { ok: true, count };
	};
}


// 3) Reverse a string without using built-in reversal helpers
// This avoids `split`, `reverse`, and `join` — uses a simple loop.
function reverseString(str) {
	let res = '';
	for (let i = str.length - 1; i >= 0; i--) {
		res += str[i];
	}
	return res;
}


// 4) Remove duplicate elements from an array
// Using a `Set` is concise and efficient (O(n)). If you need a stable
// order-preserving solution for complex equality, use a Map with custom keys.
function removeDuplicates(arr) {
	return Array.from(new Set(arr));
}


// 5) Find missing number from an array containing numbers 1..n with one missing
// Uses arithmetic sum formula to compute the missing value in O(n) time and O(1) space.
function findMissingNumber(arr) {
	const n = arr.length + 1; // because one number is missing
	const expectedSum = (n * (n + 1)) / 2;
	const actualSum = arr.reduce((s, v) => s + v, 0);
	return expectedSum - actualSum;
}


// --- Demonstrations / quick checks ---
console.log('\n--- Demo outputs ---');

// Memoization demo: fastFib should compute reasonably for moderate n
console.log('fastFib(20):', fastFib(20));

// Retry demo: mock API fails twice then succeeds
(async () => {
	const mock = makeFailingMock(2);
	try {
		const res = await retryAsync(mock, 3, 200);
		console.log('retryAsync result:', res);
	} catch (err) {
		console.error('retryAsync failed after retries:', err.message);
	}
})();

// Reverse string demo
console.log("reverseString('hello'):", reverseString('hello'));

// Remove duplicates demo
console.log('removeDuplicates([1,2,2,3,3,3,4]):', removeDuplicates([1, 2, 2, 3, 3, 3, 4]));

// Find missing number demo: array 1..6 with 4 missing => [1,2,3,5,6]
console.log('findMissingNumber([1,2,3,5,6]):', findMissingNumber([1, 2, 3, 5, 6]));