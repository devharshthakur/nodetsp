# NodeTSP CLI (`packages/cli`)

This folder contains the main CLI implementation for NodeTSP.

## Folder Structure

```
cli/
├── src/
│   ├── cli/         # CLI logic and entry points
│   ├── injectors/   # Service injectors (see injectors/README.md)
│   ├── store/       # CLI state management
│   ├── template/    # Project template files
│   ├── types/       # TypeScript type definitions (see types/README.md)
│   └── utils/       # Utility functions
├── package.json
├── README.md        # (You are here)
└── ...
```

- **CLI Entrypoint:** `src/cli/index.ts`
- **Scaffolding Logic:** `src/cli/scaffold.ts`
- **Type Definitions:** [`src/types`](./src/types) ([README](./src/types/README.md))
- **Injectors:** [`src/injectors`](./src/injectors) ([README](./src/injectors/README.md))

## Running & Developing Locally

```bash
pnpm install
pnpm run build
pnpm link --global # Makes the CLI available as 'nodetsp' on your system
```

You can now use `nodetsp` from anywhere on your machine for local development.

## About Injectors

Injectors are modular classes that set up (inject) different services (base files, git, etc.) in a new project. See [`src/injectors/README.md`](./src/injectors/README.md) for details on how to add or modify injectors.

## About Types

All shared and core type definitions are in [`src/types`](./src/types). See [`src/types/README.md`](./src/types/README.md) for details.

---

> For general usage, see the [root README](../../README.md).
