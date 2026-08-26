# WebSockets in JavaScript

WebSockets provide a long-lived, two-way connection between a client and a server. They are useful when the server needs to send updates immediately instead of waiting for the browser to request them.

## Question List

1. [What is a WebSocket?](#q1)
2. [How is a WebSocket different from HTTP?](#q2)
3. [How do you create a WebSocket connection in JavaScript?](#q3)
4. [What happens during the WebSocket connection lifecycle?](#q4)
5. [What are the `open`, `message`, `error`, and `close` events?](#q5)
6. [How do you send data through a WebSocket?](#q6)
7. [What does `readyState` mean?](#q7)
8. [How do you close a WebSocket connection?](#q8)
9. [What are WebSocket close codes?](#q9)
10. [What is the difference between `ws://` and `wss://`?](#q10)
11. [Can a browser WebSocket send custom HTTP headers?](#q11)
12. [What is the difference between WebSocket and Socket.IO?](#q12)
13. [How do you send JSON messages?](#q13)
14. [How do you handle text and binary messages?](#q14)
15. [What is `bufferedAmount`?](#q15)
16. [What is backpressure and how can you handle it?](#q16)
17. [How do you reconnect after a disconnect?](#q17)
18. [Why are heartbeat messages needed?](#q18)
19. [What are ping and pong frames?](#q19)
20. [How do you authenticate a WebSocket connection?](#q20)
21. [How do origin, cookies, and CSRF affect WebSockets?](#q21)
22. [Do WebSockets use CORS?](#q22)
23. [How do you secure a WebSocket application?](#q23)
24. [How do you broadcast a message to many clients in Node.js?](#q24)
25. [How do WebSocket rooms work?](#q25)
26. [How do you scale WebSockets across multiple servers?](#q26)
27. [What is the difference between WebSockets and Server-Sent Events?](#q27)
28. [What is the difference between WebSockets and polling?](#q28)
29. [How do you clean up a WebSocket in a frontend application?](#q29)
30. [How do you test and debug WebSockets?](#q30)
31. [What are good production practices for WebSockets?](#q31)

---

## Answers

<a id="q1"></a>
### 1. What is a WebSocket?

**Simple explanation:** A WebSocket is a network connection that stays open and allows both the browser and server to send messages at any time. Unlike a normal request, the server does not need to wait for a new request before sending an update.

**Example:**
```js
const socket = new WebSocket("wss://example.com/chat");

socket.addEventListener("message", (event) => {
    console.log("Server says:", event.data);
});
```

**Purpose:** Use WebSockets for chat, live notifications, multiplayer games, collaboration tools, and live dashboards.

[Back to question list](#question-list)

<a id="q2"></a>
### 2. How is a WebSocket different from HTTP?

**Simple explanation:** HTTP usually follows a request-response pattern: the client asks and the server answers. WebSockets start with an HTTP handshake, then keep one connection open for two-way communication.

**Example:**
```js
// HTTP: the client asks for data each time.
const response = await fetch("/api/status");

// WebSocket: the server can push new status messages.
const socket = new WebSocket("wss://example.com/status");
socket.onmessage = (event) => console.log(event.data);
```

**Purpose:** WebSockets reduce repeated requests and provide lower-latency updates when data changes often.

[Back to question list](#question-list)

<a id="q3"></a>
### 3. How do you create a WebSocket connection in JavaScript?

**Simple explanation:** In a browser, pass the server URL to the `WebSocket` constructor. Register event handlers to react to connection changes and messages.

**Example:**
```js
const socket = new WebSocket("wss://example.com/updates");

socket.addEventListener("open", () => {
    console.log("Connected");
});
```

**Purpose:** This is the starting point for every browser WebSocket client.

[Back to question list](#question-list)

<a id="q4"></a>
### 4. What happens during the WebSocket connection lifecycle?

**Simple explanation:** The connection starts in a connecting state. The client and server perform a handshake. If it succeeds, the connection becomes open. It can later close normally or because of an error.

**Example:**
```js
const socket = new WebSocket("wss://example.com");

console.log(socket.readyState); // WebSocket.CONNECTING
socket.onopen = () => console.log("Ready for messages");
socket.onclose = () => console.log("Connection ended");
```

**Purpose:** Understanding the lifecycle prevents sending messages too early and helps build reconnection and cleanup logic.

[Back to question list](#question-list)

<a id="q5"></a>
### 5. What are the `open`, `message`, `error`, and `close` events?

**Simple explanation:** `open` means the connection is ready, `message` contains data from the server, `error` reports a communication problem, and `close` means the connection has ended.

**Example:**
```js
socket.onopen = () => console.log("Opened");
socket.onmessage = (event) => console.log("Received", event.data);
socket.onerror = (error) => console.error("Socket error", error);
socket.onclose = (event) => console.log("Closed", event.code);
```

**Purpose:** These events let the UI show connection status and let the application respond safely to failures.

[Back to question list](#question-list)

<a id="q6"></a>
### 6. How do you send data through a WebSocket?

**Simple explanation:** Call `send()` only after the connection is open. WebSockets can send strings, JSON strings, and binary data.

**Example:**
```js
const socket = new WebSocket("wss://example.com/chat");

socket.onopen = () => {
    socket.send("Hello server");
};
```

**Purpose:** `send()` transmits user actions, chat messages, commands, or application updates to the server.

[Back to question list](#question-list)

<a id="q7"></a>
### 7. What does `readyState` mean?

**Simple explanation:** `readyState` tells you the current connection status. Its values are `CONNECTING` (0), `OPEN` (1), `CLOSING` (2), and `CLOSED` (3).

**Example:**
```js
if (socket.readyState === WebSocket.OPEN) {
    socket.send("Safe to send");
}
```

**Purpose:** Check this property before sending data so your code does not call `send()` on a connection that is not ready.

[Back to question list](#question-list)

<a id="q8"></a>
### 8. How do you close a WebSocket connection?

**Simple explanation:** Call `close()` when the connection is no longer needed. You may provide a valid close code and a short reason.

**Example:**
```js
socket.close(1000, "User left the page");
```

**Purpose:** Closing unused connections releases server resources and avoids unnecessary network activity.

[Back to question list](#question-list)

<a id="q9"></a>
### 9. What are WebSocket close codes?

**Simple explanation:** A close code explains why a connection ended. `1000` means normal closure, `1001` means the endpoint is leaving, and `1006` usually indicates an abnormal disconnect detected by the browser.

**Example:**
```js
socket.onclose = (event) => {
    if (event.code === 1000) console.log("Normal close");
    else console.log("Unexpected close", event.code);
};
```

**Purpose:** Close codes help decide whether to reconnect, show an error, or simply finish normally.

[Back to question list](#question-list)

<a id="q10"></a>
### 10. What is the difference between `ws://` and `wss://`?

**Simple explanation:** `ws://` is an unencrypted WebSocket connection. `wss://` uses TLS encryption, similar to the difference between `http://` and `https://`.

**Example:**
```js
const socket = new WebSocket("wss://example.com/secure-chat");
```

**Purpose:** Use `wss://` in production to protect messages from being read or changed in transit. A secure webpage should generally use a secure WebSocket URL.

[Back to question list](#question-list)

<a id="q11"></a>
### 11. Can a browser WebSocket send custom HTTP headers?

**Simple explanation:** The browser WebSocket API does not let client JavaScript add arbitrary headers such as `Authorization`. The browser controls the handshake headers.

**Example:**
```js
// This is not supported by the browser WebSocket constructor:
// new WebSocket(url, { headers: { Authorization: token } });

const socket = new WebSocket("wss://example.com");
socket.onopen = () => socket.send(JSON.stringify({ type: "auth", token }));
```

**Purpose:** Knowing this limitation helps you choose a practical authentication method instead of relying on unsupported options.

[Back to question list](#question-list)

<a id="q12"></a>
### 12. What is the difference between WebSocket and Socket.IO?

**Simple explanation:** WebSocket is a standard browser protocol and API. Socket.IO is a library built on top of transport mechanisms that adds features such as rooms, event names, acknowledgements, and fallback transports.

**Example:**
```js
// Native WebSocket
socket.send(JSON.stringify({ type: "chat", text: "Hi" }));

// Socket.IO style (when the Socket.IO client is installed)
// socket.emit("chat", "Hi");
```

**Purpose:** Use native WebSockets for a small standard protocol. Use Socket.IO when its extra features and ecosystem are useful. They are not automatically interchangeable.

[Back to question list](#question-list)

<a id="q13"></a>
### 13. How do you send JSON messages?

**Simple explanation:** WebSockets send text or binary data. Convert a JavaScript object to a JSON string with `JSON.stringify()` and parse received JSON with `JSON.parse()`.

**Example:**
```js
socket.onopen = () => {
    socket.send(JSON.stringify({ type: "join", roomId: 42 }));
};

socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    console.log(message.type, message.roomId);
};
```

**Purpose:** A clear JSON message format makes communication between different languages and services easier.

[Back to question list](#question-list)

<a id="q14"></a>
### 14. How do you handle text and binary messages?

**Simple explanation:** Received text is usually a string. Set `binaryType` to choose whether binary messages arrive as a `Blob` or an `ArrayBuffer`.

**Example:**
```js
socket.binaryType = "arraybuffer";

socket.onmessage = (event) => {
    if (typeof event.data === "string") {
        console.log("Text:", event.data);
    } else {
        console.log("Binary bytes:", event.data.byteLength);
    }
};
```

**Purpose:** Binary messages are useful for audio, files, images, and compact game data.

[Back to question list](#question-list)

<a id="q15"></a>
### 15. What is `bufferedAmount`?

**Simple explanation:** `bufferedAmount` is the number of bytes waiting in the browser's outgoing buffer because they have not yet been sent over the network.

**Example:**
```js
socket.send(largeMessage);
console.log(`${socket.bufferedAmount} bytes are waiting`);
```

**Purpose:** Monitor this value when sending frequently or sending large messages. A growing value can indicate that the network is slower than the producer.

[Back to question list](#question-list)

<a id="q16"></a>
### 16. What is backpressure and how can you handle it?

**Simple explanation:** Backpressure happens when your code produces messages faster than the network or server can consume them. The queue grows and memory usage can increase.

**Example:**
```js
function sendWhenRoomExists(message) {
    const maxBufferedBytes = 1024 * 1024;

    if (socket.readyState !== WebSocket.OPEN) return false;
    if (socket.bufferedAmount > maxBufferedBytes) return false;

    socket.send(message);
    return true;
}
```

**Purpose:** Limit message size, slow down producers, drop stale updates, or pause sending when the buffer becomes large.

[Back to question list](#question-list)

<a id="q17"></a>
### 17. How do you reconnect after a disconnect?

**Simple explanation:** Create a new WebSocket after a delay when the old one closes. Use increasing delays, called exponential backoff, so many clients do not reconnect at once.

**Example:**
```js
let retry = 0;

function connect() {
    const socket = new WebSocket("wss://example.com");

    socket.onopen = () => { retry = 0; };
    socket.onclose = () => {
        const delay = Math.min(1000 * 2 ** retry, 30000);
        retry += 1;
        setTimeout(connect, delay);
    };
}

connect();
```

**Purpose:** Reconnection handles temporary Wi-Fi loss, sleep/wake cycles, and server restarts without overwhelming the server.

[Back to question list](#question-list)

<a id="q18"></a>
### 18. Why are heartbeat messages needed?

**Simple explanation:** A connection can appear open even when the network path has silently failed. A heartbeat periodically checks that the other side is still responding.

**Example:**
```js
const heartbeat = setInterval(() => {
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: "heartbeat" }));
    }
}, 30000);

socket.onclose = () => clearInterval(heartbeat);
```

**Purpose:** Detect dead connections and remove stale clients so presence indicators and resources remain accurate.

[Back to question list](#question-list)

<a id="q19"></a>
### 19. What are ping and pong frames?

**Simple explanation:** Ping and pong are protocol-level control frames used to check that a connection is alive. Browser JavaScript cannot directly send a WebSocket ping frame, but a server can usually send pings and automatically receive pongs.

**Example:**
```js
// Browser application-level heartbeat, not a protocol ping frame.
socket.send(JSON.stringify({ type: "ping" }));
```

**Purpose:** Protocol pings are efficient liveness checks. Application-level messages are useful when the application itself needs an acknowledgement.

[Back to question list](#question-list)

<a id="q20"></a>
### 20. How do you authenticate a WebSocket connection?

**Simple explanation:** Common choices are a secure cookie sent during the handshake, a short-lived token in the URL, or an authentication message sent immediately after opening. Validate credentials on the server.

**Example:**
```js
const socket = new WebSocket(
    `wss://example.com?ticket=${encodeURIComponent(shortLivedTicket)}`
);

socket.onopen = () => {
    socket.send(JSON.stringify({ type: "authenticate", ticket: shortLivedTicket }));
};
```

**Purpose:** Authentication ensures that only permitted users can connect and access private messages.

[Back to question list](#question-list)

<a id="q21"></a>
### 21. How do origin, cookies, and CSRF affect WebSockets?

**Simple explanation:** Browsers send an `Origin` header during the handshake. Cookies may also be sent automatically, so a malicious website could try to use a user's existing login session. The server must validate the origin and authentication.

**Example:**
```js
// Server-side pseudocode
if (!allowedOrigins.includes(request.headers.origin)) {
    rejectHandshake();
}
```

**Purpose:** Origin checks and CSRF-aware authentication prevent another website from opening an unwanted authenticated socket.

[Back to question list](#question-list)

<a id="q22"></a>
### 22. Do WebSockets use CORS?

**Simple explanation:** The browser WebSocket handshake does not use the normal CORS preflight process. However, the server still receives the `Origin` header and must decide which origins it trusts.

**Example:**
```js
// Server should check Origin rather than assuming any browser is trusted.
const origin = request.headers.origin;
if (origin !== "https://app.example.com") rejectHandshake();
```

**Purpose:** This avoids the common mistake of configuring HTTP CORS and assuming WebSocket access is protected automatically.

[Back to question list](#question-list)

<a id="q23"></a>
### 23. How do you secure a WebSocket application?

**Simple explanation:** Use `wss://`, validate the origin, authenticate users, authorize every action, validate message size and shape, and rate-limit abusive clients. Never trust data received from a socket.

**Example:**
```js
function isValidChatMessage(message) {
    return message.type === "chat" &&
        typeof message.text === "string" &&
        message.text.length <= 1000;
}
```

**Purpose:** A WebSocket is a direct, long-lived input channel. Validation and authorization protect it from injection, abuse, and unauthorized actions.

[Back to question list](#question-list)

<a id="q24"></a>
### 24. How do you broadcast a message to many clients in Node.js?

**Simple explanation:** Keep connected clients in a collection and send the message to each client whose state is open. The exact API depends on the Node.js WebSocket library.

**Example:**
```js
const clients = new Set();

function broadcast(message) {
    for (const client of clients) {
        if (client.readyState === client.OPEN) {
            client.send(message);
        }
    }
}
```

**Purpose:** Broadcasting supports chat rooms, live dashboards, announcements, and presence updates.

[Back to question list](#question-list)

<a id="q25"></a>
### 25. How do WebSocket rooms work?

**Simple explanation:** A room is an application-level group of connections. Store each client in one or more groups, then broadcast only to the selected group.

**Example:**
```js
const rooms = new Map();

function addToRoom(roomId, client) {
    if (!rooms.has(roomId)) rooms.set(roomId, new Set());
    rooms.get(roomId).add(client);
}

function sendToRoom(roomId, message) {
    for (const client of rooms.get(roomId) ?? []) client.send(message);
}
```

**Purpose:** Rooms prevent unrelated users from receiving each other's private chat or collaboration updates.

[Back to question list](#question-list)

<a id="q26"></a>
### 26. How do you scale WebSockets across multiple servers?

**Simple explanation:** A client is connected to one server, but other servers may need to send it messages. Use a shared message broker such as Redis Pub/Sub, or use a managed WebSocket service, so servers can exchange events.

**Example:**
```js
// Conceptual flow:
// Server A receives an event -> publishes to Redis.
// Server B receives the event -> sends it to its connected clients.
```

**Purpose:** Shared communication keeps broadcasts and rooms working when clients are distributed across several server instances.

[Back to question list](#question-list)

<a id="q27"></a>
### 27. What is the difference between WebSockets and Server-Sent Events?

**Simple explanation:** WebSockets provide two-way communication. Server-Sent Events (SSE) provide a one-way stream from server to browser over HTTP. SSE uses `EventSource` and automatically supports reconnection.

**Example:**
```js
const events = new EventSource("/events");
events.onmessage = (event) => console.log(event.data);
```

**Purpose:** Choose SSE for live server updates where the browser rarely needs to send messages. Choose WebSockets for interactive two-way features.

[Back to question list](#question-list)

<a id="q28"></a>
### 28. What is the difference between WebSockets and polling?

**Simple explanation:** Polling repeatedly sends HTTP requests to ask whether data changed. WebSockets keep one connection open and let the server push changes immediately.

**Example:**
```js
// Polling repeatedly asks the server.
const timer = setInterval(() => fetch("/api/status"), 5000);

// WebSocket waits for the server to push updates.
const socket = new WebSocket("wss://example.com/status");
```

**Purpose:** Polling is simple and works almost everywhere. WebSockets are usually more efficient for frequent, low-latency updates.

[Back to question list](#question-list)

<a id="q29"></a>
### 29. How do you clean up a WebSocket in a frontend application?

**Simple explanation:** Remove event listeners, clear heartbeat and reconnect timers, and close the socket when a component or page no longer needs it.

**Example:**
```js
const socket = new WebSocket("wss://example.com");
const heartbeat = setInterval(() => socket.send("ping"), 30000);

function cleanup() {
    clearInterval(heartbeat);
    socket.close(1000, "Component removed");
}
```

**Purpose:** Cleanup prevents memory leaks, duplicate connections, duplicate messages, and unnecessary server work.

[Back to question list](#question-list)

<a id="q30"></a>
### 30. How do you test and debug WebSockets?

**Simple explanation:** Test connection success, message parsing, invalid messages, disconnections, reconnection, authorization, and cleanup. Browser DevTools can show the connection and frames sent or received.

**Example:**
```js
socket.onmessage = (event) => {
    console.log("WebSocket frame:", event.data);
};

socket.onerror = (event) => {
    console.error("WebSocket error:", event);
};
```

**Purpose:** WebSocket bugs often involve timing and network state, so testing both happy paths and disconnect paths is important.

[Back to question list](#question-list)

<a id="q31"></a>
### 31. What are good production practices for WebSockets?

**Simple explanation:** Use secure connections, authenticate and authorize users, validate messages, limit payload sizes, add heartbeat and reconnect behavior, clean up disconnected clients, and collect useful metrics.

**Example:**
```js
const messageLimit = 64 * 1024;

if (event.data.length > messageLimit) {
    socket.close(1009, "Message is too large");
}
```

**Purpose:** These practices improve reliability, security, performance, and observability when many users keep connections open for a long time.

[Back to question list](#question-list)
