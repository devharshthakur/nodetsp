## @cli

This folder contains the **`CLI`** implementation.

## Project structure

```text
cli/
├── src/
│   ├── index.ts                  # CLI entry point / command wiring
│   ├── lib/
│   │   ├── cli.ts               # Interactive prompts + input validation
│   │   └── scaffold.ts          # Scaffolding flow (templates → files → setup)
│   ├── util/
│   │   └── index.ts             # Shared helpers (fs, git, package managers)
│   └── types/
│       └── index.ts             # Shared TypeScript types
├── scripts/
│   └── postbuild.js             # Runs after build (e.g. copies templates)
├── templates/                    # Project templates
├── package.json
├── tsconfig.json
└── README.md
```

## How the code is organized

The CLI starts in `src/index.ts`, where commands are registered using `commander`. The main command users run is `nodetsp init`.

User interaction lives in `src/lib/cli.ts`. It uses `@clack/prompts` to collect choices like project name, package manager, tooling, module system, and whether to install dependencies. Cancellations and invalid input are handled there so scaffolding only starts with confirmed answers.

The actual generation happens in `src/lib/scaffold.ts`. Based on the selected tooling and module system, it picks a template, copies it into the target directory, replaces the `my-app` placeholder with the chosen project name, creates any optional folders under `src/`, and can also initialize git and install dependencies depending on what the user selected.

Common helpers are grouped in `src/util/index.ts` (file operations, placeholder replacement, git init, and figuring out the right install command). Shared types used across the CLI live in `src/types/index.ts`.

## Templates

Templates are split by compiler and module system:

```text
templates/
├── tsc/
│   ├── esm/
│   └── cjs/
└── swc/
    ├── esm/
    └── cjs/
```

When editing templates, keep using the `my-app` placeholder where you want the project name to be substituted automatically.

## Build and local testing

The CLI is bundled with **tsdown**. After compilation, `scripts/postbuild.js` runs to do build-time copying (for example, ensuring templates are available in the final output).

To test locally:

```bash
pnpm run load
nodetsp init
```

If you already have `nodetsp` installed globally, unlink/remove it first so you’re testing the local version.

## Notes

For colored terminal output, the codebase uses `picocolors`:

```ts
import colors from "picocolors";

console.log(colors.greenBright("Success"));
```

## Contributing / License

For contribution guidelines, see [CONTRIBUTING.md](../CONTRIBUTING.md).  
Licensed under the MIT License.
