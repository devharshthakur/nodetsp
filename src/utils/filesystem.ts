/**
 * This module provides filesystem utilities for creating project folder structures
 * and generating README files. It handles the creation of the basic project structure
 * including the src directory and any additional folders specified by the user.
 *
 * @module filesystem
 */

import fs from 'fs-extra';
import path from 'path';
import { setupReadme } from './setup/readmeSetup.js';

export async function createFolderStructure(
  projectPath: string,
  additionalFolders: string[],
  packageManager: string = 'pnpm'
): Promise<void> {
  // Always create src folder
  const srcPath = path.join(projectPath, 'src');
  await fs.ensureDir(srcPath);

  // Create additional folders based on user choice
  for (const folder of additionalFolders) {
    const folderPath = path.join(srcPath, folder);
    await fs.ensureDir(folderPath);
  }

  // Create a README.md for the project
  await setupReadme(projectPath, path.basename(projectPath), packageManager);
}
