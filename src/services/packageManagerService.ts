/**
 * PackageManagerService provides methods to manage packages using a specified package manager.
 * It supports initializing a project, installing packages, and checking if the package manager is available.
 *
 * @class PackageManagerService
 */
import chalk from 'chalk';
import { execa } from 'execa';

export type PackageManager = 'npm' | 'pnpm';

export class PackageManagerService {
  constructor(private readonly packageManager: PackageManager) {}

  getCommand(): PackageManager {
    return this.packageManager;
  }

  async init(cwd: string): Promise<void> {
    if (this.packageManager === 'npm') {
      await execa(this.packageManager, ['init', '-y'], { cwd });
    } else if (this.packageManager === 'pnpm') {
      await execa(this.packageManager, ['init'], { cwd });
    }
  }

  async install(packages: string[], cwd: string): Promise<void> {
    const installCmd = this.packageManager === 'npm' ? 'install' : 'add';
    await execa(this.packageManager, [installCmd, ...packages], { cwd });
  }

  async installDev(packages: string[], cwd: string): Promise<void> {
    const installCmd = this.packageManager === 'npm' ? 'install' : 'add';
    await execa(this.packageManager, [installCmd, '-D', ...packages], { cwd });
  }

  async isAvailable(): Promise<boolean> {
    try {
      await execa(this.packageManager, ['--version']);
      return true;
    } catch {
      console.error(chalk.red(`⚠️ ${this.packageManager} is not installed on your system.`));
      return false;
    }
  }
}
