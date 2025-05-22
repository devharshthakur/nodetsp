/**
 * @fileoverview File Setup Service for nodetsp CLI
 *
 * This service encapsulates all file and configuration setup operations
 * including TypeScript configuration, ESLint, Prettier, Git initialization,
 * and folder structure creation.
 *
 * @module fileSetupService
 */

import { PackageManager } from '@/services/packageManagerService.js';
import { initGit } from '@/utils/setup/gitSetup.js';
import { setupPrettier } from '@/utils/setup/prettierSetup.js';
import { setupESLint } from '@/utils/setup/eslintSetup.js';
import { generateTsConfig } from '@/utils/setup/tsconfigSetup.js';
import { setupReadme } from '@/utils/setup/readmeSetup.js';
import { createFolderStructure as createFolders } from '@/utils/filesystem.js';

export type ModuleSystem = 'commonjs' | 'esm';

/**
 * Service responsible for all file and configuration setup operations
 */
export class FileSetupService {
  /**
   * Creates the basic folder structure for a project
   *
   * @param projectPath - Path to the project
   * @param additionalFolders - Additional folders to create in src directory
   * @param packageManager - Package manager being used
   */
  public async createFolderStructure(
    projectPath: string,
    additionalFolders: string[],
    packageManager: PackageManager
  ): Promise<void> {
    await createFolders(projectPath, additionalFolders, packageManager);
  }

  /**
   * Sets up TypeScript configuration based on module system
   *
   * @param projectPath - Path to the project
   * @param moduleSystem - Module system to use (ESM or CommonJS)
   */
  public async setupTypeScript(projectPath: string, moduleSystem: ModuleSystem): Promise<void> {
    await generateTsConfig(projectPath, moduleSystem);
  }

  /**
   * Sets up Prettier configuration
   *
   * @param projectPath - Path to the project
   */
  public async setupPrettier(projectPath: string): Promise<void> {
    await setupPrettier(projectPath);
  }

  /**
   * Sets up ESLint configuration
   *
   * @param projectPath - Path to the project
   */
  public async setupESLint(projectPath: string): Promise<void> {
    await setupESLint(projectPath);
  }

  /**
   * Initializes Git repository with gitignore and initial commit
   *
   * @param projectPath - Path to the project
   */
  public async initGit(projectPath: string): Promise<void> {
    await initGit(projectPath);
  }

  /**
   * Creates a README.md file for the project
   *
   * @param projectPath - Path to the project
   * @param projectName - Name of the project
   * @param packageManager - Package manager being used
   */
  public async setupReadme(projectPath: string, projectName: string, packageManager: PackageManager): Promise<void> {
    await setupReadme(projectPath, projectName, packageManager);
  }
}
