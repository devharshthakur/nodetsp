import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { readdir } from "node:fs/promises";
import { execSync } from "node:child_process";

export async function copyTemplateFiles(
  sourceDir: string,
  targetDir: string,
  replacements: { projectName: string; packageManager: string }
): Promise<void> {
  const entries = await readdir(sourceDir, { withFileTypes: true });

  // Create target directory if it doesn't exist
  await mkdir(targetDir, { recursive: true });

  for (const entry of entries) {
    const sourcePath = join(sourceDir, entry.name);
    const targetPath = join(targetDir, entry.name);

    if (entry.isDirectory()) {
      await copyTemplateFiles(sourcePath, targetPath, replacements);
    } else if (entry.isFile()) {
      const content = await readFile(sourcePath, "utf-8");
      const replacedContent = replacePlaceholders(content, replacements);
      await writeFile(targetPath, replacedContent, "utf-8");
    }
  }
}

export function replacePlaceholders(
  content: string,
  replacements: { projectName: string; packageManager: string }
): string {
  let result = content;

  // Replace project name placeholder
  result = result.replace(/my-app/g, replacements.projectName);
  return result;
}

export function initGit(projectDir: string): void {
  execSync("git init -b main", {
    cwd: projectDir,
    stdio: "pipe",
  });
  // add all files to git
  execSync("git add .", {
    cwd: projectDir,
    stdio: "pipe",
  });
  // commit files
  execSync("git commit -m 'Initial commit'", {
    cwd: projectDir,
    stdio: "pipe",
  });
}

export function getInstallCommand(packageManager: string): string {
  switch (packageManager) {
    case "pnpm":
      return "pnpm install";
    case "yarn":
      return "yarn install";
    case "npm":
    default:
      return "npm install";
  }
}
