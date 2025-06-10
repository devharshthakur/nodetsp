/**
 * This module provides functions to generate TypeScript configuration files
 * for different module systems (CommonJS and ESM). It includes methods to
 * create a TypeScript configuration file (tsconfig.json), a basic index.ts
 * file, and update the package.json file according to the selected module system.
 *
 * @module tsconfigSetup
 */

import fs from 'fs-extra';
import path from 'path';

type ModuleSystem = 'commonjs' | 'esm';

function getTsConfigCommonJS() {
  return {
    compilerOptions: {
      target: 'ES2024',
      module: 'CommonJS',
      moduleResolution: 'node',
      esModuleInterop: true,
      outDir: './dist',
      rootDir: './src',
      strict: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true,
      declaration: true,
    },
    include: ['src/**/*'],
    exclude: ['node_modules', 'dist', '**/*.test.ts'],
  };
}

function getTsConfigESM() {
  return {
    compilerOptions: {
      target: 'ES2024',
      module: 'NodeNext',
      moduleResolution: 'NodeNext',
      esModuleInterop: true,
      outDir: './dist',
      rootDir: './src',
      strict: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true,
      declaration: true,
    },
    include: ['src/**/*'],
    exclude: ['node_modules', 'dist', '**/*.test.ts'],
  };
}

export async function generateTsConfig(projectPath: string, moduleSystem: ModuleSystem): Promise<void> {
  const tsconfig = moduleSystem === 'commonjs' ? getTsConfigCommonJS() : getTsConfigESM();

  await fs.writeJSON(path.join(projectPath, 'tsconfig.json'), tsconfig, {
    spaces: 2,
  });

  // Create a basic index.ts file
  const srcDir = path.join(projectPath, 'src');
  await fs.ensureDir(srcDir);

  const indexContent =
    moduleSystem === 'commonjs'
      ? `console.log('Hello from TypeScript with CommonJS!');\n`
      : `console.log('Hello from TypeScript with ESM!');\n`;

  await fs.writeFile(path.join(srcDir, 'index.ts'), indexContent);

  // Update package.json acc to moduleSystem selected
  const packageJsonPath = path.join(projectPath, 'package.json');
  const packageJson = await fs.readJSON(packageJsonPath);

  if (moduleSystem === 'esm') {
    packageJson.type = 'module';
  }

  packageJson.scripts = {
    build: 'tsc',
    dev: 'tsc --watch',
    start: 'node dist/index.js',
    lint: 'eslint src --ext .ts',
    format: 'prettier --write "src/**/*.ts"',
    ...packageJson.scripts,
  };

  await fs.writeJSON(packageJsonPath, packageJson, { spaces: 2 });
}
