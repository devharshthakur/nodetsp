#!/usr/bin/env node

import { Command } from 'commander';
import packageJson from '../package.json' with { type: 'json' };
import { init } from '@/cli/init.js';
import { cliContext } from '@/utils/context.js';

const program = new Command();

program
  .name('nodetsp')
  .description('Bootstraps a typescript project which uses nodejs as runtime')
  .version(packageJson.version);

program
  .command('init [name]')
  .description('Initialize a new nodejs based typescript project')
  .option('-p, --package-manager <manager>', 'package manager to use (npm or pnpm)')
  .option('-m, --module-system <system>', 'module system to use (esm or commonjs)')
  .option('-f, --folders <folders>', 'additional folders to create (comma-separated: lib,utils,config,types,tests)')
  .option('-g, --git', 'initialize git repository')
  .action((name, options) => {
    cliContext.setOptions({
      name,
      packageManager: options.packageManager,
      moduleSystem: options.moduleSystem,
      folders: options.folders ? options.folders.split(',') : undefined,
      initGit: options.git,
    });

    init();
  });

program.parse();
