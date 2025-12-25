import type { ProjectConfig } from "@/types";
import { mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import { copyTemplateFiles, getInstallCommand, initGit } from "../util";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const templatesDir = join(__dirname, "..", "..", "templates");

export async function scaffold(projectConfig: ProjectConfig): Promise<void> {
  const { name, tooling, moduleSystem, folders, packageManager, installDeps } =
    projectConfig;

  const templateDir = join(templatesDir, tooling, moduleSystem);
  const projectDir = join(process.cwd(), name);

  // Copy template files to project directory
  await copyTemplateFiles(templateDir, projectDir, {
    projectName: name,
    packageManager,
  });

  // Create optional folders in src/
  if (folders && folders.length > 0) {
    const srcDir = join(projectDir, "src");
    for (const folder of folders) {
      const folderPath = join(srcDir, folder);
      await mkdir(folderPath, { recursive: true });
    }
  }

  // Setup git repository
  initGit(projectDir);

  // Install dependencies if requested
  if (installDeps) {
    const installCommand = getInstallCommand(packageManager);
    execSync(installCommand, {
      cwd: projectDir,
      stdio: "pipe",
    });
  }
}
