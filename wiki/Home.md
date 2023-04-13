This polyfill is based on the [HTML Standard]. It provides a polyfill for [8.8.1
Simple dialogs] **only**. This polyfill is only meant to be used in Node.js, and
is not intended to be used in browsers.

The central idea is that `spawnSync()` allows an **entirely separate** Node.js
process to run async/await operations **while still synchronously blocking the
main thread**. This lets us pause the `prompt()` function and **synchronously
use the default STDIN processing** to read the user's input.

We use a `redlet()` function (inspired by [developit/greenlet]'s name) which
runs a function in a separate subprocess _syncronously_. The name is "redlet"
because this is something you should never do (hence, "red" 🛑). Check out the
source code. I think I've done a good job of documenting it with the massive
JSDoc comments. 😁

I've also tried to break out each component part of this polyfill into its own
file. This means that each algorithm is in its own file, like
`cannotShowSimpleDialog()` is in `cannotShowSimpleDialog.ts`. This is to make it
easier to read and understand the code (I hope). In the future, these algorithms
may be exposed like `@jcbhmr/html-simple-dialogs/cannotShowSimpleDialog` which
_could_ help with interop with other packages & polyfills? That way you can hook
into an existing algorithm or mutate some private data without rewriting an
already-polyfilled feature. (Actually this isn't really relevant to this
polyfill since it's quite small, but you get the idea.)

This project also is trying out TypeScript v5! I'm using the
`"moduleResolution: "bundler"` and `allowImportingTsExtensions: true` to
hopefully make it more correct? semantic? readable? The point is I'm using a
fancy new feature. Only problem is it doesn't work with vite-plugin-dts yet, so
we need to generate the `.d.ts` types manually. Since there's literally only
three functions in this project, I'm (so far) just manually keeping an
`index.d.ts` file up to date.

## FAQ

### What's in the name?

You may have noticed that [@jcbhmr] has some other packages that polyfill more
spec-related things. These packages all are named with a _similar_ idea: provide
context about a) what spec the package is polyfilling and b) try to specify what
part (if any).

In this case, we are polyfilling the HTML Standard, which has a short name of
"html" (as seen in the URL of html.spec.whatwg.org). Since we are only
polyfilling the [8.8.1 Simple dialogs] section, we use the name "simple-dialogs"
to specify that. Thus, we get html-simple-dialogs.

Oh, and it's scoped to [@jcbhmr] bBecause _right now_ it's just me, myself, and
I. It clearly indicates ownership, maintenance, etc. If in the future this
project grows, then this package might become unscoped. If in the future becomes
part of a larger organization, this package can and **should** be renamed and
moved to that organization's namespace.

### Why not use a worker thread instead of a subprocess?

While this is a good idea, it's not possible to do this and read STDIN
_syncronously_. Why? Because Node.js puts all the STDIO processing on the main
thread. When you `process.stdin.read()`, it's actually proxying the read
operation to the main thread. This means that if the main thread is blocked
(say, via an `Atomics.wait()` call), then the `process.stdin.read()` call will
never return.

This is why we use a subprocess instead. The subprocess is a separate Node.js
process that _just so happens_ to **inherit** the main thread's STDIO streams.
This means we can use the default STDIN processing to read the user's input
while the main thread is blocked just fine!

📚 If you're looking for a worker-based async ➡️ sync offloader, check out
[un-ts/synckit]. It lets you do the same thing the `redlet()` function does,
just with a `Worker` instead of a subprocess.

<!-- prettier-ignore-start -->
[scope | npm Docs]: https://docs.npmjs.com/cli/v9/using-npm/scope
[html standard]: https://html.spec.whatwg.org/multipage/
[8.8.1 simple dialogs]: https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#simple-dialogs
[developit/greenlet]: https://github.com/developit/greenlet#readme
[un-ts/synckit]: https://github.com/un-ts/synckit#readme
[@jcbhmr]: https://github.com/jcbhmr
<!-- prettier-ignore-end -->
