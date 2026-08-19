# nextjs

Next.js

### Question List

1. [What is Next.js and why is it used?](#q1)
2. [What is the difference between SSR, SSG, and ISR in Next.js?](#q2)
3. [What is the App Router and how is it different from the Pages Router?](#q3)
4. [What are Server Components and Client Components in Next.js?](#q4)
5. [How does file-based routing work in Next.js?](#q5)
6. [What is `getStaticProps`, `getServerSideProps`, and `generateStaticParams`?](#q6)
7. [What are dynamic routes and catch-all routes?](#q7)
8. [What is middleware in Next.js and when do we use it?](#q8)
9. [How does Next.js help with SEO and metadata?](#q9)
10. [What are API routes / Route Handlers in Next.js?](#q10)

---

## Answers

<a id="q1"></a>

### 1. What is Next.js and why is it used?

Next.js is a React framework built for production-level web applications. It adds features like routing, server-side rendering, static generation, API endpoints, image optimization, and improved SEO support on top of React.

It is used because plain React applications are mainly client-side. That means:

- the page loads in the browser after JavaScript runs,
- SEO can be weaker if content is rendered only on the client,
- there is no built-in routing or server-side rendering,
- performance optimization is more manual.

Next.js solves these problems by providing a complete framework structure.

Common reasons to use Next.js:

- Fast page loads and better performance
- Built-in routing
- Server rendering and static generation
- Better SEO than client-only React apps
- API routes for backend logic
- Simplified deployment on platforms like Vercel

Example:

```jsx
// app/page.js
export default function Home() {
  return <h1>Welcome to Next.js</h1>;
}
```

This is a simple page component that Next.js automatically renders.

[Back to question list](#question-list)

<a id="q2"></a>

### 2. What is the difference between SSR, SSG, and ISR in Next.js?

These are different ways of rendering pages.

#### 1. SSR (Server-Side Rendering)

The page is rendered on the server for every request.

- Useful when content changes frequently
- Data is fetched at request time
- The browser receives the fully rendered HTML

Example:

```js
export async function GET() {
  const res = await fetch('https://api.example.com/products');
  const products = await res.json();

  return Response.json(products);
}
```

For pages, this is usually used for dynamic data that must be fresh for every user.

#### 2. SSG (Static Site Generation)

The page is generated once at build time and reused for all users.

- Great for blogs, landing pages, documentation
- Fast because pages are prebuilt
- Content is static until the next deployment

Example:

```js
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();

  return {
    props: { posts },
  };
}
```

#### 3. ISR (Incremental Static Regeneration)

This is a mix of static and dynamic behavior. A static page is generated but can be updated in the background after a time interval.

- Good when content changes occasionally
- Keeps static performance while allowing freshness
- Popular for e-commerce pages, news, blogs

Example:

```js
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();

  return {
    props: { posts },
    revalidate: 60,
  };
}
```

Here, revalidate: 60 means the page will regenerate after 60 seconds if a request comes in.

#### Summary

- SSR = render on every request
- SSG = build once and serve many times
- ISR = static page with periodic refresh

[Back to question list](#question-list)

<a id="q3"></a>

### 3. What is the App Router and how is it different from the Pages Router?

Next.js introduced the App Router with the app/ directory. It uses a more modern routing system and supports nested layouts, loading states, error boundaries, and React Server Components.

The older Pages Router uses the pages/ directory.

#### App Router

- Uses app/ directory
- Supports nested layouts
- Better for server-first rendering
- Works with Server and Client Components
- Has route groups, loading.tsx, error.tsx, and more

Example:

```jsx
// app/page.js
export default function Page() {
  return <h1>Home Page</h1>;
}
```

#### Pages Router

- Uses pages/ directory
- Simpler and older style
- Uses getStaticProps and getServerSideProps
- Great for older Next.js projects

Example:

```jsx
// pages/index.js
export default function Home() {
  return <h1>Home Page</h1>;
}
```

#### Key difference

The App Router is the recommended modern architecture, while the Pages Router is still supported for backward compatibility.

[Back to question list](#question-list)

<a id="q4"></a>

### 4. What are Server Components and Client Components in Next.js?

Next.js supports both Server Components and Client Components.

#### Server Components

Server Components are rendered on the server and are not sent to the browser as interactive JavaScript.

Use them for:

- fetching data from a database or API
- accessing server-only resources
- large data processing
- keeping the client bundle smaller

Example:

```jsx
// app/products/page.js
async function ProductsPage() {
  const res = await fetch('https://api.example.com/products');
  const products = await res.json();

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}

export default ProductsPage;
```

#### Client Components

Client Components are interactive and run in the browser. They are marked with `'use client'` at the top of the file.

Use them for:

- event handlers like onClick
- state management with useState
- forms and client-side logic

Example:

```jsx
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

#### Rule of thumb

- Server Components for data and rendering
- Client Components for interactivity

[Back to question list](#question-list)

<a id="q5"></a>

### 5. How does file-based routing work in Next.js?

Next.js uses the file and folder structure to create routes automatically.

For example:

```text
app/
  page.js
  about/
    page.js
  products/
    [id]
      page.js
```

This creates these routes:

- / → app/page.js
- /about → app/about/page.js
- /products/1 → app/products/[id]/page.js

This makes routing very simple because developers do not need to configure a separate router like in React Router.

Next.js also supports:

- nested routes,
- dynamic segments like [id],
- route groups to organize folders without affecting URL paths,
- layouts for shared UI across pages.

The main idea is: the folder structure decides the URL.

[Back to question list](#question-list)

<a id="q6"></a>

### 6. What is `getStaticProps`, `getServerSideProps`, and `generateStaticParams`?

These are data-fetching methods used in Next.js page components, especially in the Pages Router and some App Router patterns.

#### `getStaticProps`

Used for static generation. It fetches data at build time and pre-renders the page.

```js
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/users');
  const users = await res.json();

  return {
    props: {
      users,
    },
  };
}
```

Use it when data is not changing often.

#### `getServerSideProps`

Used for server-side rendering on every request.

```js
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/users');
  const users = await res.json();

  return {
    props: {
      users,
    },
  };
}
```

Use it when content must always be fresh.

#### `generateStaticParams`

Used in the App Router for dynamic routes that should be statically generated at build time.

```js
export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}
```

This helps generate multiple pages for dynamic paths like /products/1, /products/2, etc., without rendering them on the fly.

[Back to question list](#question-list)

<a id="q7"></a>

### 7. What are dynamic routes and catch-all routes?

Dynamic routes allow a single page to handle many URLs with variable values.

Example:

```text
app/blog/[slug]/page.js
```

This route can match:

- /blog/hello-world
- /blog/react-hooks
- /blog/nextjs-guide

The value of slug is available through params.

```js
export default function BlogPage({ params }) {
  return <h1>Blog: {params.slug}</h1>;
}
```

#### Catch-all routes

Catch-all routes can match multiple path segments.

Example:

```text
app/docs/[...slug]/page.js
```

This can match:

- /docs
- /docs/getting-started
- /docs/react/components

Catch-all routes are useful for docs, nested content, or complex URL structures.

[Back to question list](#question-list)

<a id="q8"></a>

### 8. What is middleware in Next.js and when do we use it?

Middleware in Next.js runs before a request is completed. It can inspect the request, rewrite the URL, redirect, add headers, or handle authentication.

It is useful for:

- authentication checks,
- redirecting logged-out users,
- A/B testing,
- localization,
- adding security headers,
- request logging.

Example:

```js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
```

Middleware runs before the page loads, so it is a good place to enforce access rules or redirect users based on conditions.

[Back to question list](#question-list)

<a id="q9"></a>

### 9. How does Next.js help with SEO and metadata?

SEO means Search Engine Optimization, which helps search engines understand and rank pages.

Next.js improves SEO by:

- server rendering pages on the server,
- making HTML content available to crawlers,
- supporting metadata like title, description, and Open Graph tags,
- supporting static generation for fast pages,
- optimizing page performance and loading speed.

Example metadata in App Router:

```js
export const metadata = {
  title: 'My Blog',
  description: 'A blog about modern web development',
};
```

You can also define page-specific metadata in a route file.

This helps search engines and social platforms understand what the page is about.

Without proper SEO setup, a React app might render a blank or minimal HTML shell before JavaScript loads, making indexing harder.

[Back to question list](#question-list)

<a id="q10"></a>

### 10. What are API routes / Route Handlers in Next.js?

Next.js allows you to create backend-like endpoints directly inside the app.

In the Pages Router, these are called API routes:

```js
// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from Next.js API' });
}
```

This endpoint is available at /api/hello.

In the App Router, the equivalent is Route Handlers:

```js
// app/api/hello/route.js
export async function GET() {
  return Response.json({ message: 'Hello from Next.js Route Handler' });
}
```

These are useful for:

- form submissions,
- interacting with a database,
- sending emails,
- creating custom APIs for frontend data,
- handling authentication logic.

They help keep the app full-stack without needing a separate backend server for small features.

[Back to question list](#question-list)

---

These are some of the most common beginner-level Next.js interview questions. They focus on the framework’s core concepts: routing, rendering, SEO, data fetching, and server/client split.
