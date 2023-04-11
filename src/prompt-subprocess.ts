#!/usr/bin/env node
import { createInterface } from "node:readline/promises";

const message = process.argv[2];
const rl = createInterface({
  input: process.stdin,
  input: process.stderr,
});

const answer = await rl.question(message);
process.stdout.write(answer);

rl.close();
