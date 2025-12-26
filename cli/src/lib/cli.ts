/**
 * @file cli.ts
 * @description Main interactive CLI logic for project initialization.
 * Handles user prompts for project configuration including package manager,
 * tooling, module system, and optional features using @clack/prompts.
 */

import {
  confirm,
  intro,
  isCancel,
  multiselect,
  outro,
  select,
  spinner,
  text,
} from "@clack/prompts";
import type {
  PackageManager,
  ModuleSystem,
  Tooling,
  Folders,
  ProjectConfig,
} from "@/types";
import colors from "picocolors";
import { scaffold } from "@/lib/scaffold";
import pkg from "@/../package.json" assert { type: "json" };

function handleCancel<T>(result: T | symbol): T {
  if (isCancel(result)) {
    outro(colors.redBright("Project initialization cancelled"));
    process.exit(0);
  }
  return result as T;
}

export async function cli() {
  console.clear();

  intro(
    `${colors.magentaBright("nodetsp cli")} ${colors.cyanBright(`v${pkg.version}`)}`
  );

  // Project name
  const projectName = handleCancel(
    await text({
      message: "Project name",
      placeholder: "my-app",
      validate: (value) => {
        if (value.length > 30)
          return "Project name must be less than 30 characters";
        if (!value) return undefined;
      },
      defaultValue: "my-app",
    })
  );

  // Package manager
  const packageManager = handleCancel(
    await select<PackageManager>({
      message: "Choose your package manager",
      options: [
        { label: "pnpm", value: "pnpm" },
        { label: "npm", value: "npm" },
        { label: "yarn", value: "yarn" },
      ],
      initialValue: "npm",
    })
  );

  // Tooling
  const tooling = handleCancel(
    await select<Tooling>({
      message: "Choose your tooling",
      options: [
        { label: "tsc", value: "tsc" },
        { label: "swc(Fast rust-based compiler)", value: "swc" },
      ],
      initialValue: "tsc",
    })
  );

  // Module system
  const moduleSystem = handleCancel(
    await select<ModuleSystem>({
      message: "Choose your module system",
      options: [
        { label: "esm", value: "esm" },
        { label: "cjs", value: "cjs" },
      ],
      initialValue: "esm",
    })
  );

  // Optional Folders
  const folders = handleCancel(
    await multiselect<Folders>({
      message: "Choose your folders",
      options: [
        { label: "config", value: "config" },
        { label: "lib", value: "lib" },
        { label: "types", value: "types" },
        { label: "utils", value: "utils" },
      ],
    })
  );

  // Install dependencies
  const installDeps = handleCancel(
    await confirm({
      message: "Do you want to install dependencies?",
      initialValue: true,
    })
  );

  // Project configuration
  const projectConfig: ProjectConfig = {
    name: projectName,
    packageManager,
    tooling,
    moduleSystem,
    folders,
    installDeps,
  };

  const s = spinner();

  s.start("Initializing project...");
  await scaffold(projectConfig);
  s.stop("Project initialized successfully");

  outro(colors.greenBright("Project initialized successfully"));
}
