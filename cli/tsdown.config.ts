import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/**"],
  format: ["esm"],
  dts: true,
  clean: true,
  unbundle: true,
});
