import inquirer from 'inquirer';
import { PackageManager } from '@/services/packageManagerService.js';
import { cliContext } from './context.js';

export interface ProjectDetails {
  projectName: string;
  moduleSystem: 'commonjs' | 'esm';
  folders: string[];
  initGit: boolean;
  packageManager: PackageManager;
}

/**
 * Get complete project details through interactive prompts
 *
 * @returns Complete project details
 */
export async function getProjectDetails(): Promise<ProjectDetails> {
  // Get CLI options that were passed
  const cliOptions = cliContext.getOptions();

  let projectName = cliOptions.name;
  if (projectName === undefined) {
    const nameAnswer = await inquirer.prompt({
      type: 'input',
      name: 'projectName',
      message: '› What is the name of your project',
      default: 'my-nodetsp-app',
      validate: (input: string) => input.trim() !== '' || 'Project name is required',
    });
    projectName = nameAnswer.projectName;
  }

  // Get package manager
  let packageManager = cliOptions.packageManager;
  if (packageManager === undefined) {
    const pmAnswer = await inquirer.prompt({
      type: 'list',
      name: 'packageManager',
      message: '› Which package manager would you like to use?',
      choices: [
        { name: 'npm', value: 'npm' },
        { name: 'pnpm', value: 'pnpm' },
      ],
      default: 'pnpm',
    });
    packageManager = pmAnswer.packageManager as PackageManager;
  }

  // Get module system
  let moduleSystem = cliOptions.moduleSystem;
  if (moduleSystem === undefined) {
    const msAnswer = await inquirer.prompt({
      type: 'list',
      name: 'moduleSystem',
      message: '› Which module system would you like to use?',
      choices: [
        { name: 'ESM (import/export with NodeNext)', value: 'esm' },
        { name: 'CommonJS (require/exports)', value: 'commonjs' },
      ],
      default: 'esm',
    });
    moduleSystem = msAnswer.moduleSystem as 'commonjs' | 'esm';
  }

  // Get folders
  let folders = cliOptions.folders;
  if (folders === undefined) {
    const foldersAnswer = await inquirer.prompt({
      type: 'checkbox',
      name: 'folders',
      message: '› Select additional folders to include in src (leave empty for none):\n  ',
      choices: [
        { name: 'lib', value: 'lib' },
        { name: 'utils', value: 'utils' },
        { name: 'config', value: 'config' },
        { name: 'types', value: 'types' },
        { name: 'tests', value: 'tests' },
      ],
      default: [],
    });
    folders = foldersAnswer.folders;
  }

  // Get git init preference
  let initGit = cliOptions.initGit;
  if (cliOptions.initGit === undefined) {
    const gitAnswer = await inquirer.prompt({
      type: 'list',
      name: 'initGit',
      message: '› Initialize a Git repository?',
      choices: [
        { name: 'Yes', value: true },
        { name: 'No', value: false },
      ],
      default: true,
    });
    initGit = gitAnswer.initGit;
  }

  const fetchedProjectDetails: ProjectDetails = {
    projectName: projectName || 'my-nodetsp-app',
    packageManager: packageManager,
    moduleSystem: moduleSystem,
    folders: folders || [],
    initGit: initGit ?? false,
  };

  return fetchedProjectDetails;
}
