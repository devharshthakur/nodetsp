import { BaseInjector } from '@/injectors/base/index.js';
import { ProjectOptions } from '@/types/cliArgs.js';
import { execa } from 'execa';
import { GitInjector } from '@/injectors/git/index.js';
import { tasks } from '@clack/prompts';

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
  // When all injector are finished injecting then install dependencies
  if (installDeps) {
    taskList.push({
      title: 'Installing dependencies \n',
      task: async () => {
        try {
          await execa(packageManager, ['install'], { stdio: 'ignore' });
        } catch (error) {
          console.error('Failed to install dependencies:', error);
          throw error; // Re-throw to let clack handle the error
        }
      },
    });
  }
  await tasks(taskList);
}
