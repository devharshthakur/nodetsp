import { BaseInjector } from '@/injectors/base/index.js';
import { ProjectOptions } from '@/types/cliArgs.js';
import { execa } from 'execa';
import { GitInjector } from '@/injectors/git/index.js';

export async function scaffoldProject(options: ProjectOptions) {
  const { folders, packageManager, projectName, moduleSystem, initGit, installDeps } = options;
  const baseInjector = new BaseInjector(folders, packageManager, projectName, moduleSystem, initGit);
  await baseInjector.inject();

  const gitInjector = new GitInjector(initGit);
  await gitInjector.inject();

  if (installDeps) {
    try {
      await execa(packageManager, ['install'], { stdio: 'inherit' });
    } catch (error) {
      console.error('Failed to install dependencies:', error);
    }
  }
}
