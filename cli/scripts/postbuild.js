/**
 * @file postbuild.js
 * @description Post-build script to handle template copying and binary permissions.
 * This script ensures that the templates directory is copied to the dist folder
 * and that the generated binary has the necessary execution permissions.
 */

import { cp, chmod } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceDir = join(__dirname, "..", "templates");
const targetDir = join(__dirname, "..", "dist", "templates");
const binaryPath = join(__dirname, "..", "dist", "index.mjs");

try {
  await cp(sourceDir, targetDir, { recursive: true });
  console.log("Templates copied to dist/templates");

  // Make the binary executable
  await chmod(binaryPath, 0o755);
  console.log("Binary made executable");
} catch (error) {
  console.error("Error copying templates:", error);
  process.exit(1);
}
