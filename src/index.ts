import { Command } from 'commander';
import packageJson from '../package.json' with { type: 'json' };
import { init } from './cmd/init.js';
const program = new Command();

program
  .name('nodetsp')
  .description('Bootstraps a typescript project which uses nodejs as runtime')
  .version(packageJson.version);

program
  .command('init')
  .description('Initialize a new nodejs based typescript project')
  .option('-p, --package-manager <manager>', 'package manager to use (npm or pnpm)', 'npm')
  .action(init);

program.parse();
