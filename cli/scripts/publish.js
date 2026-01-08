#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { resolve, join } from "node:path";
import { logInfo, logError, runCommand, confirmYes } from "./util/index.js";

// Configuration targets this package filter and release tag
const PACKAGE_FILTER = "./cli";
const TAG = "beta"; // changed when required

// Resolve filesystem locations relative to this script
const SCRIPT_DIR = import.meta.dirname;
const PACKAGE_DIR = resolve(SCRIPT_DIR, "..");
const WORKSPACE_ROOT = resolve(SCRIPT_DIR, "../..");
const PACKAGE_JSON_PATH = join(PACKAGE_DIR, "package.json");

async function main() {
  try {
    // 1. Load the version we intend to ship
    const packageJson = JSON.parse(readFileSync(PACKAGE_JSON_PATH, "utf8"));
    const version = packageJson.version;

    logInfo(`Publishing package version ${version} with pnpm tag ${TAG}.`);
    logInfo("Running dry-run pack so you can see what will be published.");

    // 2. Dry-run output for inspection
    runCommand(`pnpm --filter "${PACKAGE_FILTER}" pack --dry-run`, {
      cwd: WORKSPACE_ROOT,
    });

    console.log("\n[INFO] Dry-run complete.");
    logInfo(`About to publish version ${version} with tag ${TAG}.`);

    // 3. Prompt for manual confirmation
    const confirmed = await confirmYes("Confirm publish by typing 'yes': ");

    if (!confirmed) {
      logInfo("Publish canceled; no changes were sent.");
      process.exit(0);
    }

    // 4. Actual publish step
    logInfo("Publishing now...");
    runCommand(`pnpm --filter "${PACKAGE_FILTER}" publish --tag "${TAG}"`, {
      cwd: WORKSPACE_ROOT,
    });

    logInfo(`Publish complete for version ${version}.`);
  } catch (error) {
    logError("Publish script encountered an error: " + error.message);
    process.exit(1);
  }
}

main();
