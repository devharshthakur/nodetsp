/**
 * This module provides a function to set up Prettier configuration files
 * for the created ts project. It creates a .prettierrc file with specified formatting options
 * and a .prettierignore file to exclude certain directories and files from formatting.
 *
 * @module prettierSetup
 */

import fs from 'fs-extra';
import path from 'path';

export async function setupPrettier(projectPath: string): Promise<void> {
  const prettierConfig = {
    semi: true,
    singleQuote: true,
    trailingComma: 'es5',
    printWidth: 120,
    tabWidth: 2,
    endOfLine: 'lf',
  };

  await fs.writeJSON(path.join(projectPath, '.prettierrc'), prettierConfig, { spaces: 2 });

  const prettierIgnore = [
    'node_modules/',
    'dist/',
    'coverage/',
    '*.log',
    'package-lock.json',
    'pnpm-lock.yaml',
    'yarn.lock',
    '.vscode/',
    '',
  ].join('\n');

  await fs.writeFile(path.join(projectPath, '.prettierignore'), prettierIgnore);
}
