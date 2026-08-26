# Object-Oriented Programming (OOPs) in JavaScript

A complete guide to all OOP concepts in JavaScript with clear explanations and examples.

---

## Table of Contents

1. [Objects](#1-objects)
2. [Classes](#2-classes)
3. [Constructor](#3-constructor)
4. [The `this` Keyword](#4-the-this-keyword)
5. [Encapsulation](#5-encapsulation)
6. [Abstraction](#6-abstraction)
7. [Inheritance](#7-inheritance)
8. [Polymorphism](#8-polymorphism)
9. [Getters and Setters](#9-getters-and-setters)
10. [Static Methods and Properties](#10-static-methods-and-properties)
11. [Prototypes and Prototype Chain](#11-prototypes-and-prototype-chain)
12. [Constructor Functions (Pre-ES6)](#12-constructor-functions-pre-es6)
13. [Object Methods](#13-object-methods)
14. [Mixins](#14-mixins)
15. [Composition vs Inheritance](#15-composition-vs-inheritance)
16. [Method Chaining](#16-method-chaining)
17. [Symbols and Private Patterns](#17-symbols-and-private-patterns)
18. [Iterators and Generators in Classes](#18-iterators-and-generators-in-classes)

---

## 1. Objects

An **object** is a collection of key-value pairs. Keys are called **properties**, and when a value is a function, it's called a **method**.

```js
const person = {
  name: "Alice",
  age: 25,
  greet() {
    console.log(`Hi, I'm ${this.name}`);
  }
};

person.greet(); // Hi, I'm Alice
console.log(person.age); // 25
```

You can also add or delete properties dynamically:

```js
person.email = "alice@mail.com"; // add
delete person.age;               // remove
```

[⬆ Back to list](#table-of-contents)

---

## 2. Classes

A **class** is a blueprint for creating objects. JavaScript introduced the `class` syntax in ES6 (2015).

```js
class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }

  speak() {
    console.log(`${this.name} says ${this.sound}`);
  }
}

const dog = new Animal("Dog", "Woof");
dog.speak(); // Dog says Woof
```

> **Note:** Classes in JS are syntactic sugar over prototypes — under the hood, they still use the prototype-based system.

[⬆ Back to list](#table-of-contents)

---

## 3. Constructor

The **constructor** is a special method inside a class that runs automatically when you create a new object using `new`. It is used to initialize properties.

```js
class Car {
  constructor(brand, model, year) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

  info() {
    return `${this.year} ${this.brand} ${this.model}`;
  }
}

const myCar = new Car("Toyota", "Camry", 2023);
console.log(myCar.info()); // 2023 Toyota Camry
```

- A class can only have **one** constructor.
- If you don't define one, JavaScript adds an empty constructor automatically.

[⬆ Back to list](#table-of-contents)

---

## 4. The `this` Keyword

`this` refers to the **current object** — the object that is calling the method.

```js
class User {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    console.log(`Hello, I am ${this.name}`);
  }
}

const user1 = new User("Bob");
const user2 = new User("Sara");

user1.sayHello(); // Hello, I am Bob
user2.sayHello(); // Hello, I am Sara
```

### Common `this` pitfall

```js
const user = new User("Tom");
const greet = user.sayHello;
greet(); // ❌ undefined — `this` is lost

// Fix: use bind, arrow functions, or call it on the object directly
const greetFixed = user.sayHello.bind(user);
greetFixed(); // ✅ Hello, I am Tom
```

[⬆ Back to list](#table-of-contents)

---

## 5. Encapsulation

**Encapsulation** means bundling data and methods together and **restricting direct access** to some of the object's internals.

JavaScript supports true private fields using the `#` prefix (ES2022+).

```js
class BankAccount {
  #balance; // private field

  constructor(owner, balance) {
    this.owner = owner;
    this.#balance = balance;
  }

  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      console.log(`Deposited ₹${amount}. New balance: ₹${this.#balance}`);
    }
  }

  withdraw(amount) {
    if (amount > 0 && amount <= this.#balance) {
      this.#balance -= amount;
      console.log(`Withdrew ₹${amount}. New balance: ₹${this.#balance}`);
    } else {
      console.log("Insufficient funds");
    }
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount("Alice", 1000);
account.deposit(500);       // Deposited ₹500. New balance: ₹1500
account.withdraw(200);      // Withdrew ₹200. New balance: ₹1300
// account.#balance;        // ❌ SyntaxError — cannot access private field
console.log(account.getBalance()); // ✅ 1300
```

[⬆ Back to list](#table-of-contents)

---

## 6. Abstraction

**Abstraction** means hiding complex implementation details and exposing only the necessary parts to the user.

```js
class CoffeeMachine {
  #waterTemp;

  constructor() {
    this.#waterTemp = 0;
  }

  // Private method — internal detail
  #boilWater() {
    this.#waterTemp = 100;
    console.log("Water boiled to 100°C");
  }

  #grindBeans() {
    console.log("Beans ground to fine powder");
  }

  // Public method — simple interface for the user
  makeCoffee() {
    this.#grindBeans();
    this.#boilWater();
    console.log("☕ Coffee is ready!");
  }
}

const machine = new CoffeeMachine();
machine.makeCoffee();
// Beans ground to fine powder
// Water boiled to 100°C
// ☕ Coffee is ready!

// machine.#boilWater(); // ❌ Error — hidden from outside
```

> The user only calls `makeCoffee()`. They don't need to know about boiling water or grinding beans.

[⬆ Back to list](#table-of-contents)

---

## 7. Inheritance

**Inheritance** allows a class (child) to acquire properties and methods from another class (parent) using the `extends` keyword.

```js
class Shape {
  constructor(color) {
    this.color = color;
  }

  describe() {
    console.log(`This shape is ${this.color}`);
  }
}

class Circle extends Shape {
  constructor(color, radius) {
    super(color); // calls the parent constructor
    this.radius = radius;
  }

  area() {
    return (Math.PI * this.radius ** 2).toFixed(2);
  }
}

class Rectangle extends Shape {
  constructor(color, width, height) {
    super(color);
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }
}

const c = new Circle("red", 5);
c.describe();             // This shape is red
console.log(c.area());   // 78.54

const r = new Rectangle("blue", 4, 6);
r.describe();             // This shape is blue
console.log(r.area());   // 24
```

### Key points:
- `extends` sets up the parent-child relationship.
- `super()` must be called in the child constructor before using `this`.
- The child can **add new** properties/methods or **override** parent ones.

### Types of Inheritance in JavaScript

JavaScript supports the following types of inheritance:

| Type | Supported? | How |
|------|------------|-----|
| Single | ✅ Yes | `class Child extends Parent` |
| Multi-level | ✅ Yes | `A → B → C` chain using `extends` |
| Hierarchical | ✅ Yes | Multiple children extend the same parent |
| Prototypal | ✅ Yes | `Object.create()` or prototype chain |
| Multiple | ❌ No | Not natively supported — use **Mixins** instead |

---

#### 1. Single Inheritance

One child class inherits from one parent class.

```
Parent → Child
```

```js
class Animal {
  constructor(name) {
    this.name = name;
  }

  eat() {
    console.log(`${this.name} is eating`);
  }
}

class Dog extends Animal {
  bark() {
    console.log(`${this.name} says Woof!`);
  }
}

const d = new Dog("Buddy");
d.eat();  // Buddy is eating
d.bark(); // Buddy says Woof!
```

---

#### 2. Multi-level Inheritance

A class inherits from a child class, forming a chain: Grandparent → Parent → Child.

```
Animal → Dog → Puppy
```

```js
class Animal {
  constructor(name) {
    this.name = name;
  }

  eat() {
    console.log(`${this.name} is eating`);
  }
}

class Dog extends Animal {
  bark() {
    console.log(`${this.name} says Woof!`);
  }
}

class Puppy extends Dog {
  play() {
    console.log(`${this.name} is playing 🎾`);
  }
}

const p = new Puppy("Max");
p.eat();  // Max is eating       (from Animal)
p.bark(); // Max says Woof!      (from Dog)
p.play(); // Max is playing 🎾   (from Puppy)
```

> `Puppy` has access to methods from both `Dog` and `Animal` through the chain.

---

#### 3. Hierarchical Inheritance

Multiple child classes inherit from the **same** parent class.

```
      Shape
     /     \
Circle    Square
```

```js
class Shape {
  constructor(color) {
    this.color = color;
  }

  describe() {
    console.log(`A ${this.color} shape`);
  }
}

class Circle extends Shape {
  constructor(color, radius) {
    super(color);
    this.radius = radius;
  }

  area() {
    return (Math.PI * this.radius ** 2).toFixed(2);
  }
}

class Square extends Shape {
  constructor(color, side) {
    super(color);
    this.side = side;
  }

  area() {
    return this.side ** 2;
  }
}

const c = new Circle("red", 5);
const s = new Square("blue", 4);

c.describe(); // A red shape
s.describe(); // A blue shape
console.log(c.area()); // 78.54
console.log(s.area()); // 16
```

> Both `Circle` and `Square` share the `describe()` method from `Shape`, but each has its own `area()`.

---

#### 4. Prototypal Inheritance

Instead of classes, you directly create objects that inherit from other objects using `Object.create()`.

```js
const vehicle = {
  start() {
    console.log(`${this.type} engine started 🚗`);
  }
};

const car = Object.create(vehicle);
car.type = "Car";
car.drive = function () {
  console.log(`${this.type} is driving`);
};

const electricCar = Object.create(car);
electricCar.type = "Tesla";
electricCar.charge = function () {
  console.log(`${this.type} is charging 🔋`);
};

electricCar.start();  // Tesla engine started 🚗  (from vehicle)
electricCar.drive();  // Tesla is driving          (from car)
electricCar.charge(); // Tesla is charging 🔋      (own method)
```

> No classes involved — objects directly inherit from other objects through the prototype chain.

---

#### 5. Multiple Inheritance (Not Supported — Use Mixins)

JavaScript **does not** allow a class to extend more than one parent. Attempting to do so will cause an error.

```js
// ❌ This is NOT valid JavaScript
// class FlyingFish extends Bird, Fish { }
```

**Workaround — use Mixins** (covered in detail in [Section 14](#14-mixins)):

```js
const Flyable = {
  fly() { console.log(`${this.name} is flying`); }
};

const Swimmable = {
  swim() { console.log(`${this.name} is swimming`); }
};

class FlyingFish {
  constructor(name) {
    this.name = name;
  }
}

// Mix in multiple behaviors
Object.assign(FlyingFish.prototype, Flyable, Swimmable);

const ff = new FlyingFish("Nemo");
ff.fly();  // Nemo is flying
ff.swim(); // Nemo is swimming
```

[⬆ Back to list](#table-of-contents)

---

## 8. Polymorphism

**Polymorphism** means "many forms" — the same method name behaves differently depending on the object calling it.

### Method Overriding (Runtime Polymorphism)

```js
class Employee {
  constructor(name) {
    this.name = name;
  }

  calculatePay() {
    return 0;
  }
}

class FullTimeEmployee extends Employee {
  constructor(name, salary) {
    super(name);
    this.salary = salary;
  }

  calculatePay() {
    return this.salary; // overrides the parent method
  }
}

class Freelancer extends Employee {
  constructor(name, hourlyRate, hoursWorked) {
    super(name);
    this.hourlyRate = hourlyRate;
    this.hoursWorked = hoursWorked;
  }

  calculatePay() {
    return this.hourlyRate * this.hoursWorked; // different behavior
  }
}

const employees = [
  new FullTimeEmployee("Alice", 50000),
  new Freelancer("Bob", 500, 80)
];

employees.forEach(emp => {
  console.log(`${emp.name}: ₹${emp.calculatePay()}`);
});
// Alice: ₹50000
// Bob: ₹40000
```

> Same method `calculatePay()`, but each class implements it differently. That's polymorphism.

[⬆ Back to list](#table-of-contents)

---

## 9. Getters and Setters

**Getters** and **Setters** let you define methods that behave like properties. They are useful for validation and computed values.

```js
class Temperature {
  #celsius;

  constructor(celsius) {
    this.#celsius = celsius;
  }

  // Getter — access like a property
  get fahrenheit() {
    return (this.#celsius * 9) / 5 + 32;
  }

  // Setter — assign like a property with validation
  set celsius(value) {
    if (value < -273.15) {
      console.log("Temperature below absolute zero is not possible!");
      return;
    }
    this.#celsius = value;
  }

  get celsius() {
    return this.#celsius;
  }
}

const temp = new Temperature(37);
console.log(temp.fahrenheit); // 98.6  (accessed like a property, not a function call)
console.log(temp.celsius);    // 37

temp.celsius = -300;           // Temperature below absolute zero is not possible!
temp.celsius = 100;
console.log(temp.fahrenheit); // 212
```

[⬆ Back to list](#table-of-contents)

---

## 10. Static Methods and Properties

**Static** methods and properties belong to the **class itself**, not to any instance. You call them directly on the class.

```js
class MathHelper {
  static PI = 3.14159;

  static add(a, b) {
    return a + b;
  }

  static circleArea(radius) {
    return this.PI * radius ** 2;
  }
}

console.log(MathHelper.PI);             // 3.14159
console.log(MathHelper.add(5, 3));      // 8
console.log(MathHelper.circleArea(7));  // 153.93791

// const m = new MathHelper();
// m.add(2, 3); // ❌ Error — static methods can't be called on instances
```

### When to use static methods:
- Utility/helper functions (like `Math.max()`, `Array.isArray()`)
- Factory methods that create instances in a specific way

```js
class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }

  // Factory method
  static createAdmin(name) {
    return new User(name, "admin");
  }
}

const admin = User.createAdmin("SuperUser");
console.log(admin); // User { name: 'SuperUser', role: 'admin' }
```

[⬆ Back to list](#table-of-contents)

---

## 11. Prototypes and Prototype Chain

Every JavaScript object has a hidden internal link to another object called its **prototype**. This is the original OOP mechanism in JavaScript.

```js
function Person(name) {
  this.name = name;
}

// Adding a method to the prototype
Person.prototype.greet = function () {
  console.log(`Hi, I'm ${this.name}`);
};

const p1 = new Person("Alice");
const p2 = new Person("Bob");

p1.greet(); // Hi, I'm Alice
p2.greet(); // Hi, I'm Bob

// Both p1 and p2 share the same greet function (memory efficient)
console.log(p1.greet === p2.greet); // true
```

### Prototype Chain

When you access a property on an object, JavaScript looks up the **prototype chain**:

```
p1 → Person.prototype → Object.prototype → null
```

```js
console.log(p1.hasOwnProperty("name"));  // true  (from Object.prototype)
console.log(p1.toString());               // [object Object]  (from Object.prototype)
```

### Checking prototypes

```js
console.log(Object.getPrototypeOf(p1) === Person.prototype); // true
console.log(p1 instanceof Person); // true
```

[⬆ Back to list](#table-of-contents)

---

## 12. Constructor Functions (Pre-ES6)

Before `class`, JavaScript used **constructor functions** to create objects. They still work and are important to understand.

```js
function Vehicle(type, speed) {
  this.type = type;
  this.speed = speed;
}

Vehicle.prototype.describe = function () {
  console.log(`${this.type} moves at ${this.speed} km/h`);
};

// Inheritance using constructor functions
function ElectricVehicle(type, speed, battery) {
  Vehicle.call(this, type, speed); // call parent constructor
  this.battery = battery;
}

// Set up prototype chain
ElectricVehicle.prototype = Object.create(Vehicle.prototype);
ElectricVehicle.prototype.constructor = ElectricVehicle;

ElectricVehicle.prototype.batteryInfo = function () {
  console.log(`Battery: ${this.battery} kWh`);
};

const tesla = new ElectricVehicle("Car", 200, 100);
tesla.describe();     // Car moves at 200 km/h
tesla.batteryInfo();  // Battery: 100 kWh
```

[⬆ Back to list](#table-of-contents)

---

## 13. Object Methods

JavaScript provides many built-in **static methods** on the `Object` class. These are essential tools for working with objects in OOP.

### Overview Table

| Method | Purpose |
|--------|---------|
| `Object.create()` | Create a new object with a specific prototype |
| `Object.assign()` | Copy properties from one or more objects |
| `Object.keys()` | Get all property names as an array |
| `Object.values()` | Get all property values as an array |
| `Object.entries()` | Get key-value pairs as an array |
| `Object.freeze()` | Make an object completely immutable |
| `Object.seal()` | Prevent adding/removing properties (editing allowed) |
| `Object.defineProperty()` | Define a property with fine-grained control |
| `Object.getPrototypeOf()` | Get the prototype of an object |
| `Object.is()` | Strict equality check (better than `===`) |
| `Object.fromEntries()` | Create an object from key-value pairs |
| `Object.hasOwn()` | Check if a property exists directly on the object |

---

### `Object.create()`

Creates a new object with the specified object as its prototype. This is the foundation of **prototypal inheritance**.

```js
const animal = {
  type: "Unknown",
  speak() {
    console.log(`${this.type} makes a sound`);
  }
};

const cat = Object.create(animal);
cat.type = "Cat";
cat.speak(); // Cat makes a sound

console.log(Object.getPrototypeOf(cat) === animal); // true
```

---

### `Object.assign()`

Copies all enumerable own properties from one or more **source** objects to a **target** object. Returns the target object.

```js
const target = { a: 1 };
const source1 = { b: 2 };
const source2 = { c: 3 };

const result = Object.assign(target, source1, source2);
console.log(result); // { a: 1, b: 2, c: 3 }
console.log(target === result); // true — target is modified in place
```

**Common use — shallow clone:**

```js
const original = { name: "Alice", age: 25 };
const clone = Object.assign({}, original);
console.log(clone); // { name: 'Alice', age: 25 }
```

> ⚠️ `Object.assign()` does a **shallow copy** — nested objects are still shared by reference.

---

### `Object.keys()`

Returns an array of the object's **own enumerable property names** (keys).

```js
const user = { name: "Bob", age: 30, city: "Mumbai" };

console.log(Object.keys(user)); // ['name', 'age', 'city']

// Useful for looping over properties
Object.keys(user).forEach(key => {
  console.log(`${key}: ${user[key]}`);
});
// name: Bob
// age: 30
// city: Mumbai
```

---

### `Object.values()`

Returns an array of the object's **own enumerable property values**.

```js
const scores = { math: 90, science: 85, english: 78 };

console.log(Object.values(scores)); // [90, 85, 78]

// Calculate average
const avg = Object.values(scores).reduce((a, b) => a + b, 0) / 3;
console.log(`Average: ${avg.toFixed(1)}`); // Average: 84.3
```

---

### `Object.entries()`

Returns an array of `[key, value]` pairs. Very useful for looping with destructuring.

```js
const product = { name: "Laptop", price: 50000, stock: 12 };

console.log(Object.entries(product));
// [['name', 'Laptop'], ['price', 50000], ['stock', 12]]

// Loop with destructuring
for (const [key, value] of Object.entries(product)) {
  console.log(`${key} → ${value}`);
}
// name → Laptop
// price → 50000
// stock → 12
```

---

### `Object.freeze()`

Makes an object **completely immutable** — you cannot add, remove, or modify any properties.

```js
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000
};

Object.freeze(config);

config.apiUrl = "https://hacked.com"; // ❌ silently fails (throws in strict mode)
config.newProp = "hello";             // ❌ silently fails
delete config.timeout;                // ❌ silently fails

console.log(config.apiUrl); // https://api.example.com (unchanged)
console.log(Object.isFrozen(config)); // true
```

> ⚠️ `Object.freeze()` is **shallow** — nested objects inside are not frozen.

---

### `Object.seal()`

Prevents **adding or removing** properties, but you **can still modify** existing property values.

```js
const user = { name: "Alice", age: 25 };

Object.seal(user);

user.age = 26;         // ✅ modification works
user.email = "a@b.com"; // ❌ adding new property fails
delete user.name;      // ❌ deleting fails

console.log(user); // { name: 'Alice', age: 26 }
console.log(Object.isSealed(user)); // true
```

**Freeze vs Seal:**

| Feature | `freeze()` | `seal()` |
|---------|-----------|----------|
| Add properties | ❌ | ❌ |
| Remove properties | ❌ | ❌ |
| Modify values | ❌ | ✅ |

---

### `Object.defineProperty()`

Defines a new property (or modifies an existing one) with **fine-grained control** over its behavior using descriptors.

```js
const person = {};

Object.defineProperty(person, "name", {
  value: "Alice",
  writable: false,     // cannot change the value
  enumerable: true,    // shows up in loops
  configurable: false  // cannot delete or redefine
});

console.log(person.name); // Alice
person.name = "Bob";      // ❌ silently fails
console.log(person.name); // Alice (unchanged)
```

**Descriptors explained:**

| Descriptor | Default | Meaning |
|------------|---------|----------|
| `value` | `undefined` | The property's value |
| `writable` | `false` | Can the value be changed? |
| `enumerable` | `false` | Does it show up in `for...in` / `Object.keys()`? |
| `configurable` | `false` | Can the property be deleted or redefined? |

---

### `Object.getPrototypeOf()`

Returns the **prototype** (i.e., the internal `[[Prototype]]`) of the specified object.

```js
class Animal {
  speak() {
    console.log("Some sound");
  }
}

class Dog extends Animal {}

const d = new Dog();

console.log(Object.getPrototypeOf(d) === Dog.prototype);    // true
console.log(Object.getPrototypeOf(Dog.prototype) === Animal.prototype); // true
```

---

### `Object.is()`

Compares two values for **strict equality**, but handles edge cases better than `===`.

```js
// Where Object.is() differs from ===
console.log(NaN === NaN);          // false ❌
console.log(Object.is(NaN, NaN));  // true  ✅

console.log(0 === -0);             // true  ❌
console.log(Object.is(0, -0));     // false ✅

// Normal comparisons work the same
console.log(Object.is(42, 42));    // true
console.log(Object.is("hi", "hi")); // true
console.log(Object.is(null, undefined)); // false
```

---

### `Object.fromEntries()`

Creates an object from an array of `[key, value]` pairs — the **reverse** of `Object.entries()`.

```js
const entries = [["name", "Alice"], ["age", 25], ["city", "Delhi"]];

const user = Object.fromEntries(entries);
console.log(user); // { name: 'Alice', age: 25, city: 'Delhi' }

// Practical use: converting a Map to an object
const map = new Map([["x", 10], ["y", 20]]);
const obj = Object.fromEntries(map);
console.log(obj); // { x: 10, y: 20 }

// Practical use: filtering object properties
const scores = { math: 90, science: 45, english: 78 };
const passed = Object.fromEntries(
  Object.entries(scores).filter(([_, score]) => score >= 50)
);
console.log(passed); // { math: 90, english: 78 }
```

---

### `Object.hasOwn()`

Checks if a property exists **directly on the object** (not inherited from the prototype). This is the modern replacement for `obj.hasOwnProperty()`.

```js
const user = { name: "Alice", age: 25 };

console.log(Object.hasOwn(user, "name"));     // true
console.log(Object.hasOwn(user, "toString")); // false (inherited from Object.prototype)

// Safer than hasOwnProperty — works even if overridden
const tricky = { hasOwnProperty: "oops" };
// tricky.hasOwnProperty("name"); // ❌ TypeError
console.log(Object.hasOwn(tricky, "hasOwnProperty")); // ✅ true
```

[⬆ Back to list](#table-of-contents)

---

## 14. Mixins

JavaScript doesn't support multiple inheritance (a class can only extend one parent). **Mixins** are a pattern to copy methods from multiple sources into a class.

```js
// Mixin 1
const CanFly = {
  fly() {
    console.log(`${this.name} is flying 🦅`);
  }
};

// Mixin 2
const CanSwim = {
  swim() {
    console.log(`${this.name} is swimming 🏊`);
  }
};

class Duck {
  constructor(name) {
    this.name = name;
  }
}

// Apply mixins
Object.assign(Duck.prototype, CanFly, CanSwim);

const duck = new Duck("Donald");
duck.fly();  // Donald is flying 🦅
duck.swim(); // Donald is swimming 🏊
```

> `Object.assign()` copies methods from the mixin objects into the class prototype.

[⬆ Back to list](#table-of-contents)

---

## 15. Composition vs Inheritance

**Composition** means building objects by combining smaller, reusable pieces instead of inheriting from a parent class. It follows the principle: *"Favor composition over inheritance."*

### Problem with deep inheritance

```js
// Deep hierarchy gets messy fast
// Animal → Pet → Dog → GuideDog → RetiredGuideDog ...
```

### Composition approach

```js
// Behaviors as functions
const canWalk = (state) => ({
  walk: () => console.log(`${state.name} is walking`)
});

const canEat = (state) => ({
  eat: (food) => console.log(`${state.name} is eating ${food}`)
});

const canBark = (state) => ({
  bark: () => console.log(`${state.name} says Woof!`)
});

// Compose a Dog from behaviors
function createDog(name) {
  const state = { name };
  return {
    ...state,
    ...canWalk(state),
    ...canEat(state),
    ...canBark(state)
  };
}

const buddy = createDog("Buddy");
buddy.walk();        // Buddy is walking
buddy.eat("bone");   // Buddy is eating bone
buddy.bark();        // Buddy says Woof!
```

> Composition is more flexible — you can pick and choose exactly which behaviors an object needs.

[⬆ Back to list](#table-of-contents)

---

## 16. Method Chaining

**Method chaining** allows you to call multiple methods on the same object in a single line by returning `this` from each method.

```js
class QueryBuilder {
  #query;

  constructor() {
    this.#query = {};
  }

  select(fields) {
    this.#query.select = fields;
    return this; // enables chaining
  }

  from(table) {
    this.#query.from = table;
    return this;
  }

  where(condition) {
    this.#query.where = condition;
    return this;
  }

  build() {
    const { select, from, where } = this.#query;
    return `SELECT ${select} FROM ${from} WHERE ${where}`;
  }
}

const sql = new QueryBuilder()
  .select("name, age")
  .from("users")
  .where("age > 18")
  .build();

console.log(sql);
// SELECT name, age FROM users WHERE age > 18
```

[⬆ Back to list](#table-of-contents)

---

## 17. Symbols and Private Patterns

Before `#` private fields, developers used **Symbols** or **closures** to simulate privacy.

### Using Symbols

```js
const _password = Symbol("password");

class Account {
  constructor(username, password) {
    this.username = username;
    this[_password] = password;  // not truly private, but hidden
  }

  validate(input) {
    return input === this[_password];
  }
}

const acc = new Account("admin", "secret123");
console.log(acc.username);       // admin
console.log(acc.password);       // undefined (no such property)
console.log(acc.validate("secret123")); // true

// Symbol properties don't show up in normal loops
console.log(Object.keys(acc));   // ['username']
```

### Using Closures (WeakMap pattern)

```js
const privateData = new WeakMap();

class SecureUser {
  constructor(name, secret) {
    privateData.set(this, { secret });
    this.name = name;
  }

  revealSecret() {
    return privateData.get(this).secret;
  }
}

const u = new SecureUser("Alice", "my-secret");
console.log(u.name);           // Alice
console.log(u.secret);         // undefined
console.log(u.revealSecret()); // my-secret
```

[⬆ Back to list](#table-of-contents)

---

## 18. Iterators and Generators in Classes

You can make your objects **iterable** (usable in `for...of` loops) by implementing the `Symbol.iterator` method or using a generator.

```js
class NumberRange {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  // Generator makes this class iterable
  *[Symbol.iterator]() {
    for (let i = this.start; i <= this.end; i++) {
      yield i;
    }
  }
}

const range = new NumberRange(1, 5);

for (const num of range) {
  process.stdout.write(num + " ");
}
// Output: 1 2 3 4 5

// Also works with spread
console.log([...range]); // [1, 2, 3, 4, 5]
```

[⬆ Back to list](#table-of-contents)

---

## Quick Reference Table

| Concept              | Purpose                                       | Key Syntax / Keyword       |
|----------------------|-----------------------------------------------|----------------------------|
| Object               | Store related data and behavior               | `{ }` literal or `new`     |
| Class                | Blueprint for creating objects                | `class`                     |
| Constructor          | Initialize object properties                  | `constructor()`             |
| `this`               | Refers to the current object                  | `this.property`             |
| Encapsulation        | Hide internal data                            | `#privateField`             |
| Abstraction          | Hide complexity, show simple interface        | Private methods + public API|
| Inheritance          | Child class gets parent's features            | `extends`, `super()`        |
| Polymorphism         | Same method, different behavior               | Method overriding           |
| Getters / Setters    | Controlled access to properties               | `get`, `set`                |
| Static               | Class-level methods/properties                | `static`                    |
| Prototype            | Shared methods via prototype chain            | `.prototype`                |
| Constructor Function | Pre-ES6 way to create objects                 | `function Foo() {}`         |
| Object Methods       | Built-in methods for working with objects     | `Object.keys()`, `.freeze()`, etc. |
| Mixins               | Combine behaviors from multiple sources       | `Object.assign()`           |
| Composition          | Build objects from small reusable pieces      | Factory functions + spread  |
| Method Chaining      | Fluent API by returning `this`                | `return this`               |
| Symbols              | Unique, hidden property keys                  | `Symbol()`                  |
| Iterators            | Make objects work with `for...of`             | `*[Symbol.iterator]()`      |

---

> **Happy Coding! 🚀**
