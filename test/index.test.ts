import "../src/index.ts";
import { test, expect, assert } from "vitest";

test("exposes prompt()", () => {
  assert(typeof prompt === "function");
});

test("exposes alert()", () => {
  assert(typeof alert === "function");
});

test("exposes confirm()", () => {
  assert(typeof confirm === "function");
});
