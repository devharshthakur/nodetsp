import { describe, it, expect, vi, beforeEach } from 'vitest';
import { runCli } from './index.js';
import { CliArguments } from '@/types/cliArgs.js';
import { PackageManager } from '@/types/packageManager.js';
import { ModuleSystem } from '@/types/moduleSystem.js';
import { OptionalFolders } from '@/types/folders.js';
import { scaffoldProject } from './scaffold.js';
import { outro } from '@clack/prompts';

// Mock the @clack/prompts functions
vi.mock('@clack/prompts', () => ({
  intro: vi.fn(),
  outro: vi.fn(),
  isCancel: vi.fn(),
  text: vi.fn(),
  select: vi.fn(),
  multiselect: vi.fn(),
  confirm: vi.fn(),
}));

// Mock the scaffold module
vi.mock('./scaffold.js', () => ({
  scaffoldProject: vi.fn(),
}));

// Mock the injectors
vi.mock('@/injectors/base/index.js', () => ({
  BaseInjector: class {
    constructor() {}
    async inject() {}
  },
}));

vi.mock('@/injectors/git/index.js', () => ({
  GitInjector: class {
    constructor() {}
    async inject() {}
  },
}));

describe('CLI Arguments', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Project Name Validation', () => {
    it('should accept a valid project name', async () => {
      const mockArgs: Partial<CliArguments> = {
        projectName: 'test-project',
      };

      await runCli(mockArgs);
      expect(vi.mocked(scaffoldProject)).toHaveBeenCalledWith(
        expect.objectContaining({
          projectName: 'test-project',
        })
      );
    });

    describe('Package Manager Selection', () => {
      it('should accept pnpm as package manager', async () => {
        const mockArgs: Partial<CliArguments> = {
          projectName: 'test-project',
          packageManager: 'pnpm' as PackageManager,
        };

        await runCli(mockArgs);
        expect(vi.mocked(scaffoldProject)).toHaveBeenCalledWith(
          expect.objectContaining({
            packageManager: 'pnpm',
          })
        );
      });

      it('should accept npm as package manager', async () => {
        const mockArgs: Partial<CliArguments> = {
          projectName: 'test-project',
          packageManager: 'npm' as PackageManager,
        };

        await runCli(mockArgs);
        expect(vi.mocked(scaffoldProject)).toHaveBeenCalledWith(
          expect.objectContaining({
            packageManager: 'npm',
          })
        );
      });
    });

    describe('Module System Selection', () => {
      it('should accept ESM as module system', async () => {
        const mockArgs: Partial<CliArguments> = {
          projectName: 'test-project',
          moduleSystem: 'esm' as ModuleSystem,
        };

        await runCli(mockArgs);
        expect(vi.mocked(scaffoldProject)).toHaveBeenCalledWith(
          expect.objectContaining({
            moduleSystem: 'esm',
          })
        );
      });

      it('should accept CommonJS as module system', async () => {
        const mockArgs: Partial<CliArguments> = {
          projectName: 'test-project',
          moduleSystem: 'cjs' as ModuleSystem,
        };

        await runCli(mockArgs);
        expect(vi.mocked(scaffoldProject)).toHaveBeenCalledWith(
          expect.objectContaining({
            moduleSystem: 'cjs',
          })
        );
      });
    });

    describe('Optional Folders', () => {
      it('should accept multiple optional folders', async () => {
        const mockArgs: Partial<CliArguments> = {
          projectName: 'test-project',
          folders: ['config', 'util', 'lib'] as OptionalFolders[],
        };

        await runCli(mockArgs);
        expect(vi.mocked(scaffoldProject)).toHaveBeenCalledWith(
          expect.objectContaining({
            folders: ['config', 'util', 'lib'],
          })
        );
      });

      it('should handle empty folders array', async () => {
        const mockArgs: Partial<CliArguments> = {
          projectName: 'test-project',
          folders: [] as OptionalFolders[],
        };

        await runCli(mockArgs);
        expect(vi.mocked(scaffoldProject)).toHaveBeenCalledWith(
          expect.objectContaining({
            folders: [],
          })
        );
      });
    });

    describe('Git Initialization', () => {
      it('should handle git initialization option', async () => {
        const mockArgs: Partial<CliArguments> = {
          projectName: 'test-project',
          initGit: true,
        };

        await runCli(mockArgs);
        expect(vi.mocked(scaffoldProject)).toHaveBeenCalledWith(
          expect.objectContaining({
            initGit: true,
          })
        );
      });
    });
  });
});
