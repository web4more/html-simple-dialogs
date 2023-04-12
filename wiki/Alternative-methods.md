This package relies heavily on the idea that `spawnSync()` allows an **entirely
separate** Node.js process to run async/await operations **while still
synchronously blocking the main thread**. This is a very powerful idea, but
there are a few other ideas that were tried and failed.

## Using worker threads

You can use worker threads to run async/await operations in a separate thread.
The only problem with this is that worker threads share the same input and
output streams **and their event loop** with the main thread. This means that if
the main thread stops (like via an `Atomics.wait()` call) and the worker thread
tries to read from `process.stdin`, nothing happens. This is because the
`process.stdin` is still being fed through the main thread _even though_ all
other I/O is being handled locally by the worker thread.

```js
// main.js
import { Worker } from "worker_threads";

const buffer = new SharedArrayBuffer(4);
const view = new Int32Array(buffer);

const worker = new Worker("worker.js");
worker.postMessage(buffer);

// This will take 1 second to complete.
Atomics.wait(view, 0, 0);
console.log(view[0]);
//=> 3
```

```js
// worker.js
import { parentPort } from "worker_threads";

parentPort.on("message", (buffer) => {
  setTimeout(() => {
    const view = new Int32Array(buffer);
    view[0] = 3;
    Atomics.notify(view, 0);
  }, 1000);
});
```

This same idea also works in the browser too!
