import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import noBundle from "vite-plugin-no-bundle";

const config = defineConfig({
  build: {
    target: "esnext",
    ssr: true,
    lib: {
      entry: ["src/index.ts", "src/redlet-subprocess.js"],
      formats: ["es"],
      fileName: "index",
    },
  },
  plugins: [/* dts(), */ noBundle()],
});

export default config;
