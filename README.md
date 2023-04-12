![🚧 Under construction 👷‍♂️](https://i.imgur.com/LEP2R3N.png)

# Node.js simple dialogs polyfill

🗨️ `prompt()` and friends for Node.js

<div align="center">

![](https://placekitten.com/600/400)

</div>

## Installation

## Usage

⚠️ This polyfill **only works with Node.js**. If you're using Denoor a browser,
these functions are already provided for you.

`alert()`, `prompt()`, and `confirm()` will **synchronously** block the main
thread. This behaviour is similar to the corresponding implementation of these
functions in the browser.

### Example

```js
import "@platfill/html-simple-dialogs";

const name = prompt("What is your name?");
alert("Hello, world!");
if (confirm("Exit the app?")) {
  process.exit(0);
} else {
  console.log("🤷‍♂️ Exiting anyway...");
  setTimeout(() => process.exit(0), 1000);
}
```

### What happens if `process.stdin` isn't a TTY?

- **`alert()`:** Absolutely nothing. We return immediately.
- **`confirm()`:** We immediately return `false`.
- **`prompt()`:** We return `null` as though the user canceled.

## Development

TODO: Add dev docs
