/**
 * @fileoverview CLI Context Utility
 *
 * This module provides a simple  store for storing CLI options which can be then accessed across the application.
 * It allows command line arguments to be saved and accessed by other modules,
 * particularly useful for prompts to skip questions when options are already provided.
 */

import { CliArguments } from '@/types/cliArgs.js';

export class CliArgsStore {
  private cliArgs: CliArguments = { folders: [], initGit: false };

  public setArgs(args: CliArguments): void {
    this.cliArgs = args;
  }

  public getArgs(): CliArguments {
    return this.cliArgs;
  }

  // Helper to determine if an option was provided via CLI
  public hasOption<K extends keyof CliArguments>(key: K): boolean {
    if (key in this.cliArgs) {
      const value = this.cliArgs[key];
      if (typeof value === 'boolean') {
        return true;
      }
      return value !== undefined && value !== null;
    }
    return false;
  }
}
