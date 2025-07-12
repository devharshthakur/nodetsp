# `@/injectors` Folder

This folder contains all injector classes for the Nodetsp CLI. Injectors are responsible for setting up specific services or features (like base files, Git, etc.) in a new project.

## What is an Injector?

The term "injector" here is inspired by the concept of dependency injection in frameworks like NestJS, but it is not the same. In this project, an **injector** is a class that implements the `Injector` interface (i.e., it must have an `inject()` method). Each injector class contains a set of methods that perform various operations to set up or "inject" a particular service (such as base files, Git, etc.) into the project.

The key method is always `inject()`, which calls those internal methods in the correct sequence to fully set up the service. The `inject()` method is required by the `Injector` interface and acts as the entry point for the injection process.

**Important:**

- The injector itself is responsible for deciding whether to perform its injection or skip it, based on the options passed to its constructor. This means in `scaffold.ts`, all injectors are always instantiated and their `inject()` methods are called, but each injector checks the options and decides if it should actually do anything.
- This design keeps the orchestration in `scaffold.ts` simple and delegates the logic for skipping or running to each injector.

### Example Injectors

- **Base Injector**: Sets up essential files (e.g., `package.json`, `tsconfig.json`, Prettier config, etc.). This must always be injected first, so the minimum project structure exists before any other setup.
- **Git Injector**: Sets up Git, creates `.gitignore`, and makes the initial commit. This must always be injected last, so the initial commit contains the complete project.
- Other injectors (e.g., for ESLint, testing, etc.) should be injected between base and git.

## Folder Structure

- `base/` — Contains the BaseInjector for core project setup
- `git/` — Contains the GitInjector for Git integration
- (Add more folders for additional injectors/services)

## Adding a New Injector

1. Create a new folder named after the service.
2. Add an `index.ts` file and implement a class that implements the `Injector` interface.
3. Implement the `inject()` method and any setup helpers. The `inject()` method should check the options passed to the constructor and decide whether to run or skip.
4. In `scaffold.ts`, instantiate and call your injector's `inject()` method in the correct order:
   - **Base injector first**
   - **Other injectors next**
   - **Git injector last**

> **Tip:** See the `base` and `git` injectors for examples of structure, service opt-out handling, and correct ordering.

> **Note:** Injectors make it easy to extend the CLI with new features and keep setup logic modular and maintainable. Always ensure the base injector runs first and the git injector runs last for a correct project scaffold.
