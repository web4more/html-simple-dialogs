import { writeFileSync, readFileSync, unlinkSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { dedent } from "ts-dedent";

function createSubprocessFunction<T extends any[], U = any>(
  f: (...args: T) => U
): (...args: T) => Awaited<U> {
  function run(...args: T): Awaited<U> {
    const jsPath = join(tmpdir(), Math.random() + ".mjs");
    const jsonPath = join(tmpdir(), Math.random() + ".json");

    const js = dedent(`
      #!/usr/bin/env node
      import { writeFile } from "node:fs/promises";
      const args = process.argv.slice(2).map(x => JSON.parse(x));
      const f = ${f};
      let result;
      let reason;
      try {
        value = await f(...args);
      } catch (error) {
        reason = error;
      }
      await writeFile(${JSON.stringify(jsonPath)}, JSON.stringify({
        status: reason ? "rejected" : "fulfilled",
        value,
        reason,
      }));
    `);
    writeFileSync(jsPath, js);
    try {
      const result = spawnSync(
        process.execPath,
        [jsPath, ...args.map((x) => JSON.stringify(x))],
        { stdio: "inherit" }
      );
      if (result.status) {
        throw new Error("" + result.stderr);
      }
      const result = JSON.parse(readFileSync(jsonPath, "utf8"));
      if (result.status === "fulfilled") {
        return result.value;
      } else {
        throw result.reason;
      }
    } finally {
      try {
        unlinkSync(jsPath);
      } catch {}
      try {
        unlinkSync(jsonPath);
      } catch {}
    }
  }
  Object.defineProperty(run, "name", { value: f.name });
  Object.defineProperty(run, "length", { value: f.length });

  return run;
}

export default createSubprocessFunction;
