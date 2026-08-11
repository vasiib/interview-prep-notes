# React JS
React Js

<a id="question-list"></a>
### Question List

1. [What is React, and why is it popular?](#q1)
2. [What are the differences between functional and class components?](#q2)
3. [What are hooks, and why were they introduced?](#q3) 
4. [Explain the React component lifecycle.](#q4)
5. [Explain the React phases.](#q5)
6. [What is the Virtual DOM?](#q6)
7. [How does React's reconciliation algorithm work? and Why Key is important?](#q7)
8. [What is JSX? How is it converted to JavaScript?](#q8)
9. [What are controlled and uncontrolled components?](#q9)
10. [Explain useState](#q10)
11. [Explain useEffect and its dependency array.](#q11)
12. [Difference between useEffect and useLayoutEffect.](#q12)

---

## Answers

<a id="q1"></a>
### 1. What is React, and why is it popular?

**React** (also known as ReactJS) is an open-source JavaScript library developed by Meta (Facebook) in 2013 for building user interfaces (UIs), specifically single-page web applications.

Rather than rendering full HTML pages from scratch every time data changes, React lets developers break down web pages into small, isolated, reusable pieces called **components** (such as buttons, search bars, or user cards) and update only the parts of the page that actually change.

---

## Key Reasons Why React is So Popular

### 1. Component-Based Architecture
React applications are built like Lego blocks. You write reusable components—each with its own logic and layout—and assemble them to build complex interfaces. This keeps code organized, scalable, and easy to maintain across large engineering teams.

```jsx
// Example of a reusable React Component
function UserGreeting({ name }) {
  return <h1>Welcome back, {name}!</h1>;
}
```

### 2. Declarative & State-Driven UI
Instead of manually manipulating the DOM (e.g., using vanilla JavaScript to query elements and change their styling or text line-by-line), you simply define what the UI *should* look like based on current data (**state**). When the state changes, React automatically handles rendering the changes.

### 3. High Performance with the Virtual DOM
Directly updating the browser's Document Object Model (DOM) can be slow. React maintains an in-memory lightweight copy called the **Virtual DOM**. When changes occur:
1. React updates the Virtual DOM first.
2. It compares the new Virtual DOM with the previous snapshot (a process called *diffing*).
3. It updates **only** the modified elements in the real browser DOM, drastically boosting rendering speed.

### 4. The Power of JSX
React uses **JSX** (JavaScript XML), an extension that allows developers to write HTML directly inside JavaScript code. This combines UI templating and dynamic logic into a single cohesive file, making the developer workflow faster and more intuitive.

### 5. Massive Ecosystem & Industry Standard
Because React is backed by Meta and heavily adopted by tech giants (Netflix, Airbnb, Uber, Spotify):
* **Strong Job Market:** It consistently ranks among the most requested front-end skill sets worldwide.
* **Next-Level Frameworks:** Popular full-stack frameworks like **Next.js** build on top of React for server-side rendering (SSR), SEO optimizations, and routing.
* **Cross-Platform Skill Reuse:** Developers who master React can transition to building native iOS and Android mobile apps using **React Native** with minimal friction.

[Back to question list](#question-list)

<a id="q2"></a>

### 2. What are the differences between functional and class components?

* **Functional Components:** Modern React components written as plain JavaScript functions. They manage state and lifecycle logic using Hooks (like `useState` and `useEffect`), resulting in cleaner, concise, and easier-to-read code without using the `this` keyword.

Example:
```
import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  // Replaces componentDidMount & componentDidUpdate
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

* **Class Components:** Older ES6 class-based components that rely on `this.state`, `this.setState()`, and explicit lifecycle methods (`componentDidMount`, `componentDidUnmount`). They require more boilerplate code and are primarily seen in legacy React projects.

Example:

```
import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    document.title = `Count: ${this.state.count}`;
  }

  componentDidUpdate() {
    document.title = `Count: ${this.state.count}`;
  }

  render() {
    return (
      <button onClick={() => this.setState({ count: this.state.count + 1 })}>
        Count: {this.state.count}
      </button>
    );
  }
}
```

[Back to question list](#question-list)

<a id="q3"></a>

### 3. What are hooks, and why were they introduced?

**React Hooks** are built-in functions introduced in React 16.8 that allow you to use state and other React features (like lifecycle methods and context) inside **functional components** without writing a class component.

## Key Hooks

* `useState`: Allows functional components to store and update local state.
* `useEffect`: Handles side effects (like fetching data, subscribing to events, or modifying the DOM) replacing class lifecycle methods like `componentDidMount` and `componentDidUpdate`.
* `useContext`: Makes it easy to access React Context values without nesting consumer components.

## Why Were Hooks Introduced?

### 1. Eliminating Class Complexity and `this` Binding
Class components required understanding how JavaScript's `this` keyword works, which often led to binding issues in event handlers and unnecessary boilerplate code (constructors, explicit renders, etc.).

### 2. Reusing Stateful Logic Between Components
Before Hooks, sharing reusable stateful logic (like tracking a mouse position or custom window resizing) required complex patterns like **Render Props** or **Higher-Order Components (HOCs)**, which created deeply nested "wrapper hell" in component trees. Custom Hooks make stateful logic easily extractable and reusable across multiple components.

### 3. Organizing Related Code Together
In class components, related logic was split across separate lifecycle methods (e.g., setting up a timer in `componentDidMount` and clearing it in `componentWillUnmount`). Hooks group related code together in a single `useEffect` block, making code far easier to read and maintain.

### 4. Future-Proofing React
Functional components with Hooks enable React to optimize tree shaking, component minification, and advanced compiler features more effectively than ES6 class syntax allows.

[Back to question list](#question-list)

<a id="q4"></a>

### 4. Explain the React component lifecycle.

The **React component lifecycle** represents the series of phases a component goes through from its creation to its destruction. Understanding this cycle helps you manage state, handle side effects (like API calls or event listeners), and optimize performance.

---

## The 3 Main Lifecycle Phases

```
    MOUNTING                 UPDATING                UNMOUNTING
(Component Created)      (Props/State Change)    (Component Removed)
         │                        │                        │
         ▼                        ▼                        ▼
  Initial Render           Re-render UI             Cleanup Tasks
  (e.g., fetch data)      (e.g., respond to data)   (e.g., clear timers)
```

### 1. Mounting
This is the phase when a component is created and inserted into the real DOM for the first time.
* **Common tasks:** Initializing state, making initial API calls, setting up subscriptions/timers.

### 2. Updating
This phase occurs whenever a component's **props** or **state** change, triggering a re-render to keep the UI in sync with the data.
* **Common tasks:** Fetching new data based on changed props, responding to user interactions, DOM updates.

### 3. Unmounting
This is the final phase when a component is removed from the DOM.
* **Common tasks:** Cleaning up resources to prevent memory leaks (e.g., clearing `setInterval`, removing event listeners, canceling pending API requests).

---

## How Lifecycle Is Handled (Hooks vs. Classes)

### Modern React: Functional Components with `useEffect`
In modern React, the `useEffect` hook replaces all traditional lifecycle methods. The **dependency array** (the second argument of `useEffect`) controls when the effect runs:

```jsx
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  // 1. MOUNTING & UPDATING (Runs on mount, and whenever `userId` changes)
  useEffect(() => {
    fetchUserData(userId).then(data => setUser(data));

    // 3. UNMOUNTING (Cleanup function: runs when component unmounts or before re-running)
    return () => {
      console.log('Cleaning up event listeners or timers...');
    };
  }, [userId]); // Dependency array

  // 1. MOUNTING ONLY (Empty array = runs once on mount)
  useEffect(() => {
    console.log('Component mounted for the first time!');
  }, []);

  return <div>{user ? user.name : 'Loading...'}</div>;
}
```

### Legacy React: Class Component Lifecycle Methods
In older class components, lifecycle phases were explicitly split into separate methods:

| Phase | Class Method | Functional Equivalent (`useEffect`) |
| :--- | :--- | :--- |
| **Mounting** | `componentDidMount()` | `useEffect(() => {}, [])` |
| **Updating** | `componentDidUpdate(prevProps, prevState)` | `useEffect(() => {}, [prop, state])` |
| **Unmounting** | `componentWillUnmount()` | `useEffect(() => { return () => cleanup() }, [])` |

---

## Summary

* **Mount:** Screen renders for the first time.
* **Update:** State/props change → component re-renders.
* **Unmount:** Component is destroyed → clean up resources.

[Back to question list](#question-list)

<a id="q5"></a>

### 5. Explain the React phases.

The React execution cycle is divided into **two primary internal phases** (plus a specialized error handling phase) that determine how React calculates updates and applies them to the browser UI.

---

## 1. Render Phase (Pure Computation)

During the **Render Phase**, React determines what changes need to be made to the DOM by invoking your components.

* **What Happens:** React executes functional components (or calls the `render()` method in class components) and constructs/diffs the Virtual DOM tree to calculate changes.
* **Key Characteristic:** **Pure and Side-Effect-Free.** This phase can be paused, restarted, or aborted by React's Concurrent Engine if higher-priority updates (like user input) occur.
* **Golden Rule:** Never perform side effects here—no API requests, no direct DOM manipulations, and no state updates that trigger infinite re-renders.

---

## 2. Commit Phase (DOM Mutation & Effects)

Once React completes the Render Phase and determines the necessary changes, it enters the **Commit Phase** to update the actual browser UI.

This phase executes in specific sequential steps:

1. **DOM Mutation:** React inserts, updates, or removes DOM nodes to match the new Virtual DOM tree.
2. **`useLayoutEffect` Execution:** Synchronous layout effects run immediately *after* DOM updates but *before* the browser paints the screen.
3. **Browser Paint:** The browser draws the updated DOM elements on screen for the user to see.
4. **`useEffect` Execution:** Standard effects run asynchronously *after* the browser paint completes so user interactions and screen updates aren't blocked.

* **Key Characteristic:** **Synchronous and Uninterruptible.** Once started, React completes the entire commit phase without pausing.

---

## 3. Error Boundary Phase (Catch Phase)

If an unexpected error occurs during rendering or inside a child component's lifecycle method, React enters a catch phase via Error Boundaries (`componentDidCatch` or `getDerivedStateFromError`) to prevent the entire app from crashing and display a fallback UI instead.

---

## Summary

```
Trigger (State/Props Change) ──> Render Phase (Pure) ──> Commit Phase (DOM Update) ──> Browser Paint ──> useEffect
```

[Back to question list](#question-list)

<a id="q6"></a>

### 6. What is the Virtual DOM?

The **Virtual DOM** is a core concept in React (and used by some other frameworks too) that makes UI updates fast and efficient. Here's how it works:
 
## The Problem It Solves
 
The actual DOM (Document Object Model) — the browser's live representation of your webpage — is slow to manipulate directly. Every time you change something in the real DOM (like updating text or adding an element), the browser may need to recalculate styles, layout, and repaint the screen. Doing this frequently, especially for large or complex UIs, gets expensive.
 
## How the Virtual DOM Works
 
1. **A lightweight copy** — React keeps a virtual representation of the UI in memory, as plain JavaScript objects. This is the Virtual DOM. It mirrors the structure of the real DOM but is much cheaper to create and modify.
2. **Re-render on change** — When your app's state or data changes, React doesn't touch the real DOM right away. Instead, it creates a *new* Virtual DOM tree reflecting what the UI should look like now.
3. **Diffing** — React compares this new Virtual DOM tree to the previous one, using an algorithm to figure out exactly what changed (a process called "reconciliation" or "diffing").
4. **Batched, minimal updates** — React then takes only the differences and applies those specific changes to the real DOM, rather than re-rendering the whole page. This is called "patching."

## A Simple Analogy
 
Imagine editing a long document. Instead of retyping the whole thing every time you fix a typo, you just change that one word. The Virtual DOM lets React do something similar — figure out the "one word" that changed, rather than redoing the entire page.
 
## Example
 
```jsx
// Before: count = 0
<div>Count: 0</div>
 
// After: count = 1
<div>Count: 1</div>
```
 
React sees only the text content changed — from "0" to "1" — and updates just that text node in the real DOM, instead of recreating the whole `<div>`.
 
## Why It Matters
 
- **Performance** — minimizes expensive direct DOM operations, especially in apps with frequent updates (like live data feeds or interactive forms).
- **Simpler mental model** — developers can write code as if the whole UI re-renders on every change, without worrying about manually tracking and optimizing what to update. React handles that optimization behind the scenes.

[Back to question list](#question-list)

<a id="q7"></a>

### 7. How does React's reconciliation algorithm work? and Why Key is important?
 
**Reconciliation** is the process React uses to figure out what changed between two Virtual DOM trees (before vs. after an update) so it can apply the minimum number of changes to the real DOM. It's the "diffing" step mentioned earlier, but let's go deeper into how it actually works.
 
### The Core Challenge
 
Comparing two arbitrary trees and finding the minimal set of differences is, in general, a computationally expensive problem — O(n³) for a generic tree-diffing algorithm, where n is the number of elements. That's too slow for UI updates that need to happen many times per second.
 
React solves this by using **heuristics** based on two assumptions that are true for the vast majority of UI cases:
 
1. **Two elements of different types will produce different trees.** If a `<div>` becomes a `<span>`, React won't try to figure out what's reusable inside — it just tears down the old tree and builds a new one.
2. **Elements with a stable `key` prop stay consistent across renders.** Keys let React track which items in a list are the "same" item, even if their position changes.
These two rules bring the algorithm down to O(n) — linear time — which is fast enough for real-time UI updates.
 
### How the Diffing Works, Step by Step
 
**1. Comparing element types**
- If the root elements have different types (e.g., `<div>` → `<p>`), React tears down the old tree completely and builds the new one from scratch, including unmounting all child components and their state.
- If the types are the same (e.g., `<div>` → `<div>`), React keeps the underlying DOM node and only updates the changed attributes.
**2. Comparing DOM elements of the same type**
React looks at the attributes/props and updates only what's different:
 
```jsx
// Before
<div className="before" title="stuff" />
 
// After
<div className="after" title="stuff" />
```
 
React updates only `className` on the real DOM node — `title` is left untouched since it didn't change.
 
**3. Recursing on children**
By default, React walks through both lists of children at the same time and compares them pairwise, generating a mutation whenever there's a difference. This is where `key` becomes critical.
 
### Why Keys Matter
 
Without keys, React compares children by their **index** in the list. This causes problems when items are reordered, inserted, or removed:
 
```jsx
// Without keys — inserting at the front confuses React
<li>Alice</li>
<li>Bob</li>
 
// Becomes:
<li>Charlie</li>
<li>Alice</li>
<li>Bob</li>
```
 
React would compare index 0 → index 0 (Alice becomes Charlie: update), index 1 → index 1 (Bob becomes Alice: update), then add a new node for Bob — three operations, and it destroys/recreates state attached to the wrong items.
 
With unique, stable keys:
 
```jsx
<li key="alice">Alice</li>
<li key="bob">Bob</li>
 
// Becomes:
<li key="charlie">Charlie</li>
<li key="alice">Alice</li>
<li key="bob">Bob</li>
```
 
React matches elements by key across renders, recognizes Alice and Bob as unchanged, and just inserts Charlie — one operation, and no lost state.
 
This is also why using array **index** as a key is discouraged when list order can change — it defeats the purpose, since the "identity" of an item becomes tied to its position rather than the item itself.
 
### Component-Level Reconciliation
 
For custom components (not just DOM elements), React applies the same type-comparison logic:
- Same component type → the component instance is preserved, and React updates its props, then re-renders it (calling `render()` or re-invoking the function).
- Different component type → the old instance is unmounted (losing its state) and a new one is mounted.
### Fiber: The Modern Reconciler
 
Since React 16, the reconciliation engine is called **Fiber**. It reworked the internals to allow reconciliation work to be:
- **Interruptible** — React can pause, abort, or resume work on parts of the tree, so long-running rendering doesn't block the browser from responding to things like user input.
- **Prioritized** — updates can be assigned different priority levels (e.g., a text input update is more urgent than an off-screen list re-render), which is what powers features like concurrent rendering and transitions in modern React.
The underlying diffing heuristics (type comparison, keys) are the same — Fiber changed *how* the work is scheduled and executed, not the fundamental diffing logic.
 
### In Short
 
Reconciliation is React's strategy for cheaply figuring out "what's the minimal set of real DOM changes needed" by assuming similar-looking trees rather than doing an expensive general comparison, and using `key` props to track identity in lists — trading a bit of rigor for a big speed win that works well in practice.

[Back to question list](#question-list)

<a id="q8"></a>

### 8. What is JSX? How is it converted to JavaScript?

 
**JSX (JavaScript XML)** is a syntax extension for JavaScript that lets you write HTML-like markup directly inside your JS code. It's not valid JavaScript on its own — it's a syntactic sugar that gets compiled into regular JavaScript before it runs in the browser.
 
```jsx
const element = <h1 className="greeting">Hello, world!</h1>;
```
 
Without JSX, you'd have to write this much more verbosely using plain JS:
 
```javascript
const element = React.createElement(
  'h1',
  { className: 'greeting' },
  'Hello, world!'
);
```
 
JSX just makes that easier to read and write.
 
## Why JSX Exists
 
React's philosophy is that rendering logic and UI markup are inherently coupled — how a component looks depends on what data it has. Rather than separating "logic" and "markup" into different files (like traditional HTML/JS separation), JSX lets you keep them together in one place, which makes components easier to reason about.
 
## How JSX Converts to JavaScript
 
JSX is compiled by a tool — typically **Babel** (or the TypeScript compiler, or a bundler's built-in transform like esbuild/SWC) — before your code ever reaches the browser. Browsers don't understand JSX natively.
 
### Step 1: JSX → `React.createElement()` calls
 
Historically (and still supported), JSX compiles down to calls to `React.createElement()`:
 
```jsx
// JSX
const element = <h1 className="greeting">Hello, world!</h1>;
```
 
```javascript
// Compiled output
const element = React.createElement(
  'h1',
  { className: 'greeting' },
  'Hello, world!'
);
```
 
The signature is:
```javascript
React.createElement(type, props, ...children)
```
 
### Step 2: `createElement()` → a plain JS object
 
`React.createElement()` doesn't create a real DOM node — it just returns a plain JavaScript object describing what should be rendered. This object is the "React element," and it's the building block of the Virtual DOM.
 
```javascript
// Roughly what React.createElement returns
{
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
}
```
 
### Step 3: React turns that object into real DOM
 
React (via ReactDOM) reads these element objects and uses them to construct and update actual DOM nodes, applying the reconciliation process to keep updates efficient.
 
## Nested JSX and Expressions
 
JSX supports embedding JavaScript expressions using curly braces `{}`, and nested elements compile into nested `createElement` calls:
 
```jsx
// JSX
function Greeting({ name }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Welcome back.</p>
    </div>
  );
}
```
 
```javascript
// Compiled output
function Greeting({ name }) {
  return React.createElement(
    'div',
    null,
    React.createElement('h1', null, 'Hello, ', name, '!'),
    React.createElement('p', null, 'Welcome back.')
  );
}
```
 
## The Modern JSX Transform
 
Since React 17, there's a newer "automatic" JSX transform. Instead of compiling to `React.createElement()`, it compiles to calls from a special `react/jsx-runtime` module:
 
```javascript
// New transform output
import { jsx as _jsx } from 'react/jsx-runtime';
 
const element = _jsx('h1', { className: 'greeting', children: 'Hello, world!' });
```
 
The practical benefit: you no longer need to manually `import React from 'react'` in every file just to use JSX, since the compiler auto-imports the `jsx` function for you. The underlying concept (JSX → function calls → element objects) hasn't changed — this is just an internal optimization and a bit of ergonomic cleanup.
 
## Key Rules JSX Enforces
 
Because JSX compiles to function calls, it has some quirks that trip up newcomers:
 
- **Single root element** — a component must return one element (or use a `<>...</>` Fragment to group multiple elements without adding an extra DOM node), since a function can only return one value.
- **`className` instead of `class`**, `htmlFor` instead of `for`, and camelCase attributes (`onClick`, not `onclick`) — because these become JavaScript object properties, and `class`/`for` are reserved words in JS.
- **Self-closing tags required** for elements with no children: `<img />`, not `<img>`.
- **JavaScript expressions only in `{}`** — you can embed expressions (`{name}`, `{1 + 1}`, `{items.map(...)}`) but not statements like `if` or `for` loops directly; you use ternaries, `&&`, or `.map()` instead.
## In Short
 
JSX is just syntactic sugar — a more readable way to write `React.createElement()` calls (or `jsx()` calls under the modern transform). A compiler like Babel transforms it into plain JavaScript function calls at build time, which produce plain JS objects describing the UI, which React then uses to build and update the real DOM.


[Back to question list](#question-list)

<a id="q9"></a>

### 9. What are controlled and uncontrolled components?
 
These terms describe two different approaches to handling form inputs (`<input>`, `<textarea>`, `<select>`) in React — specifically, *who owns the current value* of the input.
 
## Controlled Components
 
In a **controlled component**, React state is the "single source of truth" for the input's value. The input's value is set by state, and every keystroke updates that state via an `onChange` handler.
 
```jsx
function NameForm() {
  const [name, setName] = useState('');
 
  return (
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}
```
 
**How it works:**
1. User types a character.
2. `onChange` fires, calling `setName()` with the new value.
3. React re-renders, and the input's `value` prop reflects the updated state.
4. The DOM input visually updates — but only *because* React told it to, not because the browser updated it independently.
**Why use it:**
- You can validate, transform, or restrict input in real time (e.g., force uppercase, block non-numeric characters).
- You can easily enable/disable a submit button based on form validity.
- The form's data lives in one predictable place (state), making it easy to reset, prefill, or sync with other UI.
- It fits React's declarative philosophy — the UI is always a direct reflection of state.
**Trade-off:** Every keystroke triggers a re-render and a state update, which is usually fine but can matter for very large or complex forms.
 
## Uncontrolled Components
 
In an **uncontrolled component**, the DOM itself manages the input's state, the way form elements traditionally work in plain HTML. React doesn't track the value on every change — instead, you reach into the DOM (typically via a `ref`) to *read* the value only when you need it, like on form submit.
 
```jsx
function NameForm() {
  const inputRef = useRef(null);
 
  function handleSubmit(e) {
    e.preventDefault();
    alert('Name submitted: ' + inputRef.current.value);
  }
 
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={inputRef} defaultValue="" />
      <button type="submit">Submit</button>
    </form>
  );
}
```
 
**Key differences:**
- No `value` prop — the input manages its own internal state.
- `defaultValue` sets the *initial* value only (like HTML's `value` attribute), not a controlled value.
- You access the current value on demand using `ref.current.value`, rather than reading it from React state.
**Why use it:**
- Less code for simple forms where you don't need real-time validation.
- Slightly better performance for very large forms, since typing doesn't trigger React re-renders.
- Useful when integrating with non-React code or libraries that expect to manage DOM values themselves (e.g., some file inputs, or third-party widgets).
## Side-by-Side Comparison
 
| Aspect | Controlled | Uncontrolled |
|---|---|---|
| Source of truth | React state | The DOM |
| Value access | `value` prop, always in sync | `ref.current.value`, read on demand |
| Real-time validation | Easy | Harder (need extra listeners) |
| Re-renders on keystroke | Yes | No |
| Code verbosity | More boilerplate | Less boilerplate |
| Typical use case | Forms needing validation, conditional logic, or dynamic UI | Simple forms, file inputs, quick integrations |
 
## A Special Case: File Inputs
 
`<input type="file">` is **always uncontrolled** in React, because the value (the selected file) is managed by the browser for security reasons — you cannot programmatically set it via a `value` prop. You must use a `ref` to access the selected file(s).
 
```jsx
<input type="file" ref={fileInputRef} onChange={handleFileChange} />
```

[Back to question list](#question-list)

<a id="q10"></a>

### 10. Explain useState

`useState` is a React Hook that lets you add state — data that can change over time — to a function component. It's one of the most fundamental hooks, since function components otherwise have no built-in way to "remember" values between renders.
 
## Basic Syntax
 
```jsx
const [state, setState] = useState(initialValue);
```
 
- **`state`** — the current value.
- **`setState`** — a function used to update the value and trigger a re-render.
- **`initialValue`** — the value `state` starts with on the first render.
`useState` returns an array with exactly two elements, and the array destructuring syntax (`const [a, b] = ...`) is just a convenient way to name them however you like.
 
## A Simple Example
 
```jsx
import { useState } from 'react';
 
function Counter() {
  const [count, setCount] = useState(0);
 
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```
 
- On the first render, `count` is `0`.
- Clicking the button calls `setCount(count + 1)`.
- React re-renders the component with the new `count` value, and the UI updates to reflect it.
## Key Behaviors
 
**1. Calling the setter triggers a re-render**
Unlike a regular variable, updating state via `setCount()` tells React "this component's output may have changed — re-run it." Just reassigning a normal variable wouldn't do this.
 
**2. State updates are asynchronous / batched**
React doesn't necessarily apply state updates immediately — it can batch multiple updates together for performance, then re-render once. This means you shouldn't rely on the state variable being updated *immediately* after calling the setter:
 
```jsx
function handleClick() {
  setCount(count + 1);
  console.log(count); // Still logs the OLD value — the update hasn't applied yet
}
```
 
**3. Functional updates for updates based on previous state**
If your new state depends on the previous state, pass a function to the setter instead of a value. This avoids bugs when multiple updates happen close together (e.g., batching, or rapid clicks):
 
```jsx
// Risky if count changes rapidly / gets batched
setCount(count + 1);
 
// Safer — always uses the latest state
setCount(prevCount => prevCount + 1);
```
 
**4. State is preserved between renders, but reset on unmount**
As long as the component stays mounted, its state persists across re-renders. If the component unmounts (removed from the tree) and later remounts, its state resets to the initial value.
 
**5. Each `useState` call is independent**
You can call `useState` multiple times in one component to manage separate pieces of state:
 
```jsx
function Profile() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  // ...
}
```

[Back to question list](#question-list)

<a id="q11"></a>

### 10. Explain useEffect and its dependency array.

`useEffect` is a core React Hook that allows functional components to execute **side effects**—operations like data fetching, subscriptions, manually updating the DOM, or setting up timers—outside of the main render cycle.

---

## Basic Syntax

```jsx
useEffect(() => {
  // 1. Effect Code (Side effect execution)

  return () => {
    // 2. Cleanup Function (Optional: runs before effect re-runs or component unmounts)
    console.log('Cleanup logic executed');
  };
}, [dependency1, dependency2]); // 3. Dependency Array
```

---

## How the Dependency Array Works

The **dependency array** (the second argument passed to `useEffect`) dictates **when** the effect logic will execute.

### 1. No Dependency Array
```jsx
useEffect(() => {
  console.log('Runs on EVERY render');
});
```
* **Behavior:** Runs on initial mount **and** after every subsequent re-render.
* **Caution:** Updating state inside this block without a condition will trigger an infinite re-render loop.

### 2. Empty Dependency Array `[]`
```jsx
useEffect(() => {
  console.log('Runs ONLY ONCE on initial mount');
}, []);
```
* **Behavior:** Runs exactly once when the component mounts onto the page.
* **Common Use Cases:** Fetching initial data, setting up global listeners, or running third-party library initializations.

### 3. Array with Dependencies `[a, b]`
```jsx
useEffect(() => {
  console.log(`Runs on mount AND whenever count changes: ${count}`);
}, [count]);
```
* **Behavior:** Runs on initial mount, and re-runs whenever any dependency value in the array changes between renders.
* **Common Use Cases:** Re-fetching data when a prop/state ID changes, updating calculated values, or responding to specific user actions.

---

## The Cleanup Function

If the callback function inside `useEffect` returns a function, React treats it as a **cleanup procedure**. React executes the cleanup function:
1. **Before** re-running the effect on a subsequent render.
2. **When** the component unmounts from the DOM.

```jsx
import React, { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // Cleanup: clears interval to prevent memory leaks
    return () => clearInterval(intervalId);
  }, []);

  return <div>Timer: {seconds}s</div>;
}
```

---

## Summary Cheat Sheet

| Dependency Array Syntax | Execution Timing | Common Use Cases |
| :--- | :--- | :--- |
| **Omitting the array** | Mount + Every re-render | Unconditional logging (rarely used) |
| **Empty array (`[]`)** | Mount only (once) | Initial data fetching, global event listeners |
| **With values (`[a, b]`)** | Mount + whenever `a` or `b` changes | Dynamic API calls based on state/props |

[Back to question list](#question-list)

<a id="q12"></a>

### 12. Difference between useEffect and useLayoutEffect.

Both `useEffect` and `useLayoutEffect` are built-in React Hooks with identical signatures, but they differ significantly in **when** their callbacks execute relative to the browser painting the screen.

---

## Comparison Table

| Feature | `useEffect` | `useLayoutEffect` |
| :--- | :--- | :--- |
| **Execution Timing** | Asynchronous (runs **after** browser paint) | Synchronous (runs **before** browser paint) |
| **Blocks Screen Paint?** | No | Yes |
| **Primary Purpose** | Standard side effects (fetching data, timers, listeners) | Measuring DOM layout and preventing visual glitches |
| **User Experience** | Non-blocking, faster apparent performance | Prevents visual flickering when mutating DOM layout |

---

## Detailed Comparison

### 1. `useEffect` (Asynchronous & Non-Blocking)
`useEffect` runs asynchronously after React updates the DOM and the browser paints the changes to the screen.

* **Why it is default:** Because it does not block the browser paint, the application feels faster and remains responsive to user interaction.
* **Common Use Cases:**
  * Fetching data from APIs
  * Setting up subscriptions or socket connections
  * Logging analytics events
  * Setting up state updates based on timers

```jsx
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Non-blocking asynchronous data fetch
    fetchUser(userId).then(data => setUser(data));
  }, [userId]);

  return <div>{user ? user.name : 'Loading...'}</div>;
}
```

---

### 2. `useLayoutEffect` (Synchronous & Blocking)
`useLayoutEffect` fires synchronously after React applies DOM changes, but **before** the browser paints the screen.

* **Why it exists:** If you need to read DOM measurements (e.g., element width, scroll position) and immediately update DOM state/styles based on those measurements, `useEffect` can cause a visible **flicker** (rendering the initial state, measuring, then instantly re-rendering). `useLayoutEffect` forces React to calculate and apply all changes before painting the UI.
* **Common Use Cases:**
  * Calculating positions for tooltips, dropdowns, or popovers relative to an anchor element
  * Smooth animations requiring DOM measurements
  * Mutating DOM nodes directly before screen repaints

```jsx
import React, { useState, useLayoutEffect, useRef } from 'react';

function Tooltip() {
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  useLayoutEffect(() => {
    // Synchronously measure DOM before screen paint to prevent flickering
    setHeight(ref.current.getBoundingClientRect().height);
  }, []);

  return <div ref={ref}>Tooltip Height: {height}px</div>;
}
```

---

## Visual Flow Diagram

```text
React Render Phase (Pure)
         │
         ▼
DOM Updates Applied
         │
         ├───> useLayoutEffect (Runs synchronously BEFORE browser paint)
         │
         ▼
Browser Paints Screen
         │
         └───> useEffect (Runs asynchronously AFTER browser paint)
```

---

## Summary Recommendation

* **Default to `useEffect`** for 99% of side effects to keep your UI responsive and avoid blocking renders.
* **Use `useLayoutEffect`** only when you observe visual flickering caused by layout measurement logic or direct DOM updates.