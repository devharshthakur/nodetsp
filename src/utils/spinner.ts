/**
 * Spinner utility functions for creating and managing task spinners.
 * @module spinner
 */

import ora, { Ora } from 'ora';
import chalk from 'chalk';

export function createSpinner(text: string): Ora {
  return ora({
    text,
    color: 'blue',
  });
}

interface Task {
  title: string;
  task: () => Promise<void>;
}

/**
 * Creates a list of tasks and executes them sequentially, displaying a spinner for each task.
 *
 * @param {Task[]} tasks - An array of tasks to execute.
 * @returns {Promise<void>} A promise that resolves when all tasks are completed.
 */
export function createTaskList(tasks: Task[]): Promise<void> {
  if (!tasks.length) {
    return Promise.resolve();
  }

  const spinner = createSpinner(tasks[0]!.title);

  return new Promise((resolve, reject) => {
    const runTasks = async () => {
      try {
        spinner.start();
        for (const { title, task } of tasks) {
          spinner.text = title;
          await task();
          spinner.succeed(chalk.green(title));
        }
        resolve();
      } catch (error) {
        const err = error as Error;
        spinner.fail(chalk.red(`Failed: ${err.message}`));
        reject(error);
      }
    };

    // Start the tasks
    runTasks();
  });
}
