/**
 * This file defines the TypeScript interface for CLI arguments passed by the user.
 * It includes properties for project name, package manager, module system, folders, and git initialization.
 */

import { OptionalFolders } from './folders.js';
import { ModuleSystem } from './moduleSystem.js';
import { PackageManager } from './packageManager.js';

export interface CliArguments {
  projectName?: string;
  packageManager?: PackageManager;
  moduleSystem?: ModuleSystem;
  folders: OptionalFolders[];
  initGit: boolean;
}

export interface ProjectOptions {
  projectName: string;
  packageManager: PackageManager;
  moduleSystem: ModuleSystem;
  folders: OptionalFolders[];
  initGit: boolean;
  installDeps: boolean;
}
