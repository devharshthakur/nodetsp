import { execSync } from "node:child_process";
import readline from "node:readline/promises";

export function logInfo(message) {
  console.log(`[INFO] ${message}`);
}

export function logError(message) {
  console.error(`[ERROR] ${message}`);
}

export function runCommand(command, options = {}) {
  const { cwd = process.cwd() } = options;

  try {
    execSync(command, { stdio: "inherit", cwd });
  } catch (error) {
    logError(`Command failed: ${command}`);
    throw error;
  }
}

export async function prompt(question, options = {}) {
  const { defaultAnswer } = options;
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    const answer = await rl.question(question);
    return answer.trim();
  } finally {
    rl.close();
  }
}

export async function confirmYes(message = "Confirm by typing 'yes': ") {
  const answer = await prompt(message);
  return answer.toLowerCase() === "yes";
}
