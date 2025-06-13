#!/usr/bin/env node

import { Command } from 'commander';
import packageJson from '../package.json' with { type: 'json' };
import { CliArgsStore } from '@/store/cliStore.js';
import { runCli } from './cli/index.js';

const program = new Command();
const cliArgsStore = new CliArgsStore();

program
  .name('nodetsp')
  .description('Bootstraps a typescript project which uses nodejs as runtime')
  .version(packageJson.version);

program
  .command('init [name]')
  .description('Initialize a new nodejs based typescript project')
  .option('-p, --pm <manager>', 'package manager to use (npm or pnpm)')
  .option('-m, --ms <system>', 'module system to use (esm or commonjs)')
  .option('-f, --fd <folders>', 'additional folders to create (comma-separated: lib,utils,config,types,tests)')
  .option('-g, --git', 'initialize git repository')
  // Here cli arguments are passed(saved) in the store if provided by the users otherwise all options are shows (check runCLI)
  .action((projectName, args) => {
    cliArgsStore.setArgs({˝
      projectName,
      packageManager: args.pm,
      moduleSystem: args.ms,
      folders: args.fd ? args.fd.split(',') : undefined,
      initGit: args.git,
    });
    runCli(cliArgsStore.getArgs());
  });

program.parse();
