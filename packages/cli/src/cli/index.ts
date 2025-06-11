import { CliArguments } from '@/types/cliArgs.js';
import { intro, isCancel, outro, select, text } from '@clack/prompts';
import color from 'picocolors';

export async function runCli(cliArgs: Partial<CliArguments> = {}) {
  console.clear();
  intro(color.bgCyan('Nodetsp CLI'));

  // Project Name
  const projectName = cliArgs.projectName
    ? console.clear()
    : await text({
        message: 'What will your project named',
        placeholder: 'my-app',
        validate: value => {
          if (!value) return 'Please enter a project name';
          if (value.length > 30) return 'Project name must be less than 50 characters';
          return;
        },
      });
}
