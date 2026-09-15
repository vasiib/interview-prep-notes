# JavaScript Design Patterns

Design patterns are reusable solutions to common coding problems. They fall into three main categories:

- **Creational**: object creation
- **Structural**: object composition
- **Behavioral**: object interaction

Below is a detailed guide with examples tailored for modern JavaScript. The examples use functions, closures, modules, objects, classes, promises, and higher-order functions where they make the design clearer.

A pattern is not code to copy mechanically. Use one when it gives a recurring design problem a clear name, reduces coupling, improves testability, or makes a likely change easier. If a plain function or object is clearer, use the simpler solution.

## Table of Contents

1. [Creational Patterns](#1-creational-patterns)
   1. [Factory](#11-factory)
   2. [Builder](#12-builder)
   3. [Singleton](#13-singleton)
2. [Structural Patterns](#2-structural-patterns)
   1. [Module](#21-module)
   2. [Adapter](#22-adapter)
   3. [Facade](#23-facade)
   4. [Proxy](#24-proxy)
   5. [Decorator](#25-decorator)
3. [Behavioral Patterns](#3-behavioral-patterns)
   1. [Strategy](#31-strategy)
   2. [Observer](#32-observer)
   3. [Command](#33-command)
   4. [State](#34-state)
   5. [Chain of Responsibility and Middleware](#35-chain-of-responsibility-and-middleware)
   6. [Template Method](#36-template-method)
   7. [Iterator](#37-iterator)
4. [Supporting Design Techniques](#4-supporting-design-techniques)
   1. [Dependency Injection](#41-dependency-injection)
   2. [Composition of Patterns](#42-composition-of-patterns)
   3. [Choosing a Pattern](#43-choosing-a-pattern)
   4. [Common Mistakes](#44-common-mistakes)

---

# 1. Creational Patterns

Creational patterns control how objects are created. They separate construction from use, centralize validation, and make it easier to substitute one implementation for another.

Use a creational pattern when object creation has branching logic, many optional settings, lifecycle rules, or infrastructure-specific details.

## 1.1 Factory

### Problem

The caller needs an object that follows a known contract, but should not need to know which concrete class to instantiate. A factory centralizes the creation decision.

### Example: notification factory

```js
class EmailNotification {
  constructor(address) {
    this.address = address;
  }

  send(message) {
    return `Email to ${this.address}: ${message}`;
  }
}

class SmsNotification {
  constructor(phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  send(message) {
    return `SMS to ${this.phoneNumber}: ${message}`;
  }
}

function createNotification(channel, destination) {
  const creators = {
    email: () => new EmailNotification(destination),
    sms: () => new SmsNotification(destination)
  };

  const create = creators[channel];
  if (!create) {
    throw new Error(`Unsupported notification channel: ${channel}`);
  }

  return create();
}

function notifyUser(channel, destination, message) {
  const notification = createNotification(channel, destination);
  return notification.send(message);
}

console.log(notifyUser("email", "dev@example.com", "Build passed"));
```

The consumer only depends on `send()`. It does not depend on `EmailNotification` or `SmsNotification` directly.

### Factory variants

- A **simple factory** is one function that selects a concrete object.
- A **factory method** lets a subclass or object customize how an object is created.
- An **abstract factory** creates a family of related objects, such as a complete light-theme or dark-theme component family.

### When to use it

Use a factory when construction has conditionals, validation, configuration, or an external dependency. It is also useful when tests need to replace real products with fakes.

### Tradeoffs

A factory adds indirection. Do not create one only to hide a simple `new` expression. If there is no meaningful creation decision, a constructor or object literal is easier to read.

---

## 1.2 Builder

### Problem

A complex object has many optional properties, and a long positional constructor is difficult to read and easy to misuse. A builder collects configuration step by step and validates it at the end.

### Example: HTTP request builder

```js
class RequestBuilder {
  #url;
  #method = "GET";
  #headers = {};
  #body;

  constructor(url) {
    if (!url) {
      throw new Error("A URL is required");
    }
    this.#url = url;
  }

  method(method) {
    this.#method = method.toUpperCase();
    return this;
  }

  header(name, value) {
    this.#headers[name] = value;
    return this;
  }

  json(body) {
    this.#body = JSON.stringify(body);
    this.header("Content-Type", "application/json");
    return this;
  }

  build() {
    if (["GET", "HEAD"].includes(this.#method) && this.#body) {
      throw new Error(`${this.#method} requests cannot have a body`);
    }

    return {
      url: this.#url,
      options: {
        method: this.#method,
        headers: { ...this.#headers },
        ...(this.#body === undefined ? {} : { body: this.#body })
      }
    };
  }
}

const request = new RequestBuilder("/api/users")
  .method("POST")
  .header("Authorization", "Bearer token")
  .json({ name: "Ada" })
  .build();

console.log(request);
```

Returning `this` enables fluent calls. `build()` is the validation boundary and returns a new object, so a later builder change cannot mutate the already-built request.

### Prefer an options object when appropriate

A builder is not always necessary. A few optional values are often clearer as an options object:

```js
function createRequest({ url, method = "GET", headers = {}, body } = {}) {
  return {
    url,
    options: { method, headers, body }
  };
}
```

Use a builder when construction has many meaningful steps, ordering rules, or cross-field validation.

---

## 1.3 Singleton

### Problem

A resource must have one shared instance, such as a configuration registry or a process-wide metrics collector. A singleton controls construction so repeated requests return the same instance.

### Example: class singleton

```js
class Config {
  constructor() {
    if (Config.instance) {
      return Config.instance;
    }

    this.apiUrl = "https://api.example.com";
    Config.instance = this;
  }
}

const c1 = new Config();
const c2 = new Config();

console.log(c1 === c2); // true
```

### ES module singleton

ES modules are evaluated once and cached. Module-level state therefore already has singleton-like behavior:

```js
class Configuration {
  #values;

  constructor(values) {
    this.#values = Object.freeze({ ...values });
  }

  get(name) {
    return this.#values[name];
  }
}

let configuration;

export function getConfiguration() {
  if (!configuration) {
    configuration = new Configuration({
      apiBaseUrl: "https://api.example.com",
      timeoutMs: 5000
    });
  }

  return configuration;
}
```

### Why singletons are risky

- Hidden global state makes dependencies less visible.
- Tests can leak state into one another.
- Shared mutable state makes concurrent work harder to reason about.
- A singleton can become a service locator that gives unrelated code access to everything.

Prefer creating one instance in the application composition root and passing it to the components that need it. Use a singleton only when the single-instance rule is a real resource or domain constraint.

---

# 2. Structural Patterns

Structural patterns organize objects and functions into larger structures. They help incompatible APIs work together, hide subsystem complexity, and add behavior without changing the original implementation.

## 2.1 Module

### Problem

Several functions need to share private state, but callers should interact only through a small public API. The module pattern uses closure scope or ES module scope for encapsulation.

Modern `export` and `import` modules are the default choice for file-level boundaries. A closure-based module is especially useful when the application needs multiple independent instances at runtime.

### Example: private cart state

```js
function createCart() {
  const items = new Map();

  function add(product, quantity = 1) {
    if (quantity <= 0) {
      throw new RangeError("Quantity must be positive");
    }

    const currentQuantity = items.get(product.id) ?? 0;
    items.set(product.id, currentQuantity + quantity);
  }

  function remove(productId) {
    items.delete(productId);
  }

  function getTotal(productsById) {
    let total = 0;

    for (const [productId, quantity] of items) {
      const product = productsById.get(productId);
      if (!product) {
        throw new Error(`Unknown product: ${productId}`);
      }
      total += product.price * quantity;
    }

    return total;
  }

  return {
    add,
    remove,
    getTotal,
    get size() {
      return items.size;
    }
  };
}

const cart = createCart();
const products = new Map([
  ["book", { id: "book", price: 20 }],
  ["pen", { id: "pen", price: 3 }]
]);

cart.add(products.get("book"), 2);
cart.add(products.get("pen"));
console.log(cart.getTotal(products)); // 43
// cart.items; // undefined: the Map is private
```

### Why it works

- `items` can be reached only by functions created in the same scope.
- Callers cannot bypass validation by writing directly to the collection.
- `createCart()` creates isolated instances, so carts do not share state.

### Tradeoffs

Private closure state is harder to inspect and serialize. Each instance also gets its own closures. For very large numbers of instances, class methods on a prototype may use less memory.

---

## 2.2 Adapter

### Problem

Existing code expects one interface while a third-party or legacy service exposes another. An adapter translates between them without changing either side.

### Example: payment provider adapter

```js
async function checkout(paymentGateway, order) {
  return paymentGateway.charge({
    amountInCents: order.totalInCents,
    currency: order.currency,
    reference: order.id
  });
}

class ThirdPartyPayments {
  async createPayment({ amount, currencyCode, metadata }) {
    return {
      paymentId: "pay_123",
      status: "succeeded",
      amount,
      currencyCode,
      metadata
    };
  }
}

class PaymentAdapter {
  constructor(client) {
    this.client = client;
  }

  async charge({ amountInCents, currency, reference }) {
    const result = await this.client.createPayment({
      amount: amountInCents,
      currencyCode: currency.toUpperCase(),
      metadata: { orderReference: reference }
    });

    return {
      id: result.paymentId,
      successful: result.status === "succeeded"
    };
  }
}

const gateway = new PaymentAdapter(new ThirdPartyPayments());
await checkout(gateway, {
  id: "order_42",
  totalInCents: 1999,
  currency: "usd"
});
```

The adapter is the integration boundary. It is the right place to normalize names, units, dates, identifiers, response shapes, and provider-specific errors.

### Adapter versus Facade

- An **Adapter** changes one interface into another interface the caller already expects.
- A **Facade** provides a simpler interface over several operations or subsystems.

---

## 2.3 Facade

### Problem

A workflow needs several subsystem calls in a specific order. A facade provides one task-oriented entry point while hiding coordination details.

### Example: checkout facade

```js
class Inventory {
  async reserve(items) {
    console.log("Reserved", items);
    return { reservationId: "reservation_1" };
  }

  async release(reservationId) {
    console.log("Released", reservationId);
  }
}

class Payments {
  async charge(customerId, amount) {
    console.log(`Charged ${customerId} ${amount}`);
    return { paymentId: "payment_1" };
  }
}

class Orders {
  async markPaid(orderId, paymentId) {
    console.log(`Order ${orderId} paid with ${paymentId}`);
  }
}

class CheckoutFacade {
  constructor({ inventory, payments, orders }) {
    this.inventory = inventory;
    this.payments = payments;
    this.orders = orders;
  }

  async placeOrder({ orderId, customerId, items, total }) {
    const reservation = await this.inventory.reserve(items);

    try {
      const payment = await this.payments.charge(customerId, total);
      await this.orders.markPaid(orderId, payment.paymentId);
      return { orderId, paymentId: payment.paymentId };
    } catch (error) {
      await this.inventory.release(reservation.reservationId);
      throw error;
    }
  }
}
```

A facade should coordinate rather than become a second home for every business rule. If it grows too large, move policies into domain services and keep the facade as the application workflow boundary.

---

## 2.4 Proxy

### Problem

An object needs additional behavior such as access control, caching, lazy creation, logging, or rate limiting while preserving the same outward interface.

JavaScript's `Proxy` object can intercept operations dynamically.

### Example: cached API client

```js
function withCache(service, { ttlMs = 1000 } = {}) {
  const cache = new Map();

  return new Proxy(service, {
    get(target, property, receiver) {
      const original = Reflect.get(target, property, receiver);

      if (typeof original !== "function" || property !== "getUser") {
        return original;
      }

      return async function cachedGetUser(userId) {
        const key = `${property}:${userId}`;
        const cached = cache.get(key);

        if (cached && cached.expiresAt > Date.now()) {
          return cached.value;
        }

        const value = await original.call(target, userId);
        cache.set(key, { value, expiresAt: Date.now() + ttlMs });
        return value;
      };
    }
  });
}

const userService = {
  async getUser(userId) {
    console.log("Fetching from server");
    return { id: userId, name: "Ada" };
  }
};

const cachedUserService = withCache(userService);
await cachedUserService.getUser("user_1");
await cachedUserService.getUser("user_1"); // Uses the cache
```

### Proxy cautions

- Proxy behavior can be surprising during debugging.
- Preserve `this` when forwarding methods.
- Define cache invalidation and error behavior explicitly.
- A wrapper function is often easier to understand when only one or two methods need decoration.

---

## 2.5 Decorator

### Problem

Behavior should be added to an object or function without changing its core implementation or creating a large inheritance hierarchy. A decorator wraps the original and preserves its contract.

### Example: timing and retry decorators

```js
function withTiming(operation, logger = console) {
  return async (...args) => {
    const startedAt = performance.now();

    try {
      return await operation(...args);
    } finally {
      logger.log(`Operation took ${Math.round(performance.now() - startedAt)}ms`);
    }
  };
}

function withRetry(operation, { attempts = 3, delayMs = 100 } = {}) {
  return async (...args) => {
    let lastError;

    for (let attempt = 1; attempt <= attempts; attempt++) {
      try {
        return await operation(...args);
      } catch (error) {
        lastError = error;
        if (attempt < attempts) {
          await new Promise(resolve => setTimeout(resolve, delayMs));
        }
      }
    }

    throw lastError;
  };
}

async function fetchReport(reportId) {
  const response = await fetch(`/reports/${reportId}`);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json();
}

const resilientFetchReport = withTiming(
  withRetry(fetchReport, { attempts: 3 })
);
```

Decorators compose because each one returns a function with the same basic contract. Keep each decorator focused on one concern and name important decorated values clearly so behavior is not hidden.

---

# 3. Behavioral Patterns

Behavioral patterns organize communication, algorithms, workflows, and state transitions. They are especially useful when behavior varies independently from the objects that use it.

## 3.1 Strategy

### Problem

One operation can be performed by multiple interchangeable algorithms. Strategy moves the algorithm behind a common contract so it can vary independently from its caller.

### Example: shipping cost strategies

```js
const shippingStrategies = {
  standard({ weightKg, distanceKm }) {
    return 5 + weightKg * 0.5 + distanceKm * 0.01;
  },

  express({ weightKg, distanceKm }) {
    return 15 + weightKg * 1.2 + distanceKm * 0.03;
  },

  pickup() {
    return 0;
  }
};

function calculateShipping(option, packageDetails) {
  const strategy = shippingStrategies[option];
  if (!strategy) {
    throw new Error(`Unknown shipping option: ${option}`);
  }
  return strategy(packageDetails);
}

console.log(calculateShipping("express", {
  weightKg: 2,
  distanceKm: 20
}));
```

A function passed as a dependency is already a valid JavaScript strategy. A class is unnecessary unless the strategy has state or several related methods.

### Benefits

- Algorithms can be tested independently.
- New algorithms do not require editing a large conditional.
- The caller can select an algorithm from configuration or user input.

Do not create a strategy abstraction for an algorithm that is unlikely to vary. A direct function call may be clearer.

---

## 3.2 Observer

### Problem

One subject changes over time, and multiple independent consumers need to react without the subject knowing their concrete types.

### Example: event emitter with unsubscribe support

```js
class EventEmitter {
  #listeners = new Map();

  on(eventName, listener) {
    if (!this.#listeners.has(eventName)) {
      this.#listeners.set(eventName, new Set());
    }

    this.#listeners.get(eventName).add(listener);
    return () => this.off(eventName, listener);
  }

  off(eventName, listener) {
    this.#listeners.get(eventName)?.delete(listener);
  }

  emit(eventName, payload) {
    for (const listener of this.#listeners.get(eventName) ?? []) {
      listener(payload);
    }
  }
}

const store = new EventEmitter();
const unsubscribe = store.on("cart:updated", cart => {
  console.log("Update cart badge", cart.itemCount);
});

store.on("cart:updated", cart => {
  console.log("Persist cart", cart);
});

store.emit("cart:updated", { itemCount: 3 });
unsubscribe();
```

### Observer versus publish/subscribe

In Observer, observers subscribe directly to a subject. In publish/subscribe, publishers and subscribers communicate through a broker or event bus and do not need direct references to each other.

### Production rules

- Return an unsubscribe function and call it when a component is destroyed.
- Define event names and payload shapes as an explicit contract.
- Decide whether one listener error should stop the other listeners.
- Use direct calls for required work and events for optional reactions such as analytics.

---

## 3.3 Command

### Problem

An action should be represented as a value so it can be queued, logged, retried, scheduled, serialized, or undone.

### Example: commands with undo

```js
class TextEditor {
  constructor() {
    this.text = "";
  }
}

class InsertTextCommand {
  constructor(editor, text) {
    this.editor = editor;
    this.text = text;
    this.previousText = "";
  }

  execute() {
    this.previousText = this.editor.text;
    this.editor.text += this.text;
  }

  undo() {
    this.editor.text = this.previousText;
  }
}

class CommandHistory {
  #undoStack = [];

  execute(command) {
    command.execute();
    this.#undoStack.push(command);
  }

  undo() {
    const command = this.#undoStack.pop();
    command?.undo();
  }
}

const editor = new TextEditor();
const history = new CommandHistory();

history.execute(new InsertTextCommand(editor, "Hello"));
history.execute(new InsertTextCommand(editor, " world"));
console.log(editor.text); // Hello world

history.undo();
console.log(editor.text); // Hello
```

For a small JavaScript application, closures are often enough:

```js
function createCommand(doWork, undoWork) {
  return {
    execute: doWork,
    undo: undoWork
  };
}
```

Use command objects when commands have identity, metadata, serialization, or lifecycle. Use a function for a one-off callback.

---

## 3.4 State

### Problem

An object's behavior changes according to its current state. A large conditional over state names becomes difficult to maintain. The State pattern moves state-specific behavior into separate objects.

### Example: media player

```js
class StoppedState {
  play(player) {
    player.setState(new PlayingState());
    return "Playing";
  }

  pause() {
    return "Already stopped";
  }
}

class PlayingState {
  play() {
    return "Already playing";
  }

  pause(player) {
    player.setState(new PausedState());
    return "Paused";
  }
}

class PausedState {
  play(player) {
    player.setState(new PlayingState());
    return "Playing";
  }

  pause() {
    return "Already paused";
  }
}

class AudioPlayer {
  #state = new StoppedState();

  setState(state) {
    this.#state = state;
  }

  play() {
    return this.#state.play(this);
  }

  pause() {
    return this.#state.pause(this);
  }
}

const player = new AudioPlayer();
console.log(player.play());  // Playing
console.log(player.pause()); // Paused
console.log(player.play());  // Playing
```

For a small finite state machine, a transition table can be simpler:

```js
const transitions = {
  stopped: { play: "playing" },
  playing: { pause: "paused" },
  paused: { play: "playing", stop: "stopped" }
};
```

### State versus Strategy

- **Strategy** is selected by a caller to choose an algorithm.
- **State** changes as an object evolves and controls valid transitions.

---

## 3.5 Chain of Responsibility and Middleware

### Problem

A request must pass through several handlers. Each handler can finish the request or pass it to the next handler. Middleware is the common functional JavaScript form.

### Example: middleware pipeline

```js
function compose(middleware) {
  return function run(context) {
    let index = -1;

    function dispatch(currentIndex) {
      if (currentIndex <= index) {
        return Promise.reject(new Error("next() called more than once"));
      }

      index = currentIndex;
      const handler = middleware[currentIndex];
      if (!handler) {
        return Promise.resolve();
      }

      return Promise.resolve(
        handler(context, () => dispatch(currentIndex + 1))
      );
    }

    return dispatch(0);
  };
}

const pipeline = compose([
  async (context, next) => {
    const startedAt = Date.now();
    await next();
    context.durationMs = Date.now() - startedAt;
  },
  async (context, next) => {
    if (!context.user) {
      context.status = 401;
      return;
    }
    await next();
  },
  async context => {
    context.status = 200;
    context.body = { message: "Welcome" };
  }
]);

const context = { user: { id: "user_1" } };
await pipeline(context);
console.log(context.status, context.body);
```

Middleware can run code before and after `next()`. Order is part of behavior, so important ordering constraints should be tested. Calling `next()` twice is usually a bug, while not calling it can intentionally stop a request.

---

## 3.6 Template Method

### Problem

Several workflows have the same high-level steps, but one or two steps vary. Template Method fixes the algorithm order and lets subclasses customize selected steps.

### Example: data importer

```js
class DataImporter {
  async import(source) {
    const rawData = await this.read(source);
    const records = this.parse(rawData);
    const validRecords = this.validate(records);
    return this.save(validRecords);
  }

  read() {
    throw new Error("read() must be implemented");
  }

  parse(rawData) {
    return JSON.parse(rawData);
  }

  validate(records) {
    return records.filter(record => record.id);
  }

  save() {
    throw new Error("save() must be implemented");
  }
}

class JsonFileImporter extends DataImporter {
  async read(filePath) {
    return await readFile(filePath, "utf8");
  }

  async save(records) {
    return { saved: records.length };
  }
}
```

In modern JavaScript, dependency functions often express the same idea with less inheritance:

```js
async function importData(source, { read, parse, validate, save }) {
  const rawData = await read(source);
  return save(validate(parse(rawData)));
}
```

Use the functional form when steps are naturally dependencies. Use a class when the workflow and extension points form a stable conceptual type.

---

## 3.7 Iterator

### Problem

Consumers need to traverse a collection without depending on its internal representation. JavaScript has a standard iterator protocol, so custom collections can work with `for...of`, spread, and other language features.

### Example: paginated collection

```js
class PagedCollection {
  constructor(pages) {
    this.pages = pages;
  }

  *[Symbol.iterator]() {
    for (const page of this.pages) {
      for (const item of page) {
        yield item;
      }
    }
  }
}

const collection = new PagedCollection([
  [{ id: 1 }, { id: 2 }],
  [{ id: 3 }]
]);

for (const item of collection) {
  console.log(item.id);
}

const allItems = [...collection];
```

An iterable exposes `[Symbol.iterator]()` and returns an iterator. An iterator exposes `next()`, which returns `{ value, done }`. Generators implement this protocol conveniently.

### Lazy evaluation

Generators do not calculate all values up front:

```js
function* take(iterable, count) {
  let taken = 0;

  for (const value of iterable) {
    if (taken++ === count) {
      return;
    }
    yield value;
  }
}

console.log([...take([10, 20, 30, 40], 2)]); // [10, 20]
```

Use iterators for large, lazy, streaming, or custom traversal behavior. For a normal array, built-in array methods are usually clearer.

---

# 4. Supporting Design Techniques

The following techniques support all three pattern categories. They are included separately because they are broader than one object-creation, composition, or interaction pattern.

## 4.1 Dependency Injection

### Problem

A component creates its own database client, clock, logger, or network service. That couples business code to infrastructure and makes testing difficult. Dependency Injection supplies collaborators from outside.

### Example: injected repository and clock

```js
function createSessionService({ findUser, saveSession, now }) {
  return {
    async createSession(userId) {
      const user = await findUser(userId);
      if (!user) {
        throw new Error("User not found");
      }

      const createdAt = now();
      const session = {
        userId,
        createdAt,
        expiresAt: createdAt + 60 * 60 * 1000
      };

      await saveSession(session);
      return session;
    }
  };
}

const service = createSessionService({
  findUser: userRepository.findById,
  saveSession: sessionStore.save,
  now: () => Date.now()
});
```

A test can provide deterministic collaborators:

```js
const testService = createSessionService({
  findUser: async () => ({ id: "user_1" }),
  saveSession: async session => session,
  now: () => 1_000
});
```

Prefer the narrowest dependency contract. If a service needs one operation, inject that operation instead of passing a large service container.

---

## 4.2 Composition of Patterns

Patterns are often combined around one application boundary. For example, an order system might use:

1. A **Factory** to create a payment provider.
2. An **Adapter** to normalize the provider API.
3. A **Strategy** to select pricing or fraud logic.
4. A **Facade** to coordinate inventory, payment, and order services.
5. An **Observer** to publish `order:paid` after success.
6. A **Command** to queue a retryable payment operation.

The patterns should remain independently understandable. If explaining the combination takes longer than explaining the business rule, simplify it.

```js
function createCheckout({ paymentClient, pricingStrategy, eventBus }) {
  const paymentGateway = new PaymentAdapter(paymentClient);

  return new CheckoutFacade({
    inventory: new Inventory(),
    payments: {
      charge: (customerId, subtotal) =>
        paymentGateway.charge({
          amountInCents: pricingStrategy(subtotal),
          currency: "USD",
          reference: customerId
        })
    },
    orders: {
      async markPaid(orderId, paymentId) {
        eventBus.emit("order:paid", { orderId, paymentId });
      }
    }
  });
}
```

The composition root is the place to assemble concrete implementations. Business code should receive capabilities rather than discover them through global state.

---

## 4.3 Choosing a Pattern

Start with the change that is difficult today:

| Problem | Pattern to consider | Main benefit |
|---|---|---|
| Object creation varies | Factory | Centralized construction decision |
| An object has many optional settings | Builder | Readable configuration and validation |
| Exactly one shared resource is required | Singleton | Controlled single-instance lifecycle |
| Private state needs a small public API | Module | Encapsulation through scope |
| Two APIs do not match | Adapter | Keeps translation at the boundary |
| A workflow has many subsystem calls | Facade | Provides a task-oriented API |
| Caching or access control must be transparent | Proxy | Intercepts operations while preserving the interface |
| Optional behavior should be combined | Decorator | Adds behavior without changing the core |
| An algorithm needs to vary | Strategy | Independent, replaceable algorithms |
| Many consumers react to one change | Observer | Loose coupling between events and reactions |
| An action must be queued or undone | Command | Represents an action as data |
| Behavior depends on lifecycle state | State | Localizes transitions and state behavior |
| Requests pass through ordered checks | Chain or Middleware | Composable request processing |
| Workflows share an algorithm skeleton | Template Method | Fixed process with customizable steps |
| A collection needs custom or lazy traversal | Iterator | Encapsulated traversal |
| Infrastructure should be replaceable | Dependency Injection | Explicit dependencies and testability |

Before introducing a pattern, ask:

1. What concrete change will this design make easier?
2. Where is the extension point?
3. What new indirection, state, or lifecycle does it introduce?
4. Can a plain function, object, or module solve the problem more clearly?
5. Who owns cleanup for subscriptions, timers, sockets, caches, or queues?

---

## 4.4 Common Mistakes

### Choosing a pattern name instead of a problem

Do not say, "This class should be a Singleton." Say, "This resource must have one owner because opening another connection is invalid." The second statement can be evaluated; the first is only a label.

### Building deep inheritance trees

Inheritance couples a child to the parent's implementation and lifecycle. Prefer composition, delegation, or small functions when behavior can vary independently.

### Overusing global events

Events are useful for decoupled optional reactions, but they hide control flow. Use direct calls for required work and events for analytics, notifications, or other optional consumers.

### Exposing mutable shared state

Shared objects can create action-at-a-distance bugs. Encapsulate mutation, validate transitions, and return immutable snapshots where useful.

### Leaking an abstraction

An adapter that exposes third-party response objects, or a facade that requires callers to understand its subsystems, has not created a useful boundary.

### Abstracting too early

Wait until there is a real variation or repeated decision. Two similar functions do not always need a framework; sometimes they need a clearer name and a small shared helper.

### Ignoring lifecycle

Every pattern that allocates or registers something should answer three questions:

- Who owns it?
- When is it released?
- What happens when cleanup fails?

### Testing only implementation details

Test the contract visible to consumers:

- Factories return objects with the expected interface.
- Builders reject invalid combinations.
- Adapters map success and failure cases correctly.
- Observers can unsubscribe.
- Commands execute and undo correctly.
- State objects handle invalid transitions.
- Middleware preserves ordering and error behavior.
- Injected dependencies can be replaced with deterministic fakes.

---

## Final Checklist

Before adding a pattern, confirm that:

- The problem is recurring or has a clear axis of change.
- The pattern reduces coupling or makes behavior easier to test.
- The public contract is smaller than the implementation it hides.
- Ownership, errors, cleanup, and lifecycle are explicit.
- A simpler function, object, or module would not be clearer.

The goal is not to use more patterns. The goal is to make the next change predictable.
