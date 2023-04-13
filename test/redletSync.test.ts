import { test, assert, expect, bench } from "vitest";
import redlet from "../src/redlet.ts";

test("it's synchronous", () => {
  const f = redlet(async (a, b) => a + b);
  expect(f(1, 2)).toBe(3);
});
