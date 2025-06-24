import { BaseInjector } from '@/injectors/base/index.js';
import { ProjectOptions } from '@/types/cliArgs.js';
import { execa } from 'execa';
import { GitInjector } from '@/injectors/git/index.js';
import { tasks, spinner } from '@clack/prompts';

/**
 * Scaffolds a new TypeScript project with the specified configuration options.
 *
 * This function orchestrates the project creation process by:
 * 1. Creating and executing injectors for base project structure and optional services
 * 2. Managing the installation of dependencies if requested
 * 3. Using a task-based approach with visual feedback via @clack/prompts
 *
 * The scaffolding process follows this order:
 * - Base project structure is created first (BaseInjector)
 * - Optional services like eslint,jest/vitest are initialized then
 * - Then Git is injected at last so all files are commited (Git injector)
 * - Dependencies are installed if installDeps is true ( always after git injection)
 *
 * @param {ProjectOptions} options - Configuration options for the project
 * @throws {Error} If dependency installation fails
 */

export async function scaffoldProject(options: ProjectOptions) {
  const { folders, packageManager, projectName, moduleSystem, initGit, installDeps } = options;
  const taskList = [
    {
      title: 'Scaffolding the project',
      task: async () => {
        // Create injectors instances
        const baseInjector = new BaseInjector(folders, packageManager, projectName, moduleSystem, initGit);
        const gitInjector = new GitInjector(initGit);
        // Call all the injectors instances
        await baseInjector.inject(); // always inject base first then inject optional services
        await gitInjector.inject(); // always inject git at last so all files get commited (check its index.ts file)
      },
    },
  ];

  // Run the scaffolding tasks first
  await tasks(taskList);

  // Install dependencies with a single spinner if requested
  if (installDeps) {
    const s = spinner();
    s.start('Installing dependencies');

    try {
      await execa(packageManager, ['install'], {
        stdio: 'pipe',
      });
      s.stop('Dependencies installed successfully');
    } catch (error) {
      s.stop('Failed to install dependencies');
      console.error('Failed to install dependencies:', error);
      throw error;
    }
  }
}
