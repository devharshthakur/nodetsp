import { Injector } from '@/types/injector.js';
import { execa } from 'execa';
import { createFile, readFile } from '@/utils/filesystem.js';
import path from 'path';
import { fileURLToPath } from 'url';

export class GitInjector implements Injector {
  private shouldInitGit: boolean;

  /**
   * Initializes a new GitInjector instance.
   * @param {boolean} shouldInitGit - Flag indicating whether to initialize Git.
   */
  constructor(shouldInitGit: boolean) {
    this.shouldInitGit = shouldInitGit;
  }

  /**
   * Creates a .gitignore file in the current directory using template
   */
  async createGitignore() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const gitignorePath = path.join(__dirname, '../../template/git', '.gitignore');
    const gitignore = await readFile(gitignorePath);
    await createFile('.gitignore', gitignore);
  }

  /**
   * Commits changes to the Git repository with the specified message.
   * @param {string} message - The commit message.
   */
  async commitGit(message: string): Promise<void> {
    await execa('git', ['add', '.']);
    await execa('git', ['commit', '-m', message]);
  }

  /**
   * Injects Git functionality into the project.
   * Initializes a Git repository, creates a .gitignore file, and makes an initial commit if shouldInitGit is true.
   */
  async inject(): Promise<void> {
    if (!this.shouldInitGit) return;
    try {
      await execa('git', ['init']);
      await this.createGitignore(); // create gitignore file
      await this.commitGit('Initial commit'); // Add all files and commit
    } catch (error) {
      console.error('Failed to initialize git repository or make initial commit:', error);
    }
  }
}
