/**
 * @fileoverview Initialization module for nodetsp CLI
 *
 * This module provides the initialization functionality for nodetsp, allowing users to
 * create a new TypeScript project with a standardized structure.
 *
 * It handles:
 * - Project scaffolding with customizable folder structure
 * - TypeScript configuration with support for ESM or CommonJS
 * - Setting up Prettier, ESLint, and Git
 * - Installing necessary dependencies
 * - Creating a comprehensive README file
 *
 * The initialization process is guided by user prompts to create a tailored
 * development environment.
 *
 * @module init
 */

import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';
import { createTaskList } from '@/utils/spinner.js';
import { PackageManagerService, PackageManager } from '@/utils/packageManager.js';
import { initGit } from '@/utils/setup/gitSetup.js';
import { setupPrettier } from '@/utils/setup/prettierSetup.js';
import { createFolderStructure } from '@/utils/filesystem/filesystem.js';
import { prompt, ProjectDetails } from '@/utils/prompt.js';
import { generateTsConfig } from '@/utils/setup/tsconfigSetup.js';
import { setupESLint } from '@/utils/setup/eslintSetup.js';

interface InitOptions {
  packageManager?: PackageManager;
}

export async function init(options: InitOptions = {}): Promise<void> {
  try {
    console.log(chalk.blue('🚀 Welcome to nodetsp\n'));

    // Get project details from user
    const answers = await prompt.getProjectDetails(options.packageManager || 'npm');

    const projectPath = path.resolve(process.cwd(), answers.projectName);

    // Check if project directory already exists
    if (await fs.pathExists(projectPath)) {
      const directoryContent = await fs.readdir(projectPath);
      if (directoryContent.length > 0) {
        console.error(chalk.red(`⚠️ Directory ${answers.projectName} already exists and is not empty.`));
        process.exit(1);
      }
    }

    // Validate package manager is available
    const packageManager = new PackageManagerService(answers.packageManager);
    if (!(await packageManager.isAvailable())) {
      if (answers.packageManager === 'pnpm') {
        console.log(chalk.yellow(`ℹ️ Falling back to npm as pnpm is not installed.`));
        answers.packageManager = 'npm';
      } else {
        console.error(chalk.red(`⚠️ npm is required but not found on your system.`));
        process.exit(1);
      }
    }

    await createProject(projectPath, answers);

    console.log(chalk.green(`\n✨ Project ${answers.projectName} created successfully!`));
    console.log('\nNext steps:');
    console.log(`  1. cd ${answers.projectName}`);
    console.log(`  2. ${answers.packageManager} run dev to start development server`);
    console.log(`  3. ${answers.packageManager} run build to build for production`);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(chalk.red(`\n❌ Error: ${errorMessage}`));
    process.exit(1);
  }
}

async function createProject(projectPath: string, answers: ProjectDetails): Promise<void> {
  const packageManager = new PackageManagerService(answers.packageManager);

  // Ensure project directory exists
  await fs.ensureDir(projectPath);

  await createTaskList([
    {
      title: '🔍 Initializing project',
      task: async () => {
        await packageManager.init(projectPath);
      },
    },
    {
      title: '📁 Creating folder structure',
      task: async () => {
        await createFolderStructure(projectPath, answers.folders, answers.packageManager);
      },
    },
    {
      title: '🔧 Setting up TypeScript',
      task: async () => {
        await generateTsConfig(projectPath, answers.moduleSystem);
        await packageManager.installDev(['typescript', '@types/node'], projectPath);
      },
    },
    {
      title: '💅 Setting up Prettier',
      task: async () => {
        await setupPrettier(projectPath);
        await packageManager.installDev(['prettier'], projectPath);
      },
    },
    {
      title: '🚦 Setting up ESLint',
      task: async () => {
        await packageManager.installDev(
          ['eslint', '@typescript-eslint/eslint-plugin', '@typescript-eslint/parser', '@eslint/js'],
          projectPath
        );

        await setupESLint(projectPath);
      },
    },
    ...(answers.initGit
      ? [
          {
            title: '🔄 Initializing Git repository',
            task: async () => {
              await initGit(projectPath);
            },
          },
        ]
      : []),
  ]);
}
