![🚧 Under construction 👷‍♂️](https://i.imgur.com/LEP2R3N.png)

# Node.js simple dialogs polyfill

🗨️ `prompt()` and friends for Node.js

<div align="center">

![](https://i.imgur.com/Fgfv0R3.png)

</div>

## Installation

![npm](https://img.shields.io/static/v1?style=for-the-badge&message=npm&color=CB3837&logo=npm&logoColor=FFFFFF&label=)

You can install this package from npm, or any npm-compatible package manager
like [Yarn] or [pnpm].

```sh
npm install @jcbhmr/html-simple-dialogs
```

🛑 This polyfill **only works with Node.js**. If you're using Deno or a browser,
these functions are already provided for you.

## Usage

![Node.js](https://img.shields.io/static/v1?style=for-the-badge&message=Node.js&color=339933&logo=Node.js&logoColor=FFFFFF&label=)
![Terminal](https://img.shields.io/static/v1?style=for-the-badge&message=Terminal&color=4D4D4D&logo=Windows+Terminal&logoColor=FFFFFF&label=)

`alert()`, `prompt()`, and `confirm()` will **synchronously** block the main
thread. This behaviour is similar to the corresponding implementation of these
functions in the browser.

If the current environment isn't suited to a UI prompt (e.g. you're in CI or
STDIN isn't a TTY), these functions will behave flawlessly and equivalent to
their browser counterparts as though popups were disabled.

These functions are especially useful when you're writing a very basic CLI app
and you don't need a bunch of fancy parsing schemas to handle one or two input
fields for strings.

However, if you are looking for a CLI framework for a more advanced CLI app, you
should check out one of the [popular CLI tools for Node.js].

### Example

This example will prompt you for your name, and then ask if you're a developer.
If you are, it will pause and alert you, otherwise, it will log to the console
and exit immediately.

```js
import "@jcbhmr/html-simple-dialogs";

const name = prompt("What's your name?");
if (confirm("Are you a developer?")) {
  alert(`Hello, ${name}. You're a developer.`);
} else {
  console.log(`Hello, ${name}. You're not a developer.`);
}
```

<!-- TODO: Add link to StackBlitz demo -->

[⚡ Try it now!](#)

## Development

![TypeScript](https://img.shields.io/static/v1?style=for-the-badge&message=TypeScript&color=3178C6&logo=TypeScript&logoColor=FFFFFF&label=)
![Vite](https://img.shields.io/static/v1?style=for-the-badge&message=Vite&color=646CFF&logo=Vite&logoColor=FFFFFF&label=)
![Vitest](https://img.shields.io/static/v1?style=for-the-badge&message=Vitest&color=6E9F18&logo=Vitest&logoColor=FFFFFF&label=)

This package is written in TypeScript and uses [Vite] for development. To get
started, you can use GitHub Codespaces to open this repository in a
browser-based VS Code instance, or you can clone the repository and run
`npm install` to install the dependencies.

Then, to start up the dev-loop and run the tests, you can run `npm start`. To
run only the tests, you can run `npm test`. Note that the demo script is only
run in non-CI environments from `npm test`. It's recommended to run `npm test`
before commiting or pushing changes. It also formats your code with Prettier!

We currently don't publish `.d.ts` types due to [qmhc/vite-plugin-dts#194].
But... These types _should_ be available by default in the `DOM` lib, since they
match the default browser implementation! If you can solve this `.d.ts` problem,
please! 🙏 Open a PR!

📚 For more information about how this package works and more dev-focused docs,
check out [the wiki]!

[yarn]: https://yarnpkg.com/
[pnpm]: https://pnpm.io/
[qmhc/vite-plugin-dts#194]: https://github.com/qmhc/vite-plugin-dts/issues/194
[the wiki]: https://github.com/jcbhmr/node-simple-dialogs/wiki
