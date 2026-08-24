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
13. [How does React Fiber work?](#q13)
14. [How does Concurrent Rendering improve performance?](#q14)
15. [What is Automatic Batching?](#q15)
16. [Explain Suspense and its use cases.](#q16)
17. [What are React Server Components?](#q17)
18. [How would you architect a large React application?](#q18) 
19. [Explain useMemo and useCallback.](#q19)
20. [When should you use useRef?](#q20)
21. [Explain useReducer.](#q21)


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

[Back to question list](#question-list)

<a id="q13"></a>

### 13. How does React Fiber work?

**React Fiber** is the complete rewrite of React’s core reconciliation engine introduced in React 16. Its primary goal is to make rendering incremental, non-blocking, and performant—especially for complex user interfaces with heavy animations, user inputs, or large component trees.

---

## The Problem Fiber Solved: The Stack Reconciler

Before Fiber, React used the **Stack Reconciler**. 
* Whenever state changed, React recursively traversed the component tree and computed updates in a single, uninterrupted synchronous block.
* **The issue:** If the component tree was large, this synchronous work could take longer than 16 milliseconds (the frame budget for 60fps displays), causing the browser to drop frames. This led to unresponsive UIs, input lag, and stuttering animations.

---

## Key Concepts of React Fiber

React Fiber solved this by introducing a new data structure (called a **Fiber node**) and breaking rendering down into small, pauseable units of work.

### 1. What is a "Fiber"?
A Fiber is a plain JavaScript object that represents a unit of work and corresponds directly to a React element/component. Unlike traditional JS call stack frames, Fiber nodes are stored on the heap as a linked list, which allows React to pause, resume, or discard execution at any time.

Each Fiber node maintains pointers to related nodes:
* `child`: Points directly to its first child component.
* `sibling`: Points to its next sibling component.
* `return`: Points back to its parent component (acting as a return address).

### 2. Incremental Rendering & Priority Scheduling
React Fiber divides work into tiny chunks and uses a priority scheduler:
* React assigns priorities to updates (e.g., discrete user input like typing/clicking has higher priority than background data fetching or off-screen rendering).
* If high-priority user input comes in while React is computing a low-priority render, React **pauses** the current render, processes the high-priority update, and then resumes or restarts the low-priority work.

---

## Two-Phase Execution Architecture

Fiber maps cleanly onto React's internal execution phases:

### 1. Render Phase (Reconciliation)
* **Asynchronous & Pauseable.**
* React traverses the Fiber tree and computes the diff between the current UI and the target state.
* Creates a "work-in-progress" Fiber tree alongside the current tree (a mechanism known as **Double Buffering**).
* Generates an *effect list* containing all necessary DOM updates (insertions, updates, deletions).
* Can be paused, aborted, or restarted.

### 2. Commit Phase
* **Synchronous & Uninterruptible.**
* React takes the prepared effect list and applies all DOM mutations in one fast step.
* Executes layout effects (`useLayoutEffect`) and schedules passive effects (`useEffect`).
* Swaps the "work-in-progress" tree to become the new "current" tree.

---

## Double Buffering Mechanism

Similar to graphic engines, React uses **Double Buffering** to prevent incomplete renders from showing on screen:
* **Current Tree:** The Fiber tree representing what is currently visible on screen.
* **Work-In-Progress (WIP) Tree:** The Fiber tree React constructs in memory during the Render phase.

When the Commit phase finishes, React simply flips its internal pointer so the WIP tree becomes the Current tree instantly, ensuring smooth visual updates.

---

## Summary Cheat Sheet

| Aspect | Stack Reconciler (Legacy) | Fiber Reconciler (Modern) |
| :--- | :--- | :--- |
| **Execution Style** | Synchronous & Recursive | Asynchronous & Incremental |
| **Interruptibility** | Cannot be paused | Pauseable, resumed, or discarded |
| **Data Structure** | JS Call Stack | Linked List on Heap |
| **Key Capability** | Simple rendering | Concurrent Features, Priority Scheduling |

[Back to question list](#question-list)

<a id="q14"></a>

### 14. How does Concurrent Rendering improve performance?

**Concurrent Rendering** (introduced in React 18) is an architectural feature built on top of the React Fiber engine that allows React to interrupt, pause, resume, or abandon a render in progress.

Before Concurrent Rendering, rendering was synchronous and blocking. Once React started rendering an update, nothing could stop it until the entire component tree was processed. Concurrent Rendering fundamentally improves performance and user responsiveness in several key ways.

---

## 1. Eliminating Main-Thread Blocking

In traditional rendering, a heavy re-render (such as filtering a list of 10,000 items) blocks the browser's single thread. User inputs, clicks, and animations freeze until rendering completes.

With Concurrent Rendering, React breaks rendering work into tiny tasks. Between these tasks, React yields control back to the browser so it can process urgent user events (like keypresses or mouse clicks) immediately, keeping the application feeling smooth and responsive.

---

## 2. State Update Priority & Interruptible Rendering

Concurrent Rendering enables React to assign different **priorities** to state updates:

* **Urgent Updates:** Direct user interactions requiring immediate visual feedback (typing in an input field, clicking a tab, toggling a switch).
* **Transition / Non-Urgent Updates:** Secondary updates where a brief delay is acceptable (filtering search results, rendering complex charts, loading page views).

If a user types a new character while React is halfway through rendering a heavy, low-priority list, React **interrupts** the low-priority render, renders the typed character immediately (high priority), and then resumes or restarts the background list render.

### Key Hooks for Transitions:

* `useTransition()`: Marks a state update as non-urgent so it can be interrupted by higher-priority inputs.
* `useDeferredValue()`: Defers updating a non-critical value until urgent updates finish processing.

```jsx
import React, { useState, useTransition } from 'react';

function SearchComponent() {
  const [text, setText] = useState('');
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  function handleChange(e) {
    // 1. Urgent update: update input text immediately
    setText(e.target.value);

    // 2. Non-urgent transition: defer heavy list filtering
    startTransition(() => {
      setQuery(e.target.value);
    });
  }

  return (
    <div>
      <input value={text} onChange={handleChange} />
      {isPending ? <p>Loading list...</p> : <HeavyList query={query} />}
    </div>
  );
}
```

---

## 3. Reusable States via Off-Screen Rendering

Concurrent Rendering enables React to prepare UI in the background without rendering it directly to the real DOM. 

For instance, when switching tabs, React can keep hidden tab states intact in memory and restore them instantly when clicked back, eliminating full re-fetch and re-render overhead.

---

## 4. Selective Hydration with Streaming SSR

When paired with Server-Side Rendering (SSR) and `<Suspense>`, Concurrent Rendering allows React to:
* Stream HTML from the server incrementally as components resolve.
* **Selectively hydrate** the specific parts of the page the user interacts with first, rather than waiting for the entire application JS bundle to download and hydrate before becoming interactive.

---

## Summary Cheat Sheet

| Performance Feature | Core Mechanism | User Experience Impact |
| :--- | :--- | :--- |
| **Non-blocking UI** | Yields main thread back to browser periodically | Fluid inputs and animations during heavy re-renders |
| **Interruptible Render** | Pauses low-priority work when urgent inputs arrive | Instant response to typing and clicks |
| **Selective Hydration** | Prioritizes hydrating components clicked by the user | Dramatically faster Time-to-Interactive (TTI) |


[Back to question list](#question-list)

<a id="q15"></a>

### 15. What is Automatic Batching?

**Automatic Batching** is a performance optimization feature in React 18 that automatically groups multiple state updates into a single re-render, regardless of where those state updates occur.

---

## What Problem Does It Solve?

Before React 18, React only batched state updates that occurred inside **React event handlers** (like button click events or form submit handlers). If state updates happened inside asynchronous callbacks—such as `fetch` promises, `setTimeout`, or native DOM event listeners—React would re-render the component separately for **every single state update**.

### Code Comparison

```jsx
function App() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  // 1. Inside React Event Handlers (Batched in React 17 AND React 18)
  function handleClick() {
    setCount(c => c + 1);
    setFlag(f => !f);
    // Result: Only 1 re-render total
  }

  // 2. Inside Asynchronous Code (Promises, Timers, Native Events)
  function handleAsync() {
    fetch('/api/data').then(() => {
      setCount(c => c + 1);
      setFlag(f => !f);
      // React 17: Causes 2 separate re-renders!
      // React 18: Automatically batched into 1 re-render!
    });
  }
}
```

---

## Key Benefits

1. **Better Application Performance:** Fewer re-renders mean less Virtual DOM reconciliation work and fewer DOM mutations.
2. **Prevents Half-Rendered UI States:** Grouping updates ensures components don't render intermediate, incomplete states (e.g., where `count` is updated but `flag` isn't yet).
3. **Zero Configuration:** Works out of the box when using React 18's `createRoot` API.

---

## How to Opt Out (`flushSync`)

In rare cases where you need a state update to synchronously reflect in the DOM before executing subsequent code, React provides the `flushSync` API to opt out of batching:

```jsx
import { flushSync } from 'react-dom';

function handleClick() {
  flushSync(() => {
    setCount(c => c + 1); // Forces an immediate, synchronous DOM update
  });
  // Real DOM is updated here

  flushSync(() => {
    setFlag(f => !f); // Forces another immediate DOM update
  });
}
```

---

## Summary Cheat Sheet

| Context | React 17 & Earlier | React 18+ (Automatic Batching) |
| :--- | :--- | :--- |
| **React Event Handlers** | Batched (1 re-render) | Batched (1 re-render) |
| **Promises / Async Callbacks** | Not batched (N re-renders) | **Batched (1 re-render)** |
| **`setTimeout` / `setInterval`** | Not batched (N re-renders) | **Batched (1 re-render)** |
| **Native DOM Event Listeners** | Not batched (N re-renders) | **Batched (1 re-render)** |

[Back to question list](#question-list)

<a id="q16"></a>

### 16. Explain Suspense and its use cases.

Suspense is a React feature that lets components "wait" for something — typically async data or code — before rendering, while React shows a fallback UI in the meantime. It's a declarative way to handle loading states, instead of manually tracking `isLoading` flags everywhere.
 
## The Basic Idea
 
You wrap part of your component tree in a `<Suspense>` boundary with a `fallback` prop. If any component inside that boundary isn't ready to render yet, React shows the fallback instead — and swaps in the real content once it's ready.
 
```jsx
import { Suspense } from 'react';
 
function ProfilePage() {
  return (
    <Suspense fallback={<Spinner />}>
      <ProfileDetails />
    </Suspense>
  );
}
```
 
If `ProfileDetails` "suspends" (signals it's not ready), React renders `<Spinner />` instead, without you writing any conditional loading logic inside `ProfileDetails` itself.
 
## How "Suspending" Actually Works
 
A component suspends by **throwing a Promise** during render (conceptually — the mechanics are mostly hidden behind APIs like `use()`, or handled by libraries/frameworks). React catches that thrown promise, looks up the nearest parent `<Suspense>` boundary, and shows its fallback. Once the promise resolves, React retries rendering the component.
 
You don't write the `throw` yourself in normal usage — it's built into things like:
- The `use()` hook (React 19+), which lets you read a promise or context directly during render.
- Data-fetching libraries designed to integrate with Suspense (React Query, Relay, SWR's Suspense mode).
- Frameworks like Next.js, which use Suspense internally for server components and streaming.
## Use Case 1: Data Fetching
 
The most common use case — showing a fallback while data loads, without manual `isLoading` state:
 
```jsx
function ProfilePage({ userId }) {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileDetails userId={userId} />
    </Suspense>
  );
}
 
function ProfileDetails({ userId }) {
  const user = use(fetchUser(userId)); // suspends until resolved
  return <h1>{user.name}</h1>;
}
```
 
Compare this to the manual `useEffect` + `useState` fetch pattern — Suspense removes the need to track loading/error state by hand inside every component that fetches data.
 
## Use Case 2: Code Splitting / Lazy-Loaded Components
 
Suspense pairs naturally with `React.lazy()`, which lets you split your JS bundle so a component's code is only downloaded when needed:
 
```jsx
import { lazy, Suspense } from 'react';
 
const SettingsPanel = lazy(() => import('./SettingsPanel'));
 
function App() {
  return (
    <Suspense fallback={<div>Loading settings...</div>}>
      <SettingsPanel />
    </Suspense>
  );
}
```
 
While the `SettingsPanel` chunk is being fetched over the network, React shows the fallback. This is one of the oldest and most stable Suspense use cases (supported since React 16.6), well before Suspense-for-data-fetching matured.
 
## Use Case 3: Coordinating Multiple Loading States
 
Suspense boundaries can be nested, letting you control granularity — show one big spinner for everything, or let different sections load independently:
 
```jsx
<Suspense fallback={<PageSkeleton />}>
  <Header />
  <Suspense fallback={<PostsSkeleton />}>
    <Posts />
  </Suspense>
  <Suspense fallback={<SidebarSkeleton />}>
    <Sidebar />
  </Suspense>
</Suspense>
```
 
`Posts` and `Sidebar` can load independently and show their own fallback, without blocking `Header` or each other. If you instead want everything to wait together, you use one boundary around all of them.
 
## Use Case 4: Avoiding Fallback "Flicker" with Transitions
 
Suspense pairs with `startTransition` / `useTransition` to avoid re-showing a fallback UI during subsequent updates (e.g., navigating between tabs that both suspend). Without a transition, switching to a new suspended view would revert the whole boundary back to the fallback, which feels jarring:
 
```jsx
function TabContainer() {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState('posts');
 
  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab);
    });
  }
  // ...
}
```
 
With the transition, React keeps showing the *old* tab's content (optionally dimmed via `isPending`) while the new tab's data loads in the background, instead of unmounting to the fallback immediately.
 
## Use Case 5: Server Components & Streaming SSR
 
In frameworks like Next.js (App Router), Suspense boundaries let the server **stream** HTML to the browser incrementally — the shell of the page can be sent immediately, with slower parts of the page (e.g., a data-heavy section) streamed in later as they become ready, each showing a fallback in the meantime. This significantly improves perceived load performance for server-rendered pages.
 
## What Suspense Is *Not*
 
- **Not an error handler** — Suspense only handles the "loading" state. Errors during suspended rendering are a separate concern, typically handled with an **Error Boundary** (a class component implementing `componentDidCatch` or `getDerivedStateFromError`), often placed alongside a Suspense boundary.
- **Not a data-fetching library itself** — Suspense is a *mechanism* for coordinating fallback UI; it doesn't fetch data for you. You need a Suspense-compatible data source (the `use()` hook, or a library built for it) to actually trigger suspension.
- **Not (fully) usable with arbitrary `useEffect`-based fetching** — Suspense works with fetching approaches designed to integrate with it. A component using a plain `useEffect` + `useState` fetch pattern won't automatically suspend; it manages its own loading state the traditional way.


[Back to question list](#question-list)

<a id="q17"></a>

### 17. What are React Server Components?

# React Server Components (RSC)
 
React Server Components are a component type that renders **exclusively on the server**, never shipping their code to the browser. They're a fairly recent addition to React (stabilized around React 18/19, popularized through Next.js's App Router) and represent a fundamentally different model from the client-only rendering React started with.
 
## The Problem They Solve
 
Traditional React (including SSR — server-side rendering) works like this:
1. Server renders HTML for the initial page.
2. Browser downloads the **full JavaScript bundle** for every component, including ones that only ever display static content.
3. React "hydrates" — re-runs component code on the client to attach event listeners and make the page interactive.
This means even a component that just renders `<p>{blogPost.content}</p>` from a database ships its JS to the browser, increases bundle size, and gets re-executed during hydration — despite never needing interactivity or client-side state.
 
RSCs let you mark components as **server-only**, so:
- Their code **never** ships to the client bundle at all.
- They can directly access server-side resources (databases, file systems, internal APIs) without an API layer.
- Only the *rendered output* (not the component code) is sent to the browser.
## Server Components vs. Client Components
 
React now distinguishes two kinds of components:
 
**Server Components (default)**
```jsx
// No directive needed — Server Component by default in RSC-enabled frameworks
async function BlogPost({ id }) {
  const post = await db.posts.findById(id); // direct DB access!
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
```
- Can be `async` and `await` data directly in the component body — no `useEffect`, no `use()` needed.
- Can access server-only resources (databases, secrets, file systems).
- Zero JS sent to the browser for this component's logic.
- **Cannot** use hooks like `useState`, `useEffect`, or browser-only APIs — there's no client-side lifecycle to hook into.
- **Cannot** attach event handlers like `onClick` — there's no client-side runtime to handle the event.
**Client Components (explicit opt-in)**
```jsx
'use client';
 
function LikeButton({ postId }) {
  const [liked, setLiked] = useState(false);
  return (
    <button onClick={() => setLiked(!liked)}>
      {liked ? '❤️ Liked' : '🤍 Like'}
    </button>
  );
}
```
- Marked with the `'use client'` directive at the top of the file.
- Behaves like "classic" React — supports hooks, state, effects, event handlers.
- Its code *does* ship to the browser, since it needs to run there for interactivity.
## Composing Server and Client Components
 
The key pattern: Server Components can render Client Components, and pass them data as props (server-rendered, then serialized). But Client Components **cannot** import Server Components directly — you compose them the other way, by passing a Server Component as a `children` prop into a Client Component:
 
```jsx
// Server Component
async function BlogPost({ id }) {
  const post = await db.posts.findById(id);
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <LikeButton postId={id} /> {/* Client Component, rendered from server */}
    </article>
  );
}
```
 
This lets you keep most of your tree as lightweight, zero-JS Server Components, with small, targeted "islands" of interactivity as Client Components — rather than the older model where the entire tree ships JS by default.
 
## How Rendering Actually Works
 
1. The server renders Server Components to a special serialized format (not plain HTML — a tree describing components, their props, and where Client Components are embedded).
2. This gets converted to HTML for the initial page load (similar to traditional SSR).
3. The browser also receives the serialized RSC payload, which React uses to "attach" interactivity to the Client Component islands during hydration — without needing to re-run the Server Component logic on the client at all.
4. When a Server Component needs to re-render (e.g., after a mutation, or client-side navigation to another page that uses it), the server can send an updated RSC payload, and React patches the DOM — this is part of what powers frameworks' fast client-side navigation without full-page reloads.
## Use Cases
 
**Data-heavy pages** — dashboards, blogs, product listings, anything that primarily displays server-fetched data benefits from Server Components doing the fetching directly, with no client-side loading state or API route needed.
 
**Reducing bundle size** — large dependencies used only for server-side logic (e.g., a markdown parser, a PDF generator, a heavy formatting library) never ship to the client if only used inside a Server Component.
 
**Direct backend access** — querying a database or reading a file system directly inside a component, without building a separate REST/GraphQL API layer just to expose that data to the client.
 
**Secrets and sensitive logic** — API keys, internal business logic, or anything that shouldn't be exposed in client-side JS can live safely in a Server Component, since its code never reaches the browser.
 
**Streaming with Suspense** — Server Components pair naturally with Suspense to stream in slower parts of a page incrementally, since the server can send fast-resolving components first and stream in slower ones later.
 
## Important Distinctions
 
**RSC ≠ SSR**
Traditional SSR renders the *entire* app to HTML on the server, but still ships all the component JS to the client for hydration. RSC is a different axis: it's about which components *never* need to exist on the client at all, regardless of whether SSR is also happening. You can combine them — and frameworks like Next.js do — but they solve different problems.
 
**RSC is a framework feature, not a "turn it on" React setting**
React itself defines the RSC conventions and rendering model, but you need a framework (Next.js App Router being the most common) or a custom bundler setup to actually use Server Components — plain client-side React (e.g., a Vite SPA) doesn't have a server runtime to render them on.
 
## Trade-offs and Constraints
 
- **No interactivity or hooks in Server Components** — any component needing `useState`, event handlers, `useEffect`, browser APIs, or React Context must be a Client Component.
- **Serialization boundaries** — props passed from a Server Component to a Client Component must be serializable (no functions, class instances, or non-plain objects), since they cross the server-to-client boundary.
- **Mental model shift** — deciding what should be a Server vs. Client Component, and structuring the tree so interactivity is isolated to small leaf components, is a new architectural skill that takes some adjustment from "everything is a client component" thinking.
- **Ecosystem maturity** — many third-party libraries assume a client-only environment and need explicit `'use client'` boundaries or Server Component-compatible alternatives.


[Back to question list](#question-list)

<a id="q18"></a>

### 18. How would you architect a large React application?

# Architecting a Large React Application
 
There's no single "correct" architecture, but there are well-established patterns that scale well as an app grows in size, team, and complexity. Here's how to think through it.
 
## 1. Folder Structure: Feature-Based, Not Type-Based
 
**Avoid** grouping by file type at scale:
```
src/
  components/
  hooks/
  utils/
  pages/
```
This looks organized early on, but as the app grows, related code for one feature ends up scattered across five folders, and unrelated features get tangled together in shared folders.
 
**Prefer** grouping by feature/domain:
```
src/
  features/
    auth/
      components/
      hooks/
      api.ts
      types.ts
    checkout/
      components/
      hooks/
      api.ts
      types.ts
  shared/
    components/   # truly generic, reused UI (Button, Modal, Input)
    hooks/        # generic hooks (useDebounce, useLocalStorage)
    utils/
  app/
    routes.tsx
    providers.tsx
```
Each feature folder is close to self-contained — easier to understand, test, and even delete cleanly when a feature is deprecated. The `shared/` folder stays intentionally small and only holds things genuinely used across multiple features.
 
## 2. State Management: Match the Tool to the State's Scope
 
A common mistake is reaching for one global state solution for everything. Large apps benefit from separating state by *where it lives* and *how it behaves*:
 
| State type | Example | Typical tool |
|---|---|---|
| **Local UI state** | Modal open/closed, form input | `useState` / `useReducer` |
| **Server/remote state** | API data, caching, refetching | React Query / SWR / RTK Query |
| **Global client state** | Theme, auth session, UI preferences | Context, Zustand, Redux (sparingly) |
| **URL state** | Filters, pagination, selected tab | URL search params / router state |
| **Form state** | Multi-field forms, validation | React Hook Form / Formik |
 
The single biggest architectural win in most large React codebases is treating **server state as fundamentally different from client state** — using a library like React Query instead of stuffing fetched data into Redux/Context, since it already handles caching, refetching, and staleness far better than hand-rolled solutions.
 
## 3. Component Layering
 
A useful mental model is separating components into layers by responsibility:
 
- **UI primitives** — pure presentation, no business logic (`Button`, `Card`, `Input`). Highly reusable, easy to test in isolation, often documented in something like Storybook.
- **Feature components** — compose primitives with business logic and data (`CheckoutForm`, `ProductCard`). Live inside their feature folder.
- **Page/route components** — compose feature components into a full screen, handle route-level data loading. Thin by design — they orchestrate, they don't contain deep logic themselves.
This keeps logic near where it's used, but presentation reusable and decoupled from business rules.
 
## 4. Routing and Code Splitting
 
For large apps, lazy-load routes so users only download the JS for the page they're viewing:
 
```jsx
const Dashboard = lazy(() => import('./features/dashboard/Dashboard'));
const Settings = lazy(() => import('./features/settings/Settings'));
 
<Suspense fallback={<PageSkeleton />}>
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/settings" element={<Settings />} />
  </Routes>
</Suspense>
```
This ties directly to `React.lazy` + Suspense — one of the most impactful, low-effort performance wins for large apps, since it keeps the initial bundle small.
 
## 5. Data Fetching Strategy
 
Decide this early, since it affects almost every feature:
- **Client-side fetching** (React Query, SWR) for SPAs.
- **Server Components + framework data loading** (Next.js App Router, Remix loaders) if using a full-stack React framework — lets you fetch data server-side with less client JS.
- Standardize on **one** approach per app. Mixing multiple fetching patterns (some `useEffect` fetches, some React Query, some Redux thunks) is a common source of large-app pain — inconsistent caching, duplicate requests, and hard-to-trace bugs.
## 6. Design System / Shared UI Layer
 
At scale, a consistent, documented set of UI primitives pays off enormously:
- Centralize design tokens (colors, spacing, typography) rather than hardcoding values in components.
- Build (or adopt) a component library — internal, or based on something like Radix/shadcn — so teams aren't reinventing buttons and modals per feature.
- Document components with something like Storybook, so designers and engineers have a shared reference.
## 7. Type Safety
 
For any app beyond a small size, **TypeScript is close to non-negotiable** at this point — it catches a large class of bugs (prop mismatches, undefined data shapes, incorrect API responses) before runtime, and makes large-scale refactors dramatically safer since the compiler flags every place a change breaks something.
 
## 8. Testing Strategy
 
A layered approach tends to work best:
- **Unit tests** for pure logic (utils, reducers, hooks) — fast, isolated.
- **Component tests** (React Testing Library) for UI behavior — "does clicking this button show that text," not implementation details.
- **Integration/E2E tests** (Playwright, Cypress) for critical user flows (checkout, login) — fewer of these, since they're slower and more brittle, but they catch issues unit tests can't.
## 9. Performance Practices Baked into Architecture
 
- **Code splitting** by route (and sometimes by heavy feature) as above.
- **Memoization** (`useMemo`, `useCallback`, `React.memo`) applied deliberately where profiling shows a real cost — not sprinkled everywhere, since overusing memoization adds complexity without guaranteed benefit.
- **Virtualization** (e.g., `react-window`) for long lists, so the DOM doesn't hold thousands of off-screen nodes.
- Regular bundle analysis (e.g., `source-map-explorer`, Next.js's built-in analyzer) to catch bloat before it accumulates.
## 10. Conventions That Prevent Chaos at Scale
 
- **Linting/formatting enforced in CI** (ESLint, Prettier) — non-negotiable at team scale, removes bikeshedding.
- **A clear "where does this go" decision tree** documented for the team (e.g., "is this shared across 2+ features? → `shared/`. Otherwise → the feature folder").
- **Barrel exports used sparingly** — `index.ts` re-exports are convenient but can create circular dependency issues and slow down builds if overused across a huge codebase.
- **API layer abstraction** — a thin, consistent wrapper around fetch/axios calls (error handling, auth headers, base URLs) rather than scattering raw fetch calls through components.
## Putting It Together — A Realistic Large-App Shape
 
```
src/
  app/               # app shell: routing, providers, layout
  features/          # self-contained feature modules
    auth/
    dashboard/
    billing/
  shared/
    ui/              # design system primitives
    hooks/
    utils/
    api/             # base API client, interceptors
  types/             # shared global types
```
 
Paired with: TypeScript, React Query for server state, a lightweight state library (Zustand/Context) for global client state, route-based code splitting, and a documented component library.


[Back to question list](#question-list)

<a id="q19"></a>

### 19. Explain useMemo and useCallback.

# `useMemo` and `useCallback`
 
Both are React Hooks for **memoization** — caching a computed value or function reference across renders so it isn't recreated unnecessarily. They exist purely for performance optimization; they don't change what your component does, only how often work gets redone.
 
## The Underlying Problem
 
By default, every time a component re-renders, **everything inside its function body re-runs** — including expensive calculations and function definitions. Most of the time this is fine, since re-running simple code is cheap. But two situations make this costly:
 
1. An expensive calculation runs on every render, even when its inputs haven't changed.
2. A new function (or object) is created on every render, which breaks reference equality — causing child components wrapped in `React.memo`, or effects depending on that function, to re-render/re-run unnecessarily.
## `useMemo` — Memoize a Computed Value
 
```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
 
`useMemo` re-runs the calculation only when a dependency in the array changes. On re-renders where `a` and `b` are the same, React returns the cached value from last time instead of recalculating.
 
**Example:**
 
```jsx
function ProductList({ products, filter }) {
  const filteredProducts = useMemo(() => {
    return products.filter(p => p.category === filter);
  }, [products, filter]);
 
  return (
    <ul>
      {filteredProducts.map(p => <li key={p.id}>{p.name}</li>)}
    </ul>
  );
}
```
 
Without `useMemo`, `products.filter(...)` would re-run on *every* render of `ProductList` — even if triggered by something unrelated, like a parent re-rendering due to unrelated state. With `useMemo`, the filtering only re-runs when `products` or `filter` actually change.
 
## `useCallback` — Memoize a Function Reference
 
```jsx
const memoizedFn = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```
 
`useCallback` is really just `useMemo` specialized for functions — it returns the *same function reference* across renders as long as dependencies haven't changed, instead of creating a brand-new function object every render.
 
**Example:**
 
```jsx
function ParentComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
 
  const handleClick = useCallback(() => {
    console.log('Clicked!', count);
  }, [count]);
 
  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <ExpensiveChild onClick={handleClick} />
    </div>
  );
}
 
const ExpensiveChild = React.memo(({ onClick }) => {
  console.log('ExpensiveChild rendered');
  return <button onClick={onClick}>Click me</button>;
});
```
 
Without `useCallback`, `handleClick` would be a new function on every render of `ParentComponent` — including when only `text` changes. Since `ExpensiveChild` is wrapped in `React.memo` (which skips re-rendering if props are reference-equal to last time), a new `onClick` function every render would defeat that optimization, causing `ExpensiveChild` to re-render anyway. `useCallback` keeps the same reference as long as `count` hasn't changed, so `React.memo` can actually do its job.
 
## The Relationship Between the Two
 
`useCallback(fn, deps)` is functionally equivalent to `useMemo(() => fn, deps)` — it's a convenience wrapper for the extremely common case of memoizing a function specifically.
 
```jsx
// These are equivalent:
const memoizedFn = useCallback(() => doSomething(a), [a]);
const memoizedFn = useMemo(() => () => doSomething(a), [a]);
```
 
## When They Actually Help
 
Both hooks only pay off in specific situations — they are **not** something to reflexively wrap around every value/function:
 
**`useMemo` is worth it when:**
- The computation is genuinely expensive (heavy loops, large array transformations, complex derived data) — not simple arithmetic or string concatenation.
- The value is passed as a dependency to another hook (`useEffect`, another `useMemo`) where reference stability matters, avoiding unnecessary re-runs of that other hook.
**`useCallback` is worth it when:**
- The function is passed to a child wrapped in `React.memo`, and you want that memoization to actually work.
- The function is a dependency of another hook (like `useEffect`) — without `useCallback`, that effect would re-run every render, since a new function reference each time makes React think the dependency "changed."
## When They *Don't* Help (and Can Even Hurt)
 
Memoization itself isn't free — React has to store the cached value, compare dependencies on every render, and this comparison work isn't zero-cost. Overusing `useMemo`/`useCallback` where they're not needed adds code complexity and small runtime overhead without a meaningful benefit:
 
```jsx
// Unnecessary — this string concatenation is trivially cheap
const greeting = useMemo(() => `Hello, ${name}!`, [name]);
 
// Better — just compute it directly
const greeting = `Hello, ${name}!`;
```
 
```jsx
// Unnecessary — if this function isn't passed to a memoized child
// or used as a dependency elsewhere, wrapping it does nothing useful
const handleClick = useCallback(() => {
  console.log('clicked');
}, []);
```
 
The general guidance from the React team: **don't reach for these hooks by default** — write the simple version first, and only add memoization once profiling (e.g., React DevTools Profiler) shows a real, measurable performance problem caused by unnecessary recalculation or re-renders.
 
## Common Pitfall: Missing or Incorrect Dependencies
 
Just like `useEffect`, both hooks rely on an accurate dependency array. Omitting a dependency can cause the memoized value/function to use **stale data** from an earlier render:
 
```jsx
// Bug: always uses the `count` value from when the component first rendered
const handleClick = useCallback(() => {
  console.log(count);
}, []); // missing `count` in deps
```
 
The `exhaustive-deps` ESLint rule (from `eslint-plugin-react-hooks`) catches this for both `useEffect` and `useMemo`/`useCallback`, and should generally be trusted rather than suppressed.
 
## `useMemo`/`useCallback` vs. `React.memo`
 
These are complementary, not interchangeable:
- **`React.memo`** — wraps a *component*, and skips re-rendering it if its props are reference-equal to the last render.
- **`useMemo`/`useCallback`** — used *inside* a component to keep the values/functions passed as props stable, so `React.memo` on the receiving component can actually detect "nothing changed" and skip re-rendering.
They're typically used together: `React.memo` on the child, `useCallback`/`useMemo` in the parent for whatever gets passed down as props.
 
## In Short
 
`useMemo` caches a computed *value*, and `useCallback` caches a *function reference* — both skip unnecessary recomputation by reusing the cached result unless their dependencies change. They're valuable for expensive calculations or for preserving reference stability so other optimizations (like `React.memo` or effect dependencies) work correctly, but they add overhead of their own and shouldn't be applied by default — only when there's a real performance need.
 
[Back to question list](#question-list)

<a id="q20"></a>

### 20. When should you use useRef?

`useRef` is a React Hook that gives you a mutable container — a "box" — that persists across renders **without triggering a re-render when it changes**. It's the tool for anything that needs to be remembered between renders but isn't part of what the UI displays.
 
## Basic Syntax
 
```jsx
const myRef = useRef(initialValue);
```
 
Returns an object shaped like `{ current: initialValue }`. You read and write via `myRef.current`, and that object reference stays stable across the component's entire lifetime.
 
## `useRef` vs. `useState` — The Key Distinction
 
| | `useState` | `useRef` |
|---|---|---|
| Triggers re-render on change? | Yes | No |
| Value persists across renders? | Yes | Yes |
| Read/write syntax | `state`, `setState(x)` | `ref.current`, `ref.current = x` |
| Use for | Data that affects what's rendered | Data that doesn't affect what's rendered |
 
This is the core rule of thumb: **if changing the value should update the UI, use `useState`. If it shouldn't, use `useRef`.**
 
## Use Case 1: Accessing DOM Elements
 
The most common use case — getting a direct reference to a DOM node, for things React doesn't have a declarative API for:
 
```jsx
function TextInput() {
  const inputRef = useRef(null);
 
  function focusInput() {
    inputRef.current.focus();
  }
 
  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus the input</button>
    </>
  );
}
```
 
This connects directly to uncontrolled components — reading a DOM input's value via `ref.current.value` is another example of this same pattern. Other common DOM use cases: measuring an element's size (`getBoundingClientRect()`), scrolling to an element, managing focus, or integrating with non-React libraries that need a real DOM node (charting libraries, video players).
 
## Use Case 2: Storing a Mutable Value That Doesn't Affect Rendering
 
Anything you need to "remember" between renders, where a change to it shouldn't cause a re-render:
 
```jsx
function Timer() {
  const intervalRef = useRef(null);
  const [seconds, setSeconds] = useState(0);
 
  function start() {
    intervalRef.current = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
  }
 
  function stop() {
    clearInterval(intervalRef.current);
  }
 
  return (
    <div>
      <p>{seconds}s</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}
```
 
Here, `intervalRef` holds the interval ID — necessary to clear it later, but irrelevant to what's rendered. Storing it in `useState` instead would cause an unnecessary re-render every time it's set.
 
## Use Case 3: Tracking Previous Values
 
A common pattern — remembering a value from the *previous* render to compare against the current one:
 
```jsx
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
 
function Counter({ count }) {
  const prevCount = usePrevious(count);
  return <p>Now: {count}, before: {prevCount}</p>;
}
```
 
The ref update happens in `useEffect` — which runs *after* render — so `ref.current` still holds the old value during the current render, and only gets updated to the new value afterward, ready for the *next* render's comparison.
 
## Use Case 4: Avoiding Stale Closures in Callbacks/Effects
 
Refs are useful when you need a callback (e.g., inside `useEffect`) to always see the *latest* value of something, without adding it as a dependency and re-running the effect:
 
```jsx
function ChatRoom({ roomId }) {
  const latestRoomId = useRef(roomId);
 
  useEffect(() => {
    latestRoomId.current = roomId;
  }, [roomId]);
 
  useEffect(() => {
    function handleMessage() {
      console.log('Message received in room:', latestRoomId.current); // always current
    }
    connection.on('message', handleMessage);
    return () => connection.off('message', handleMessage);
  }, []); // intentionally no roomId dependency — connection is set up once
}
```
 
This is a more advanced pattern and should be used carefully — it's often a sign the effect's dependencies need rethinking, but it's a legitimate escape hatch when you deliberately want a callback that doesn't need to be recreated but still needs fresh data.
 
## Use Case 5: Persisting Values Across Renders Without Re-initializing
 
Similar to lazy `useState` initialization, but for values that never need to trigger a render — like caching an expensive object you only want created once:
 
```jsx
function Canvas() {
  const contextRef = useRef(null);
  const canvasRef = useRef(null);
 
  useEffect(() => {
    contextRef.current = canvasRef.current.getContext('2d');
  }, []);
  // contextRef.current persists across renders, but changing it never re-renders
}
```
 
## When *Not* to Use `useRef`
 
**Don't use it as a workaround to avoid re-renders for data that should actually be in state.** If the value is genuinely something the UI needs to reflect, `useRef` will silently fail to update the screen, since mutating `.current` doesn't trigger React to re-render:
 
```jsx
// Bug: the UI will never update, because mutating a ref doesn't cause a re-render
function Counter() {
  const countRef = useRef(0);
  return (
    <button onClick={() => { countRef.current += 1; }}>
      {countRef.current} {/* stays frozen visually */}
    </button>
  );
}
```
 
**Don't read or write `ref.current` during rendering** (outside of event handlers or effects) — this breaks React's rendering model, since refs are explicitly meant to be a mutable escape hatch outside of the render/re-render cycle. Reading it during render can give you inconsistent results, especially with concurrent rendering features.
 
## `useRef` vs. `useState` — A Quick Test
 
Ask: **"If this value changes, does anything on screen need to look different?"**
- Yes → `useState`
- No → `useRef`
## In Short
 
Use `useRef` when you need a mutable value that survives across renders but shouldn't cause a re-render when it changes — most commonly for direct DOM access (focus, measurements, integrating non-React code), but also for storing timers/IDs, tracking previous values, or holding the "latest" version of a value for callbacks without adding it to a dependency array. If updating the value should visibly change the UI, that's `useState`'s job instead.

[Back to question list](#question-list)

<a id="q21"></a>

### 21. Explain useReducer.

`useReducer` is a React Hook used for **managing complex state logic**.
It's an alternative to `useState`, especially when:

-   State has multiple related values.
-   State transitions depend on the previous state.
-   You have many state update functions and want to keep them
    organized.

## Syntax

``` jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

-   **state** → The current state.
-   **dispatch** → A function used to send actions.
-   **reducer** → A function that determines how the state changes.
-   **initialState** → The initial value of the state.

## How It Works

A reducer function takes the current state and an action, then returns a
new state.

``` jsx
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };

    case "decrement":
      return { count: state.count - 1 };

    case "reset":
      return { count: 0 };

    default:
      return state;
  }
}
```

## Example: Counter

``` jsx
import { useReducer } from "react";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };

    case "decrement":
      return { count: state.count - 1 };

    case "reset":
      return initialState;

    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h2>Count: {state.count}</h2>

      <button onClick={() => dispatch({ type: "increment" })}>
        +
      </button>

      <button onClick={() => dispatch({ type: "decrement" })}>
        -
      </button>

      <button onClick={() => dispatch({ type: "reset" })}>
        Reset
      </button>
    </div>
  );
}

export default Counter;
```

## Flow of `useReducer`

``` text
Button Click
      │
      ▼
dispatch({ type: "increment" })
      │
      ▼
Reducer(state, action)
      │
      ▼
Returns New State
      │
      ▼
React Re-renders Component
```

## Passing Data with Actions

You can send extra data, commonly called a **payload**, in the action.

``` jsx
function reducer(state, action) {
  switch (action.type) {
    case "add":
      return {
        count: state.count + action.payload,
      };

    default:
      return state;
  }
}
```

Dispatch:

``` jsx
dispatch({
  type: "add",
  payload: 5,
});
```

Result:

``` text
count = count + 5
```

## `useState` vs `useReducer`

  `useState`               `useReducer`
  ------------------------ --------------------------------------------
  Best for simple state    Best for complex state
  Updates state directly   Updates state through actions
  Easy to learn            Better for managing many state transitions
  Less boilerplate         More structured and predictable

## When to Use `useReducer`

Use `useReducer` when:

-   You have multiple related state values.
-   State updates depend on previous state.
-   You have many possible actions such as add, delete, update, and
    reset.
-   You want Redux-like state management within a component.

Avoid it when:

-   You only need a simple value like a boolean, string, or number.
-   `useState` can express the state logic clearly and simply.

## Real-World Example: Todo List

``` jsx
const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];

    case "DELETE":
      return state.filter(todo => todo.id !== action.payload);

    default:
      return state;
  }
}
```

Usage:

``` jsx
const [todos, dispatch] = useReducer(reducer, []);

dispatch({
  type: "ADD",
  payload: {
    id: 1,
    text: "Learn useReducer",
  },
});

dispatch({
  type: "DELETE",
  payload: 1,
});
```

Here, the reducer centralizes all todo-related state changes, making the
code easier to maintain as the application grows.

## Key Interview Points

1.  `useReducer` is a React Hook for managing state with a reducer
    function.
2.  The reducer receives `(state, action)` and returns the next state.
3.  `dispatch()` sends an action to the reducer.
4.  Actions usually contain a `type` and optionally a `payload`.
5.  Reducers should be **pure functions**.
6.  Don't mutate the existing state directly; return a new state.
7.  `useReducer` is particularly useful when state transitions are
    complex or numerous.
8.  `useReducer` can be combined with `useContext` to build a
    lightweight global state-management solution.
