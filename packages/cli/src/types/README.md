injei# `@/types` Folder

This folder contains all the TypeScript type definitions and type utilities used throughout the CLI codebase. Centralizing type definitions here ensures type safety, maintainability, and consistency across the project.

## Contents

- **cliArgs.ts**: Defines interfaces for CLI arguments and project options, such as `CliArguments` and `ProjectOptions`.
- **folders.ts**: Contains the `OptionalFolders` type, representing the optional folders that can be created in a project scaffold.
- **injector.ts**: Declares the `Injector` interface, which standardizes the contract for all injector classes.
- **moduleSystem.ts**: Defines the `ModuleSystem` type, representing supported module systems (`cjs` or `esm`).
- **packageManager.ts**: Defines the `PackageManager` type, representing supported package managers (`npm` or `pnpm`).

## Purpose

- **Type Safety**: Ensures all parts of the CLI use consistent and strict types.
- **Maintainability**: Centralizes type changes, making it easier to update and refactor.
- **Documentation**: Serves as a reference for the structure and expected values of core data used in the CLI.

---

> **Note:** Always update or add type definitions here when introducing new features or refactoring existing ones.
