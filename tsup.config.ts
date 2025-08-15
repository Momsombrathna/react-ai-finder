import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    style: "src/components/AISearch.css",
  },
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  format: ["esm", "cjs"],
  external: ["react", "react-dom"],
  treeshake: true,
  minify: false,
  target: "es2020",
  outDir: "dist",
});
