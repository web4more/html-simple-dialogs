#!/usr/bin/env node
/**
 * 1. JavaScript raw function code
 * 2. JSON-encoded arguments
 * 3. File to write JSON-encoded return value to
 *
 * If the exit code is 0, that means success. Anything else means that the
 * result in the JSON-encoded file is an error value and should be thrown. If
 * the process exits with an error code and the result.json file **does not
 * exit**, then that means that an uncaught error happened; most likely
 * something is wrong with this wrapper code.
 *
 * The reason that this is a .js file and not a .ts file is because it's wayyy
 * easier to deal with it in dev mode as a .js file. It's kinda hard to get Vite
 * to add this as a dependency while also **not** inlining it as a
 * `data:text/javascript` URL. 🤷‍♂️ This was just the easiest way. If there's a
 * better way, please let me know! 🙏
 *
 * @file
 * @example
 *   node redletSync-subprocess.js 'async (a, b) => a + b' '[45, 1000]' /tmp/result.json
 */

import { writeFile } from "node:fs/promises";

const [functionJS, argsJSON, resultPath] = process.argv.slice(2);
const function_ = (0, eval)(functionJS);
const args = JSON.parse(argsJSON);

// This is easier than trying to use a try/catch block. Why? Because we'd need
// to stash the return value OUTSIDE the try {} block, and then it just gets way
// too long and messy. This is terser and easier to read.
await function_(...args)
  .then(async (value) => {
    const valueJSON = JSON.stringify(value);
    await writeFile(resultPath, valueJSON);
    process.exit(0);
  })
  .catch(async (reason) => {
    const reasonJSON = JSON.stringify(reason);
    await writeFile(resultPath, reasonJSON);
    process.exit(1);
  });
