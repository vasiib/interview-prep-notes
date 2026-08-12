# core-js

Javascript

### Question List

1. [What are the differences between `var`, `let`, and `const`?](#q1)
2. [What does `this` refer to in JavaScript?](#q2)
3. [What is closure and how is it used?](#q3)
4. [Explain the event loop and call stack.](#q4)
5. [What is the difference between `==` and `===`?](#q5)
6. [What are prototypes and prototype inheritance?](#q6)
7. [What are async/await and Promises?](#q7)
8. [Execution Contexts in JavaScript?](#q8)
9. [What is the difference between `null` and `undefined` and `not defined`?](#q9)
10. [What is event delegation?](#q10)
11. [How do you clone an object in JavaScript?](#q11)
12. [What is a JavaScript module and how do `CommonJS` and `ES Modules` differ?](#q12)
13. [What are `call`, `apply`, and `bind`?](#q13)
14. [What is the difference between `map`, `filter`, and `reduce`?](#q14)
15. [What is a pure function?](#q15)
16. [What is the shortest program in JS?](#q16)

---

## Answers

<a id="q1"></a>

### 1. What are the differences between `var`, `let`, and `const`?

- `var` is function-scoped, can be redeclared, and is hoisted with an initial value of `undefined`.
- `let` and `const` are block-scoped, not redeclarable in the same scope, and are hoisted into a temporal dead zone until initialization.
- `const` creates a constant reference and must be initialized at declaration.

- `Temporal Dead Zone (TDZ)` It is the time between the creation of a variable and its initialization. During this time, the variable is in a "dead" state, and it cannot be accessed. If you try to access a variable in the TDZ, you will get a ReferenceError

[Back to question list](#question-list)

<a id="q2"></a>

### 2. What does `this` refer to in JavaScript?

- In a regular function, `this` refers to the calling context.
- In a method, `this` refers to the object owning the method.
- In a constructor, `this` refers to the newly created instance.
- In arrow functions, `this` is lexically inherited from the surrounding scope.

[Back to question list](#question-list)

<a id="q3"></a>

### 3. What is closure and how is it used?

- Closure is the combination of a function bundled together with references to its surrounding state (the lexical environment).
- In other words, a closure gives you access to an outer function’s scope from an inner function.
- In javascript closures are created every time a function is created.
- Common uses include data privacy, factory functions, and maintaining state between function calls.
- Uses of closures:
  - Module Design Pattern: Closures are used to create private variables and methods in JavaScript. By using closures, we can create a module that encapsulates its data and exposes only the necessary methods to interact with that data.
    ````Ex:
        function createCounter() {
            let count = 0;
            return {
                increment() {
                    count++;
                    return count;
                },
                decrement() {
                    count--;
                    return count;
                }
            };
        }```

    ````
  - Currying: Closures are used to implement currying in JavaScript. Currying is a technique of transforming a function that takes multiple arguments into a sequence of functions that take a single argument.
  - Function like once: Closures can be used to create functions that can only be called once. This is useful for creating functions that perform a specific task and should not be called again.
    ````Ex:
        function once(fn) {
            let called = false;
            return function(...args) {
                if (!called) {
                    called = true;
                    return fn(...args);
                }
            };
        }```

    ````
  - memoization: Closures can be used to implement memoization in JavaScript. Memoization is a technique of caching the results of expensive function calls and returning the cached result when the same inputs occur again.
  - Maintaining state in async world: Closures can be used to maintain state in asynchronous operations, ensuring that variables retain their values across async boundaries.
  - setTimeout and setInterval: Closures are used in setTimeout and setInterval functions to maintain the state of variables between function calls. This allows us to create timers and intervals that can access variables defined in their outer scope.
  - Iterators: Closures are used to create iterators in JavaScript. An iterator is an object that allows us to traverse through a collection of data, such as an array or a linked list. By using closures, we can create iterators that maintain their state between function calls.
    ````Ex:
        function createIterator(items) {
            let index = 0;
            return {
                next() {
                    if (index < items.length) {
                        return { value: items[index++], done: false };
                    } else {
                        return { value: undefined, done: true };
                    }
                }
            };
        }```

    ````
  - Disadvantages of closures:
    - Memory consumption: Closures can lead to increased memory consumption, as they keep references to their outer scope variables even after the outer function has finished executing. This can prevent garbage collection from freeing up memory, leading to potential memory leaks.

  #### 3.1. What is `Smartly garbage collection`?

        - JS engine checks if any variable in the outer scope is being referenced by the inner function. If it is, then it will not be garbage collected. If it is not, then it will be garbage collected.

[Back to question list](#question-list)

<a id="q4"></a>

### 4. Explain the event loop and call stack.

- `Call Stack:` In JavaScript, the call stack is where functions are executed one at a time in order.
- `Stack:` A Last-In, First-Out (LIFO) data structure that tracks function execution.
- `Event Loop:` A runtime mechanism that continuously checks if the call stack is empty and then processes tasks from queues.
  - Event loop acts as gateway between the call stack and the callback/microtask queue. It continuously checks the call stack and the `callback`/`microtask queue`, and if the call stack is empty, it takes the first callback from the queue and pushes it onto the call stack for execution.

  - `microtask queue` has higher priority than the `callback queue`. This means that if there are any microtasks in the queue, they will be executed before any callbacks in the callback queue.

  - promise callbacks and mutation observers are added to the microtask queue, while setTimeout and setInterval callbacks are added to the callback queue. This means that promise callbacks will be executed before any setTimeout or setInterval callbacks, even if they were scheduled to run later.

  - `starvation of callback queue:` If the microtask queue is continuously filled with new tasks, the callback queue may never get a chance to execute. This can lead to starvation of the callback queue, where callbacks are delayed indefinitely. To avoid this, it is important to ensure that microtasks are not continuously added to the queue without allowing the callback queue to execute.

[Back to question list](#question-list)

<a id="q5"></a>

### 5. What is the difference between `==` and `===`?

- `==` performs type coercion before comparison. ( )
- `===` performs strict equality without type conversion.

  ```
  "4" == 4 // gives true (JavaScript applies coercion rules.)
  "4" === 4 // gives false, as it checks bot value and type
  ```

  #### Coercion rules:

        - String vs Number with == → String is converted to Number.
        - Boolean vs Number with == → Boolean is converted to Number (true → 1, false → 0).
        - Null vs Undefined with == → They are equal to each other, but not to anything else.

  #### 5.1. What is Type coercion?

        - Type coercion in JavaScript is the process of automatically or implicitly converting values from one data type to another.
        - Since JavaScript is loosely typed, it tries to "guess" what type you mean when performing operations.
        - `Explicit Coercion` (done manually by developer)

  ```
  // Implicit Coercion
  console.log("5" + 1);   // "51" → number 1 coerced to string
  console.log("5" - 1);   // 4   → string "5" coerced to number
  console.log(true + 1);  // 2   → true coerced to number (1)

  Common Coercion Rules
      String + Number → String
      String - Number → Number (-, *, /, <, >)
      Boolean → Number
      Null → Number (0)
      Undefined → Number (NaN)

  // Explicit Coercion
  Number("42");   // 42
  String(42);     // "42"
  Boolean(0);     // false
  ```

[Back to question list](#question-list)

<a id="q6"></a>

### 6. What are prototypes and prototype inheritance?

- In JavaScript, prototypes are special objects that provide a way for objects to inherit properties and methods
- `prototype inheritance` is the mechanism where one object can access features defined in another object via the `prototype chain`.
- For a method/variable, JavaScript first looks in the object itself. If not found, it looks in the prototype. If not prototype's prototype and the chain continues.
- The chain ends till it find the desired variable or at Object.prototype, whose prototype is null.

  ```
  const obj = { name: "Vaseem" };
  console.log(obj.toString());
  // Works even though `toString` is not defined in obj
  // It comes from Object.prototype


  const parent = { greet: () => "Hello!" };
  const child = Object.create(parent);

  console.log(child.greet()); // "Hello!" (inherited from parent)


  function Person(name) {
  this.name = name;
  }

  Person.prototype.sayHi = function() {
  console.log(`Hi, I'm ${this.name}`);
  };

  const user = new Person("Vaseem");
  user.sayHi(); // "Hi, I'm Vaseem"

  ```

  ![ProtoType Chain](../../images/prototype-chain.png)

#### 6.1.1 What is Prototype?

- A prototype is an object that JavaScript uses for `inheritance`. Objects can delegate property and method lookups to their prototype through the internal [[Prototype]] chain. This allows multiple objects to share methods instead of creating separate copies for every object.

#### 6.1.2 Difference between prototype, **proto**, and [[Prototype]] ?

- prototype is a property of constructor functions and is used as the prototype for objects created with new. [[Prototype]] is the internal prototype reference of an object. **proto** is a legacy accessor that exposes that internal prototype. Object.getPrototypeOf() is preferred over **proto**.

  ```
      Constructor function
          │
          │ .prototype
          ↓
      Prototype object
          ↑
          │ [[Prototype]]
          │
      object
          │
          └── exposed through __proto__
  ```

- `prototype` is a property of constructor functions.

  ```
  function Person() {}
  console.log(Person.prototype);

  // Person.prototype is the object that will become the prototype of objects created using: new Person()
  Ex:
      function Person(name) {
          this.name = name;
      }

      Person.prototype.sayHello = function () {
          console.log("Hello");
      };

      const p = new Person("John");

      Object.getPrototypeOf(p) === Person.prototype; // true

  ```

- `__proto__` is an accessor that exposes an object's internal [[Prototype]]

  ```
  const obj = {};
  console.log(obj.__proto__ === Object.prototype); // true

  // better to use Object.getProtottypeOf(obj) instead of obj.__proto__
  ```

- `[[Prototype]]` is the internal specification-level property.

  ```
  // You normally cannot directly access it using:
  obj.[[Prototype]] // ❌

  //Instead:
  Object.getPrototypeOf(obj);

  // You can change it
  Object.setPrototypeOf(obj, anotherObject);
  ```

#### 6.1.3 How does the new keyword work internally?

- The new operator creates a new object, sets its internal [[Prototype]] to the constructor's prototype, calls the constructor with the new object as this, and returns the resulting object unless the constructor explicitly returns another object.

  ```
  function Person(name) {
      this.name = name;
  }

  Person.prototype.sayHello = function () {
      console.log(`Hello ${this.name}`);
  };

  const person = new Person("John");

  // Internally what does new do ?
      const obj = {};
      obj.__proto__ = Person.prototype;
      User.call(obj, "Jon");

      return obj;
  ```

#### 6.1.4 Why add methods to Constructor.prototype instead of inside the constructor?

- Methods placed inside the constructor are recreated for every instance. Methods placed on the constructor's prototype are created once and shared by all instances, which generally reduces memory usage and avoids unnecessary function allocations.

  ```
  // Approach 1: Methods inside the constructor
      function Person(name) {
          this.name = name;

          this.sayHello = function () {
              console.log("Hello");
          };
      }

      const p1 = new Person("John");
      const p2 = new Person("David");

      // Every time you create an obj, a new function obj is created
      p1.sayHello !== p2.sayHello;

  // Approach 2: Methods on the constructors prototype
      function Person(name) {
          this.name = name;

      }
      Person.prototype.sayHello = function () {
              console.log("Hello");
        };

      const p1 = new Person("John");
      const p2 = new Person("David");

      p1.sayHello === p2.sayHello;

      // Both objects share the same function.
        p1 ──┐
             ├──> Person.prototype.sayHello
        p2 ──┘
  
  // Modern Approach2, using classes
    class Person {
        constructor(name) {
            this.name = name;
        }

        sayHello() {
            console.log("Hello");
        }
    }
  ```

#### 6.1.5 What is Object.create() and how does it implement prototype-based inheritance?
- Object.create() creates an object whose [[Prototype]] is the object passed to it. It provides a direct way to implement prototype-based inheritance without using a constructor or new.
    ```
    const animal = {
        eat() {
            console.log("Eating");
        }
    };

    const dog = Object.create(animal);

    dog.bark = function () {
        console.log("Barking");
    };

    dog.eat();
    dog.bark();

    // JavaScript doesn't find eat directly on dog. It finds it on animal.
    Object.getPrototypeOf(dog) === animal; // true
    ```

- If JavaScript has classes, why do we need prototypes?"
    - JavaScript classes are syntactic sugar over the prototype-based inheritance mechanism.

#### 6.1.8 Classes and Prototypes

- ES6 class syntax is syntactic sugar over prototypes. Under the hood, classes still use prototype inheritance.

  ```
  class Animal {
    speak() { console.log("Generic sound"); }
  }

  class Dog extends Animal {
    speak() { console.log("Woof!"); }
  }

  const d = new Dog();
  d.speak(); // "Woof!"

  ```

- Here, Dog inherits from Animal via the prototype chain.

[Back to question list](#question-list)

<a id="q7"></a>

### 7. What are async/await and Promises?

- In JavaScript, `Promises` and `async/await` are tools for handling asynchronous operations — tasks that take time (like fetching data or reading files) — without blocking the main thread. They make async code readable and predictable.
- Promise:
  - A Promise is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. It allows you to write asynchronous code in a more synchronous manner, making it easier to read and understand.
  - A Promise can be in one of three states:
    - Pending: The initial state of a Promise, before it has been resolved or rejected.
    - Fulfilled: The state of a Promise when the asynchronous operation has completed successfully and a value is available.
    - Rejected: The state of a Promise when the asynchronous operation has failed and an error is available.
  - A Promise is created using the Promise constructor, which takes a single argument: a function that takes two parameters, resolve and reject. The resolve function is called when the asynchronous operation is successful, and the reject function is called when the operation fails.
    ```
    Example:
        const myPromise = new Promise((resolve, reject) => {
            // Asynchronous operation
            setTimeout(() => {
                const success = true; // Simulate success or failure
                if (success) {
                    resolve('Operation successful');
                } else {
                    reject('Operation failed');
                }
            }, 1000);
        })
    ```
  - Built-in methods:
    - `Promise.all()`
      - Takes an array of Promises and returns a new Promise that resolves when all of the input Promises have resolved, or rejects if any of the input Promises reject.
      - If even one fails, the whole promise is rejected.
        ```
        Promise.all([promise1, promise2, promise3])
            .then((results) => { console.log(results); })
            .catch((error) => { console.error(error); });
        ```

    - `Promise.allSettled()`
      - Takes an array of Promises and returns a new Promise that resolves when all of the input Promises have settled (either fulfilled or rejected), with an array of objects that each describe the outcome of each Promise.
        ```
        Promise.allSettled([promise1, promise2, promise3])
            .then((results) => {
                console.log(results);  // [resolved1, rejected2, resolved3]
                });
        ```
    - `Promise.race()`
      - Takes an array of Promises and returns a new Promise that whichever promise settles first (either fulfilled or rejected).
        ```
        Promise.race([promise1, promise2, promise3])
            .then((result) => { console.log(result); })
            .catch((error) => { console.error(error); });
        ```
    - `Promise.any()`
      - Takes an array of Promises and returns a new Promise that resolves when any of the input Promises have fulfilled, or rejects if all of the input Promises reject.
      - Returns the first fullfilled promise.
      - Rejects, if all are rejected.
        ```
        Promise.any([promise1, promise2, promise3])
            .then((result) => { console.log(result); })
            .catch((error) => { console.error(error); });
        ```

- Asyn/Await:
  - Introduced in ES2017, async/await is syntactic sugar over Promises — it makes asynchronous code look synchronous.

  ```
  async function getData() {
      try {
          const result = await fetchData;
          console.log(result);
      } catch (error) {
          console.error(error);
      }
      }
      getData();

  ```

  - The entire code in the async function, after await is wrapped as a callback function and is added to the microtask queue. Once the promise is resolved, the callback function is executed and the code continues to run.
  - In simple terms, the async function's execution context is paused once await is encountered and promise is returned. Once the promise is resolved, it resumes the execution context.
  - `await` pauses only the async function, not the entire JavaScript runtime. The main thread keeps running other tasks while waiting for the Promise to resolve.
  - Always wrap await calls in `try...catch` for error handling.

[Back to question list](#question-list)

<a id="q8"></a>

### 8. Execution Contexts in JavaScript?

- Everything in JavaScript is executed inside an execution context. There are two types of execution contexts: `global execution context` and `function execution context`.
- The global execution context is created when the JavaScript code starts executing, and it contains the global object and the 'this' keyword.
- Each time a function is called, a new function execution context is created, which contains the function's arguments, local variables, and the value of 'this' for that function. When a function finishes executing, its execution context is destroyed, and control returns to the previous execution context.
- Execution Context: it has 2 phases one is `memory creation phase` and second is `code execution phase`.
  - In memory creation phase, the variables and functions are `hoisted` (memory is allocated).
    - Variables are initialized with undefined, and functions are initialized with their code.
    - Function declarations are hoisted with their definitions; `var` variables are hoisted with `undefined`; `let`/`const` are hoisted but not initialized.
  - In code execution phase, the code is executed line by line.
- For every function call, a new execution context is created. Each execution context has its own variable environment. When a variable is accessed, JavaScript looks for it in the current execution context's variable environment.
  - If it doesn't find it there, it looks in the outer execution context's variable environment, and so on, until it reaches the global execution context.

[Back to question list](#question-list)

<a id="q9"></a>

### 9. What is the difference between `null` and `undefined` and `not defined`?

- `null`: is an assigned value that represents no value or intentional emptiness.
- `undefined`: It is a primitive value that represents the absence of a value. It is the default value of uninitialized variables, and it is also the value returned by functions that do not explicitly return a value.
  - Memory is allocated for the variable, but it has not been assigned a value yet.
- `not defined`: It is an error that occurs when a variable or function is accessed before it has been declared or defined.
  - Memory is not allocated for the variable, and it does not exist in the current execution context's variable environment.

[Back to question list](#question-list)

<a id="q10"></a>

### 10. What is event delegation?
- Event delegation is a JavaScript pattern where instead of attaching event listeners to multiple child elements, you attach a single listener to their parent.
- The parent uses the event’s bubbling phase to “delegate” handling to the correct child.

  ```
  <ul id="menu">
      <li>Home</li>
      <li>About</li>
      <li>Contact</li>
  </ul>

  <script>
      const menu = document.getElementById("menu");

      // Attach ONE listener to the parent <ul>
      menu.addEventListener("click", function(event) {
          if (event.target.tagName === "LI") {
          console.log("You clicked:", event.target.textContent);
          }
      });
  </script>
  ```

  - How it works:
    - You click on a `li`
    - The click event bubbles up to the `ul`
    - The `ul` listener checks event.target (the actual clicked element)
    - Executes logic based on which `li` was clicked

[Back to question list](#question-list)

<a id="q11"></a>

### 11. How do you clone an object in JavaScript?

- Shallow clone: `Object.assign({}, obj)` or spread syntax `{ ...obj }`.

    ```
    /**
    * Create a shallow copy of an object or array.
    * Primitives are returned as-is.
    */
    function shallowCopy(value) {
        if (Array.isArray(value)) {
            return [...value];
        }

        if (value && typeof value === 'object') {
            return Object.assign({}, value);
        }

        return value;
    }
    ```
- Deep clone: JSON serialization `JSON.parse(JSON.stringify(obj))` or structured clone APIs, but note limitations for functions and special object types.
    
    ```
    /**
    * Create a deep copy of plain objects, arrays, maps, sets, dates, and regex.
    * Functions and symbols are copied by reference.
    */
    function deepCopy(value, seen = new WeakMap()) {
        // Handle primitive types and functions
        // For all other data types, the type of value will be "object" (including null), except for functions, which will have the type "function". Therefore, we can check if the value is null or not an object to determine if it's a primitive type or a function.
    
        if (value === null || typeof value !== "object") {
            return value;
        }

        // key to handle circular references
        if (seen.has(value)) {
            return seen.get(value);
        }

        if (value instanceof Date) {
            return new Date(value.getTime());
        }

        if (value instanceof RegExp) {
            return new RegExp(value.source, value.flags);
        }

        if (value instanceof Map) {
            const copiedMap = new Map();
            seen.set(value, copiedMap);
            value.forEach((v, k) =>
            copiedMap.set(deepCopy(k, seen), deepCopy(v, seen)),
            );
            return copiedMap;
        }

        if (value instanceof Set) {
            const copiedSet = new Set();
            seen.set(value, copiedSet);
            value.forEach((entry) => copiedSet.add(deepCopy(entry, seen)));
            return copiedSet;
        }

        if (Array.isArray(value)) {
            const copiedArray = [];
            seen.set(value, copiedArray);
            for (let i = 0; i < value.length; i += 1) {
            copiedArray[i] = deepCopy(value[i], seen);
            }
            return copiedArray;
        }

        const copiedObject = {};
        seen.set(value, copiedObject);

        for (const key of Object.keys(value)) {
            copiedObject[key] = deepCopy(value[key], seen);
        }

        return copiedObject;
    }
    ```

[Back to question list](#question-list)

<a id="q12"></a>

### 12. What is a JavaScript module and how do `CommonJS` and `ES Modules` differ?

- `CommonJS` uses `require()` and `module.exports`; it is synchronous and mainly used in Node.js.
- `ES Modules` use `import`/`export`; they support static analysis and are used in modern browsers and Node.js.

[Back to question list](#question-list)

<a id="q13"></a>

### 13. What are `call`, `apply`, and `bind`?

- `call(thisArg, ...args)` invokes a function with a specific `this` value and passed arguments.
- `apply(thisArg, argsArray)` invokes a function with a specific `this` value and an array of arguments.
- `bind(thisArg, ...args)` returns a new function permanently bound to `thisArg`.

[Back to question list](#question-list)

<a id="q14"></a>

### 14. What is the difference between `map`, `filter`, and `reduce`?

- `map` transforms each item in an array and returns a new array.
- `filter` selects items based on a predicate and returns a new array.
- `reduce` aggregates array values into a single result.

[Back to question list](#question-list)

<a id="q15"></a>

### 15. What is a pure function?

- A pure function returns the same output for the same input and has no side effects.
- Pure functions are easier to test, reason about, and use in functional programming.

[Back to question list](#question-list)

<a id="q16"></a>

### 16. What is the shortest program in JS?

- The shortest program in JS is an empty js file. When an empty js file is executed, a global execution context is created, and the global object is created. The 'this' keyword in the global execution context refers to the global object. The global object contains all the global variables and functions, and it is accessible from anywhere in the code.

[Back to question list](#question-list)
