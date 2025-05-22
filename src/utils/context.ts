/**
 * @fileoverview CLI Context Utility
 *
 * This module provides a simple context store for sharing CLI options across the application.
 * It allows command line arguments to be saved and accessed by other modules,
 * particularly useful for prompts to skip questions when options are already provided.
 */

import { PackageManager } from '@/services/packageManagerService.js';

export interface CliOptions {
  name?: string;
  packageManager?: PackageManager;
  moduleSystem?: 'esm' | 'commonjs';
  folders?: string[];
  initGit?: boolean;
}

// Singleton store for CLI options
class CliContext {
  private static instance: CliContext;
  private options: CliOptions = {};

  private constructor() {}

  public static getInstance(): CliContext {
    if (!CliContext.instance) {
      CliContext.instance = new CliContext();
    }
    return CliContext.instance;
  }

  public setOptions(options: CliOptions): void {
    this.options = options;
  }

  public getOptions(): CliOptions {
    return this.options;
  }

  // Helper to determine if an option was provided via CLI
  public hasOption<K extends keyof CliOptions>(key: K): boolean {
    return key in this.options && this.options[key] !== undefined;
  }
}

// Export a singleton instance
export const cliContext = CliContext.getInstance();
