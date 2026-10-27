# Mandatory exercise 3 - Task 1

## a) Terms (short answers)

**Functions, parameters, arguments**
A function is a block of code with a name that we can run many times. Parameters are the variable names in the function definition. Arguments are the actual values we give the function when we call it.

**Factory function, constructor function, class**
- A factory function is a normal function that returns a new object.
- A constructor function is a function used with `new` that builds an object and sets properties with `this`.
- A class is the modern syntax for the same idea, with a `constructor` and methods inside the class.

**An object's properties and methods**
Properties are values stored in the object (e.g. `car.color`). Methods are functions stored in the object (e.g. `car.drive()`).

**Module, export, import**
A module is a JavaScript file with its own scope. `export` makes things in the file available to others. `import` lets another file use what was exported.

**JSON, JSON.parse(), JSON.stringify()**
JSON is a text format for data, based on JavaScript objects. `JSON.parse()` turns a JSON string into a JavaScript object. `JSON.stringify()` turns a JavaScript object into a JSON string.

**Local storage and Session storage**
Both store key/value text in the browser. Local storage stays after the browser is closed. Session storage is deleted when the tab is closed.

**Try-catch**
`try` runs code that might fail. If an error happens, the code in `catch` runs instead, so the program does not crash.

**Multi-page app and Single-page app**
A multi-page app loads a new HTML page from the server for every view. A single-page app loads one HTML page and JavaScript changes what is shown.

**Callback function**
A function that we give to another function, so that it can be called later (e.g. when something has finished or happened).

**Event-handler (event-listener), addEventListener, event-object, dispatch event**
- An event-handler is a function that runs when an event happens (click, keypress, etc.).
- `addEventListener` connects an event type to a handler.
- The event-object is given to the handler and has info about the event.
- `dispatchEvent` triggers an event from code (e.g. our own custom event).

**Custom Elements and Shadow DOM**
Custom elements let us create our own HTML tags with our own behaviour (web components). Shadow DOM gives such an element its own hidden DOM tree, so the HTML and CSS inside it are separated from the rest of the page.

**Promise, resolve, reject, pending**
A promise is an object for a value that will come later. Pending means it is not finished yet. Resolve means it finished successfully. Reject means it failed.

**The then function vs. async and await**
`.then()` runs a function when the promise resolves. `async`/`await` does the same thing but with code that reads from top to bottom. `await` waits for a promise inside an `async` function.

**GET, POST, PUT, DELETE**
HTTP methods. GET fetches data. POST sends new data (create). PUT updates existing data. DELETE removes data.

**Basic authentication and tokens**
Basic authentication sends username and password (Base64 coded) in the request header. A token is a string we get after logging in, and we send it with later requests to prove who we are.

**HTTP vs HTTPS**
HTTPS is HTTP with encryption (TLS). The data cannot be read or changed on the way, while HTTP sends everything as plain text.

## b) True or false

| Statement | Answer |
|---|---|
| A callback function must be passed as an argument to another function. | **True** (that is what makes it a callback) |
| A `<select>` element can be used to create a menu on the webpage. | **True** (a drop-down menu) |
| A user can input multiple lines in a `<textarea>` element. | **True** |
| A class in CSS is the same as a class in JavaScript. | **False** (CSS class is a label for styling, JS class is a blueprint for objects) |
| If an async function returns something, it will always be a promise. | **True** |
| A `<template>` element can be made visible by using the `open` attribute. | **False** (template content is never shown; we must clone it into the page) |
| A document-fragment is the same as an HTML element. | **False** (it is a light container that is not part of the page) |
| An element's innerText is vulnerable to XSS attacks. | **False** (innerText treats the value as text; innerHTML is the dangerous one) |
| An entry in localStorage or sessionStorage can only be accessed by the domain that created the entry. | **True** (same-origin rule) |
| It is safe to send passwords and tokens via HTTP when we code them to Base64. | **False** (Base64 is just encoding, anyone can decode it) |
| An HTTP or HTTPS request normally consists of 3 parts: a request line, headers and a body. | **True** |

## c) Regular expression

Format `XX-xxx-xxx.xxxx` (2 capital letters, 3 digits, 3 digits, 4 digits):

```js
const serialPattern = /^[A-Z]{2}-\d{3}-\d{3}\.\d{4}$/;
```

- `^` and `$` mean the whole text must match
- `[A-Z]{2}` two capital letters
- `\d{3}` three digits
- `\.` a real dot (a plain `.` would match any character)

Test:

```js
console.log(serialPattern.test("AB-123-123.1234")); // true
console.log(serialPattern.test("ab-123-123.1234")); // false
console.log(serialPattern.test("AB-123-123-1234")); // false
```
