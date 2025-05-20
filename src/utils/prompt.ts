import inquirer from 'inquirer';
import { PackageManager } from './packageManager.js';

export interface ProjectDetails {
  projectName: string;
  moduleSystem: 'commonjs' | 'esm';
  folders: string[];
  initGit: boolean;
  packageManager: PackageManager;
}

export const prompt = {
  async getProjectDetails(defaultPackageManager: PackageManager): Promise<ProjectDetails> {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: '🚀 What is the name of your project?',
        default: 'my-nodetsp-app',
        validate: (input: string) => input.trim() !== '' || 'Project name is required',
      },
      {
        type: 'list',
        name: 'packageManager',
        message: '📦 Which package manager would you like to use?',
        choices: [
          { name: 'npm', value: 'npm' },
          { name: 'pnpm', value: 'pnpm' },
        ],
        default: defaultPackageManager,
      },
      {
        type: 'list',
        name: 'moduleSystem',
        message: '🔌 Which module system would you like to use?',
        choices: [
          { name: 'ESM (import/export with NodeNext)', value: 'esm' },
          { name: 'CommonJS (require/exports)', value: 'commonjs' },
        ],
        default: 'esm',
      },
      {
        type: 'checkbox',
        name: 'folders',
        message: '📂 Select additional folders to include in src (leave empty for none):',
        choices: [
          { name: 'lib - Reusable library code', value: 'lib' },
          { name: 'utils - Utility functions', value: 'utils' },
          { name: 'config - Configuration files', value: 'config' },
          { name: 'types - TypeScript type definitions', value: 'types' },
          { name: 'tests - Test files', value: 'tests' },
        ],
        default: [],
      },
      {
        type: 'confirm',
        name: 'initGit',
        message: '🔰 Initialize a Git repository?',
        default: false,
      },
    ]);
  },
};
