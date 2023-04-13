import { test, assert, expect, bench } from "vitest";
import redletSync from "../src/redletSync.ts";

test("it's synchronous", () => {
  const f = redletSync(async (a, b) => a + b);
  expect(f(1, 2)).toBe(3);
});
