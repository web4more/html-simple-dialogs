#!/usr/bin/env node
/**
 * @file
 *
 * process.argv = mode and arguments
 * process.stdin = user input
 * process.stderr = user interface
 * process.stdout = return value
 */

import { createInterface } from "node:readline/promises";
import promptAsync from "./promptAsync.ts";
import confirmAsync from "./confirmAsync.ts";
import alertAsync from "./alertAsync.ts";

let rl = createInterface({
  input: process.stdin,
  output: process.stderr,
});

const [name, ...args] = process.argv.slice(3);

// node $FILE prompt 'What's your favorite movie?'
if (name === "prompt") {
  const [message, defaultValue] = args;
  const answer = await rl.question(message);
  if (answer) {
    process.stdout.write(answer);
  }
}
// node $FILE confirm 'Are you sure you want to exit?'
else if (name === "confirm") {
  const [message] = args;
  const answer = await rl.question(message);
  if (/^(?:|o|ok|y|yes)$/i.test(answer)) {
    process.stdout.write("true");
  } else if (/^(?:c|cancel|n|no)$/i.test(answer)) {
    process.stdout.write("false");
  } else {
    process.stdout.write("true");
  }
}
// node $FILE alert 'You have saved this file!'
else if (name === "alert") {
  const [message] = args;
  await rl.question(message);
}

rl.close();
rl = null;
// process.exit()
