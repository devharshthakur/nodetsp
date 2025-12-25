/**
 * @file tsdown.config.ts
 * @description Configuration for the tsdown build tool.
 * Defines entry points, output formats, and build options for the CLI package.
 */

import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/**"],
  format: ["esm"],
  dts: true,
  clean: true,
  unbundle: true,
});
