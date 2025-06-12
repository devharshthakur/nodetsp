import { BaseInjector } from '@/injectors/base/index.js';
import { ProjectOptions } from '@/types/cliArgs.js';
import { execa } from 'execa';

export async function scaffoldProject(options: ProjectOptions) {
  const { folders, packageManager, projectName, moduleSystem, initGit, installDeps } = options;
  const baseInjector = new BaseInjector(folders, packageManager, projectName, moduleSystem, initGit);
  await baseInjector.inject(installDeps);
}
