/**
 * CLI entry point for the Nodetsp CLI tool.
 * This file handles the interactive CLI prompts and collects user input for project configuration.
 */

import { CliArguments, ProjectOptions } from '@/types/cliArgs.js';
import { OptionalFolders } from '@/types/folders.js';
import { ModuleSystem } from '@/types/moduleSystem.js';
import { PackageManager } from '@/types/packageManager.js';
import { intro, isCancel, multiselect, outro, select, text, confirm } from '@clack/prompts';
import { scaffoldProject } from './scaffold.js';
import color from 'picocolors';

/**
 * This file serves as the main CLI interface for the Nodetsp tool, which helps create and scaffold TypeScript projects.
 *
 * Key responsibilities:
 * - Provides an interactive command-line interface using @clack-prompts
 * - Collects user input for project configuration including:
 *   - Project name
 *   - Package manager selection (npm/pnpm)
 *   - Module system choice (ESM/CommonJS)
 *   - Additional folder structure
 *   - Git initialization preference
 * - Manages project scaffolding based on user selections
 *
 * @module cli/index
 */

export async function runCli(cliArgs: Partial<CliArguments> = {}) {
  console.clear();
  intro(color.magentaBright('Nodetsp CLI'));

  // Project Name
  const projectName = cliArgs.projectName
    ? cliArgs.projectName
    : await text({
        message: 'What will your project named',
        placeholder: 'my-app',
        validate: value => {
          if (value.length > 30) return 'Project name must be less than 50 characters';
          return;
        },
      });
  if (isCancel(projectName)) {
    outro('Operation cancelled');
    process.exit(0);
  }

  // Package Manger
  const packageManager = cliArgs.packageManager
    ? cliArgs.packageManager
    : await select<PackageManager>({
        message: 'Choose a package manager',
        options: [
          { value: 'npm', label: 'npm' },
          { value: 'pnpm', label: 'pnpm' },
        ],
        initialValue: 'npm',
      });
  if (isCancel(packageManager)) {
    outro('Operation cancelled');
    process.exit(0);
  }

  // Module System
  const moduleSystem = cliArgs.moduleSystem
    ? cliArgs.moduleSystem
    : await select<ModuleSystem>({
        message: 'Choose a module system you want',
        options: [
          { value: 'cjs', label: 'Commonjs' },
          { value: 'esm', label: 'EsModules' },
        ],
        initialValue: 'esm',
      });
  if (isCancel(moduleSystem)) {
    outro('Operation cancelled');
    process.exit(0);
  }

  // Optional Folders
  const folders = cliArgs.folders
    ? cliArgs.folders
    : await multiselect<OptionalFolders>({
        message: 'Choose optional folders you want to add',
        options: [
          { value: 'config', label: 'Config' },
          { value: 'util', label: 'Utils' },
          { value: 'lib', label: 'Lib' },
          { value: 'types', label: 'Types' },
        ],
        required: false,
      });
  if (isCancel(folders)) {
    outro('Operation cancelled');
    process.exit(0);
  }

  // Initialize git
  const initGit = cliArgs.initGit
    ? cliArgs.initGit
    : await confirm({
        message: 'Do you want to initialize a git repository here',
        initialValue: false,
      });
  if (isCancel(initGit)) {
    outro('Operation cancelled');
    process.exit(0);
  }

  // Install dependencies
  const installDeps = await confirm({
    message: 'Do you want to install dependencies now?',
    initialValue: false,
  });
  if (isCancel(installDeps)) {
    outro('Operation cancelled');
    process.exit(0);
  }

  /**
   * Creates a type-safe object containing all the project configuration options
   * gathered from CLI arguments or user prompts. This object will be used to
   * scaffold the project with the specified settings.
   *
   */
  const results: ProjectOptions = {
    projectName: projectName as string,
    packageManager: packageManager as PackageManager,
    moduleSystem: moduleSystem as ModuleSystem,
    folders: folders as OptionalFolders[],
    initGit: initGit as boolean,
    installDeps: installDeps as boolean,
  };

  // Show spinner while scaffolding and after scaffolding the project show next steps
  try {
    await scaffoldProject(results);
    let nextSteps = `Project "${results.projectName}" created!\n\nNext steps:\n  1. cd ${results.projectName}`;
    if (!results.installDeps) {
      nextSteps += `\n  2. ${results.packageManager} install`;
      nextSteps += `\n  3. ${results.packageManager} run build`;
      nextSteps += `\n  4. ${results.packageManager} run start`;
    } else {
      nextSteps += `\n  2. ${results.packageManager} run build`;
      nextSteps += `\n  3. ${results.packageManager} run start`;
    }
    nextSteps += `\n\nHappy coding! 🚀`;
    outro(nextSteps);
  } catch (err) {
    console.error('Error during scaffolding:', err);
    outro('Something went wrong during scaffolding. Please check the logs.');
  }
}
