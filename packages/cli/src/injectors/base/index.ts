import { OptionalFolders } from '@/types/folders.js';
import { Injector } from '@/types/injector.js';
import { PackageManager } from '@/types/packageManager.js';
import path from 'path';
import fs from 'fs-extra';
import { createFile, readFile } from '@/utils/filesystem.js';
import { ModuleSystem } from '@/types/moduleSystem.js';
import { fileURLToPath } from 'url';
import { creatFolder } from '@/utils/filesystem.js';
import { readJSON } from '@/utils/filesystem.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class BaseInjector implements Injector {
  folders: OptionalFolders[];
  packageManager: PackageManager;
  projectName: string;
  moduleSystem: ModuleSystem;
  shouldInitGit: boolean;

  constructor(
    folders: OptionalFolders[],
    packageManager: PackageManager,
    projectName: string,
    moduleSystem: ModuleSystem,
    InitGit: boolean
  ) {
    this.folders = folders;
    this.packageManager = packageManager;
    this.projectName = projectName;
    this.moduleSystem = moduleSystem;
    this.shouldInitGit = InitGit;
  }

  async createPackageJson() {
    const templatePath = path.join(__dirname, '../../template/base', 'package.json');
    const template = await readJSON(templatePath);
    const packageJson = {
      ...template,
      name: this.projectName,
      type: this.moduleSystem === 'esm' ? 'module' : 'commonjs',
    };
    await createFile('package.json', JSON.stringify(packageJson, null, 2));
  }

  async createTsConfig() {
    const templatePath = path.join(__dirname, '../../template/base', `tsconfig.${this.moduleSystem}.json`);
    const tsconfig = await readJSON(templatePath);
    await createFile('tsconfig.json', JSON.stringify(tsconfig, null, 2));
  }

  async createPrettier() {
    const prettierRcPath = path.join(__dirname, '../../template/base', '.prettierrc');
    const prettierIgnorePath = path.join(__dirname, '../../template/base', '.prettierignore');

    const prettierRc = await readJSON(prettierRcPath);
    const prettierIgnore = await readFile(prettierIgnorePath);

    await createFile('.prettierrc', JSON.stringify(prettierRc, null, 2));
    await createFile('.prettierignore', prettierIgnore);
  }

  async createProjectFolder() {
    await fs.ensureDir(this.projectName);
    process.chdir(this.projectName);
  }

  async createOptionalFolders() {
    await fs.ensureDir('src');
    for (const folder of this.folders) {
      await creatFolder(path.join('src', folder), '');
    }
    const indexFilePath = path.join(__dirname, '../../template/base', 'index.ts');
    const indexFile = await readFile(indexFilePath);
    await createFile('src/index.ts', indexFile);
  }

  async inject() {
    await this.createProjectFolder();
    await this.createOptionalFolders();
    await this.createPackageJson();
    await this.createTsConfig();
    await this.createPrettier();
  }
}
