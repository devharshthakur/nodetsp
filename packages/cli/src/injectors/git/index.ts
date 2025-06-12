import { Injector } from '@/types/injector.js';
import { execa } from 'execa';

export class GitInjector implements Injector {
  private shouldInitGit: boolean;

  constructor(shouldInitGit: boolean) {
    this.shouldInitGit = shouldInitGit;
  }

  async inject(): Promise<void> {
    if (!this.shouldInitGit) return;
    try {
      await execa('git', ['init']);
      await execa('git', ['add', '.']);
      await execa('git', ['commit', '-m', 'Initial commit']);
    } catch (error) {
      console.error('Failed to initialize git repository or make initial commit:', error);
    }
  }
}
