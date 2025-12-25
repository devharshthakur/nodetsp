#!/usr/bin/env node
/**
 * @file index.ts
 * @description Entry point for the nodetsp CLI.
 * Configures the CLI commands, versioning, and main action handlers
 * using the commander library.
 */

import { Command } from "commander";
import { cli } from "./lib/cli";

const program = new Command();

program
  .name("nodetsp")
  .description("A cli for creating a new typecript project")
  .version("2.0.0-beta.1");

program
  .command("init")
  .description("Initialize a new TypeScript project")
  .action(async () => {
    await cli();
  });

program.parse(process.argv);
