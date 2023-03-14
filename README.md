<div align="center">

![🚧 Under construction 👷‍♂️](https://i.imgur.com/LEP2R3N.png)

</div>

# Node.js user prompts polyfill

🗨️ `prompt()` and friends for Node.js

<div align="center">

![](https://placekitten.com/600/400)

</div>

## Installation

## Usage

⚠️ This polyfill **only works with Node.js**. If you're using Deno, you can use
[Deno's `prompt()` function]. If you're in a browser, `prompt()` and friends are
already available.

`alert()`, `prompt()`, and `confirm()` will **synchronously** block the main
thread. This behaviour is similar to the corresponding implementation of these
functions in the browser.

📚 You can find more about each function and its quirks on the [docs website].

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

🔰 Check out more examples on the [docs website].

🚀 Try out a [demo] right in your browser!

### What happens if `process.stdin` isn't a TTY?

- **`alert()`:** Absolutely nothing. We return immediately.
- **`confirm()`:** We immediately return `false`.
- **`prompt()`:** We return `null` as though the user pressed <kbd>Cancel</kbd>.

## Development

TODO: Add dev docs

[deno's `prompt()` function]: https://deno.land/api?s=prompt
[demo]: https://platfill.github.io/html-simple-dialogs/demo/
