import { BaseInjector } from '@/injectors/base/index.js';
import { ProjectOptions } from '@/types/cliArgs.js';
import { execa } from 'execa';
import { GitInjector } from '@/injectors/git/index.js';

export async function scaffoldProject(options: ProjectOptions) {
  const { folders, packageManager, projectName, moduleSystem, initGit, installDeps } = options;
  // Create injectors instances
  const baseInjector = new BaseInjector(folders, packageManager, projectName, moduleSystem, initGit);
  const gitInjector = new GitInjector(initGit);
  // Call all the injectors instances
  await baseInjector.inject();
  await gitInjector.inject(); // always inject git at last so all files get commited (check its index.ts file)
  // When all injections are completed then install the dependencies
  if (installDeps) {
    try {
      await execa(packageManager, ['install'], { stdio: 'inherit' });
    } catch (error) {
      console.error('Failed to install dependencies:', error);
    }
  }
}
