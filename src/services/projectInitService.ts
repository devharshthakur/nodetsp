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
import { PackageManagerService } from '@/services/packageManagerService.js';
import { ProjectDetails, getProjectDetails } from '@/utils/prompt.js';
import { FileSetupService } from '@/services/fileSetupService.js';

/**
 * Service class responsible for project initialization
 */
export class ProjectInitializationService {
  private fileSetupService: FileSetupService;

  constructor() {
    this.fileSetupService = new FileSetupService();
  }

  /**
   * Validates that the project path is usable
   *
   * @param projectPath Full path to project directory
   * @param projectName Name of the project
   * @throws Error if directory exists and is not empty
   */
  private async validateProjectPath(projectPath: string, projectName: string): Promise<void> {
    if (await fs.pathExists(projectPath)) {
      const directoryContent = await fs.readdir(projectPath);
      if (directoryContent.length > 0) {
        throw new Error(`Directory ${projectName} already exists and is not empty.`);
      }
    }
  }

  /**
   * Validates that the selected package manager is available
   *
   * @param details Project details with package manager selection
   * @returns Updated project details with possibly changed package manager
   */
  private async validatePackageManager(details: ProjectDetails): Promise<ProjectDetails> {
    const packageManagerService = new PackageManagerService(details.packageManager);
    if (!(await packageManagerService.isAvailable())) {
      if (details.packageManager === 'pnpm') {
        console.log(chalk.yellow(`ℹ️ Falling back to npm as pnpm is not installed.`));
        return { ...details, packageManager: 'npm' };
      } else {
        throw new Error('npm is required but not found on your system.');
      }
    }

    return details;
  }

  /**
   * Executes all setup tasks in sequence with progress indicators
   *
   * @param projectPath Path to create the project at
   * @param details Project configuration details
   * @param packageManagerService Package manager service instance
   */
  private async executeTaskList(
    projectPath: string,
    details: ProjectDetails,
    packageManagerService: PackageManagerService
  ): Promise<void> {
    await createTaskList([
      {
        title: 'Initializing project...',
        task: async () => {
          await packageManagerService.init(projectPath);
        },
      },
      {
        title: 'Creating folder structure...',
        task: async () => {
          await this.fileSetupService.createFolderStructure(projectPath, details.folders, details.packageManager);
        },
      },
      {
        title: 'Setting up TypeScript...',
        task: async () => {
          await this.fileSetupService.setupTypeScript(projectPath, details.moduleSystem);
          await packageManagerService.installDev(['typescript', '@types/node'], projectPath);
        },
      },
      {
        title: 'Setting up Prettier...',
        task: async () => {
          await this.fileSetupService.setupPrettier(projectPath);
          await packageManagerService.installDev(['prettier'], projectPath);
        },
      },
      {
        title: 'Setting up ESLint...',
        task: async () => {
          await packageManagerService.installDev(
            ['eslint', '@typescript-eslint/eslint-plugin', '@typescript-eslint/parser', '@eslint/js'],
            projectPath
          );

          await this.fileSetupService.setupESLint(projectPath);
        },
      },
      ...(details.initGit
        ? [
            {
              title: 'Initializing Git repository...',
              task: async () => {
                await this.fileSetupService.initGit(projectPath);
              },
            },
          ]
        : []),
    ]);
  }

  /**
   * Creates the project directory and sets up all project files
   *
   * @param projectPath Path to create the project at
   * @param details Complete project configuration details
   */
  private async createProject(projectPath: string, details: ProjectDetails): Promise<void> {
    const packageManagerService = new PackageManagerService(details.packageManager);
    await fs.ensureDir(projectPath);
    await this.executeTaskList(projectPath, details, packageManagerService);
  }

  /**
   * Displays success message and next steps to the user
   *
   * @param details Project details
   */
  private displaySuccessMessage(details: ProjectDetails): void {
    console.log(chalk.green(`\n✨ Project ${details.projectName} created successfully!`));
    console.log('\nNext steps:');
    console.log(`  1. cd ${details.projectName}`);
    console.log(`  2. ${details.packageManager} run dev to start development server`);
    console.log(`  3. ${details.packageManager} run build to build for production`);
  }

  /**
   * Handles errors that occur during initialization
   *
   * @param error Error that occurred
   */
  private handleError(error: unknown): never {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(chalk.red(`\n❌ Error: ${errorMessage}`));
    process.exit(1);
  }

  /**
   * Initializes a new TypeScript project based on user preferences
   */
  public async initialize(): Promise<void> {
    try {
      console.log(chalk.blue('Welcome to Nodetsp CLI'));
      // Get project configuration from user
      const projectDetails: ProjectDetails = await getProjectDetails();
      // Resolve project path
      const projectPath = path.resolve(process.cwd(), projectDetails.projectName);
      // Validate project path and package manager
      await this.validateProjectPath(projectPath, projectDetails.projectName);
      const validatedDetails = await this.validatePackageManager(projectDetails);
      // Create project structure and files
      await this.createProject(projectPath, validatedDetails);
      // Display success message and next steps
      this.displaySuccessMessage(validatedDetails);
    } catch (error: unknown) {
      this.handleError(error);
    }
  }
}
