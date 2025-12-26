# nodetsp

A CLI tool for quickly scaffolding TypeScript projects. Bun init but for nodejs, simple, elegant and have only what you need.

## Usage

Create a new TypeScript project:

```bash
npx nodetsp init
```

## Options provided by the cli

1. **Project name** - Name of your project (default: my-app)
2. **Package manager** - Choose between pnpm, npm, or yarn
3. **Tooling** - Choose between tsc or swc (fast rust-based compiler)
4. **Module system** - Choose between esm or cjs
5. **Folders** - Select optional folders: config, lib, types, utils
6. **Install dependencies** - Whether to install dependencies after setup

> Note
> Git will be initialized with an initial commit by default.

## License

This project is licensed under the MIT License.
