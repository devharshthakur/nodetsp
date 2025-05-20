# 🚀 NodeTSP

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

A CLI tool to create TypeScript projects that use Node.js as runtime.

## ✨ Features

- 📦 Modern TypeScript setup with ESM support
- 🛠️ Pre-configured ESLint and Prettier
- 🔄 Git initialization and basic setup
- 📁 Customizable folder structure
- 📝 Comprehensive scaffolding

## 📋 Prerequisites

- Node.js (>= 16.x)
- npm or pnpm

## 🚀 Installation

```bash
# Using npm
npm install -g nodetsp

# Using pnpm
pnpm add -g nodetsp
```

## 💻 Usage

```bash
# Create a new TypeScript project
nodetsp init

# Specify package manager
nodetsp init --package-manager pnpm
```

## 🔧 Options

| Option                            | Description                          | Default |
| --------------------------------- | ------------------------------------ | ------- |
| `-p, --package-manager <manager>` | Package manager to use (npm or pnpm) | npm     |
| `-v, --version`                   | Show version number                  | -       |
| `-h, --help`                      | Show help                            | -       |

## 📚 Project Structure

When you create a new project with NodeTSP, it will generate a structure like:

```
my-project/
├── src/
│   └── index.ts
├── dist/
├── .eslintrc.js
├── .prettierrc
├── .gitignore
├── tsconfig.json
└── package.json
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for how to get started.

## 📝 License

This project is [MIT](LICENSE) licensed.
