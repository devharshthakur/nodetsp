import fs from 'fs-extra';
import path from 'path';

/**
 * Generates README markdown content for a new project
 * @param projectName - The name of the project
 * @param packageManager - The package manager to use in examples
 * @returns Markdown string with project documentation
 */
export function createProjectReadme(projectName: string, packageManager: string): string {
  return `# ${projectName} 🚀

## 📝 Description

A modern TypeScript Node.js project created with nodetsp CLI.

## 🛠️ Installation

\`\`\`bash
# Install dependencies
${packageManager} install
\`\`\`

## 💻 Development

\`\`\`bash
# Start development server with hot-reload
${packageManager} dev
\`\`\`

## 📦 Building for production

\`\`\`bash
# Compile TypeScript to JavaScript
${packageManager} build
\`\`\`

## 🚀 Running in production

\`\`\`bash
# Run the compiled application
${packageManager} start
\`\`\`

## 📄 License

MIT

---

<div align="center">
  <sub>Built using nodetsp CLI</sub>
</div>
`;
}

/**
 * Creates a README.md file for a new project
 * @param projectPath - The path to the project directory
 * @param projectName - The name of the project
 * @param packageManager - The package manager to use in examples (npm, pnpm)
 */
export async function setupReadme(projectPath: string, projectName: string, packageManager: string): Promise<void> {
  const readmeContent = createProjectReadme(projectName, packageManager);
  await fs.writeFile(path.join(projectPath, 'README.md'), readmeContent);
}
