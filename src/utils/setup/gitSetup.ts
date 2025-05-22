/**
 * This module provides functionality for initializing a Git repository in a project.
 * It includes methods to create a Git repository, generate a comprehensive .gitignore file,
 * and create an initial commit. The module handles the setup of standard Git configurations
 * for a TypeScript Node.js project.
 *
 * @module gitSetup
 */

import { execa } from 'execa';
import fs from 'fs-extra';
import path from 'path';

export async function initGit(projectPath: string): Promise<void> {
  // Initialize git repository
  await execa('git', ['init'], { cwd: projectPath });

  // Create .gitignore file
  const gitignoreContent = [
    '# Dependencies',
    'node_modules/',
    '',
    '# Build output',
    'dist/',
    'build/',
    '',
    '# Logs',
    'logs/',
    '*.log',
    'npm-debug.log*',
    'yarn-debug.log*',
    'yarn-error.log*',
    'pnpm-debug.log*',
    '',
    '# Environment variables',
    '.env',
    '.env.local',
    '.env.*.local',
    '',
    '# Editor directories and files',
    '.vscode/*',
    '!.vscode/extensions.json',
    '.idea/',
    '.DS_Store',
    '*.suo',
    '*.ntvs*',
    '*.njsproj',
    '*.sln',
    '*.sw?',
    '',
    '# Coverage reports',
    'coverage/',
    '',
  ].join('\n');

  await fs.writeFile(path.join(projectPath, '.gitignore'), gitignoreContent);
  // Add all files to staging area and then do the inital commit
  await execa('git', ['add', '.'], { cwd: projectPath });
  await execa('git', ['commit', '-m', '🚀 Initial commit'], { cwd: projectPath });
}
