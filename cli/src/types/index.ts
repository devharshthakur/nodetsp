/**
 * Consolidated type definitions for the CLI.
 * This file exports all TypeScript types and interfaces used throughout the CLI codebase.
 */

export type PackageManager = "pnpm" | "npm" | "yarn";
export type Tooling = "tsc" | "swc";
export type ModuleSystem = "esm" | "cjs";
export type Folders = "config" | "lib" | "types" | "utils";

// Project configuration type
export type ProjectConfig = {
  name: string;
  packageManager: PackageManager;
  tooling: Tooling;
  moduleSystem: ModuleSystem;
  folders?: Folders[];
  installDeps: boolean;
};
