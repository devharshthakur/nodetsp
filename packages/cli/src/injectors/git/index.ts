import { Injector } from '@/types/injector.js';
import { execa } from 'execa';
import { createFile, readFile } from '@/utils/filesystem.js';
import path from 'path';
import { fileURLToPath } from 'url';

export class GitInjector implements Injector {
  private shouldInitGit: boolean;

  constructor(shouldInitGit: boolean) {
    this.shouldInitGit = shouldInitGit;
  }

  async createGitignore() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const gitignorePath = path.join(__dirname, '../../template/git', '.gitignore');
    const gitignore = await readFile(gitignorePath);
    await createFile('.gitignore', gitignore);
  }

  async inject(): Promise<void> {
    if (!this.shouldInitGit) return;
    try {
      await execa('git', ['init']);
      await this.createGitignore();
      await execa('git', ['add', '.']);
      await execa('git', ['commit', '-m', 'Initial commit']);
    } catch (error) {
      console.error('Failed to initialize git repository or make initial commit:', error);
    }
  }
}
