# NodeTSP

> **Kickstart your Node.js + TypeScript projects with zero configuration.**

[![npm version](https://img.shields.io/badge/version-2.0.0-green.svg?style=flat-square)](https://www.npmjs.com/package/nodetsp) [![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE) [![Node.js ≥16.x](https://img.shields.io/badge/node-%3E=16.x-brightgreen.svg?style=flat-square)](https://nodejs.org/) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)


## 📋 Overview

**NodeTSP** is a CLI scaffolding tool that automates the setup of Node.js projects with TypeScript, ESLint, Prettier, and Git. Spend less time on boilerplate and more time writing code.

## ✨ Features

- 🚀 Full ESM & modern TypeScript support
- 🧹 Pre-configured ESLint & Prettier for consistent style
- 🔄 Automatic Git repository initialization
- 📁 Customizable folder structure
- 🛠️ One-command project scaffolding

## 📦 Installation

```bash
npm install -g nodetsp
# or
pnpm add -g nodetsp
```

## 🚀 Quick Start

```bash
# Create a new project to start the cli prompts
nodetsp init

# Choose pnpm instead of npm
nodetsp init my-project --pm pnpm

# Use CommonJS and create extra folders
nodetsp init my-project \
  --ms cjs \
  --fd utils,types \
  --git

# Non-interactive (all options in one go)
nodetsp init my-project \
  --pm pnpm \
  --ms esm \
  --fd lib,utils,config,types \
  --git
```

## 📋 CLI Options

| Option                  | Description                                                   | Default    |
|------------------------|---------------------------------------------------------------|------------|
| `-p, --pm <manager>`   | Package manager: `npm` or `pnpm`                              | `npm`      |
| `-m, --ms <system>`    | Module system: `esm` or `cjs`                                 | `esm`      |
| `-f, --fd <folders>`   | Comma-separated extra folders: `lib,utils,config,types`        | none       |
| `-g, --git`            | Initialize a Git repository                                   | `false`    |
| `-v, --version`        | Display version                                               | —          |
| `-h, --help`           | Show help                                                     | —          |

> **Note:**
> The CLI uses the following flags:
> - `-p, --pm` for package manager (e.g., `--pm pnpm`)
> - `-m, --ms` for module system (e.g., `--ms esm` or `--ms cjs`)
> - `-f, --fd` for folders (e.g., `--fd lib,utils`)
> - `-g, --git` to initialize a git repository
> The long flags are two characters, not full words.

## 📂 Generated Project Structure

```
my-project/
├── src/
│   └── index.ts
├── dist/
├── .prettierrc
├── .gitignore
├── tsconfig.json
└── package.json
```

## 🛠️ Local Development

To contribute or run the CLI locally:

```bash
cd packages/cli
pnpm install
pnpm run build
pnpm link --global # Makes the CLI available as 'nodetsp' on your system
```

## 👥 Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) before opening an issue or pull request.

## 🔒 License

This project is licensed under the [MIT License](LICENSE).
