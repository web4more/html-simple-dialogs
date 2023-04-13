import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileSync } from "tmp";
import { fileURLToPath } from "node:url";

const subprocessPath = fileURLToPath(
  new URL("redletSync-subprocess.js", import.meta.url)
);

/**
 * A sister function to [developit/greenlet][developit/greenlet] that runs
 * things **synchronously** and in a **subprocess**. This function is
 * custom-made to fit this specific use case: to be able to **synchronously use
 * async functions that require access to STDIO**. That means no worker threads
 * since worker threads proxy through the main thread. That means no asyncronous
 * readline since we need it to be synchronous. That leaves the only option of
 * subprocess (since subprocesses have independent STDIO) and `spawnSync()`
 * (since we need it to be synchronous).
 *
 * The name of this function is so because red is worse than green, and the -let
 * is just because this is very similar in signature to the
 * [`greenlet()`][`greenlet()`] function from
 * [developit/greenlet][developit/greenlet].
 *
 * If you're in the source code looking at how we did this, **don't do anything
 * in your codebase this way**. It's terribly slow, unidiomatic, and, frankly,
 * the worse possible way.
 *
 * Other options that might serve you better are:
 *
 * - **[developit/greenlet][developit/greenlet]** for when you just want to
 *   offload work to another thread since it's some expensive computation.
 * - **[abbr/deasync][abbr/deasync]** which spins the event loop _at the point it
 *   was called_ until some condition is met. Things get complicated fast.
 * - **[Kaciras/deasync][Kaciras/deasync]** is a fork of
 *   [abbr/deasync][abbr/deasync] that boasts more/better features and code.
 * - **[un-ts/synckit][un-ts/synckit]** to run an async function in a `Worker`
 *   thread, and then use `Atomics.wait()` to **synchronously** wait for it.
 * - **[sindresorhus/make-synchronous][sindresorhus/make-synchronous]** is what
 *   this project _would_... if only it didn't abuse STDIO as its comm channel.
 *
 * [developit/greenlet]: https://github.com/developit/greenlet#readme
 *
 * [`greenlet()`]: https://github.com/developit/greenlet/blob/master/greenlet.js#L5
 *
 * [abbr/deasync]: https://github.com/abbr/deasync#readme
 *
 * [Kaciras/deasync]: https://github.com/Kaciras/deasync#readme
 *
 * [un-ts/synckit]: https://github.com/un-ts/synckit#readme
 *
 * [sindresorhus/make-synchronous]: https://github.com/sindresorhus/make-synchronous#readme
 */
function redletSync<T extends any[], U>(
  f: (...args: T) => U
): (...args: T) => Awaited<U> {
  function run(...args: T): Awaited<U> {
    const functionJS = "" + f;
    const argsJSON = JSON.stringify(args);
    const resultHandle = fileSync({ postfix: ".json" });
    try {
      const resultPath = resultHandle.name;

      const subprocess = spawnSync(
        process.execPath,
        [subprocessPath, functionJS, argsJSON, resultPath],
        { stdio: "inherit" }
      );

      const resultJSON = readFileSync(resultPath, "utf-8");
      const result = JSON.parse(resultJSON);
      if (subprocess.status) {
        throw result;
      } else {
        return result;
      }
    } finally {
      resultHandle.removeCallback();
    }
  }
  Object.defineProperty(run, "name", { value: f.name });
  Object.defineProperty(run, "length", { value: f.length });
  return run;
}

export default redletSync;
