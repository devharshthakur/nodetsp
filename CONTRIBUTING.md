# 🤝 Contributing to NodeTSP

Thank you for your interest in contributing to NodeTSP! Your help makes this CLI better for everyone.

## 📦 Project Structure

This is a monorepo. Here's where to find things:

```
nodetsp/
├── packages/
│   └── cli/            # Main CLI implementation
│       ├── src/
│       │   ├── cli/         # CLI logic and entry points
│       │   ├── injectors/   # Service injectors (see injectors/README.md)
│       │   ├── store/       # CLI state management
│       │   ├── template/    # Project template files (add new templates here)
│       │   ├── types/       # TypeScript type definitions (see types/README.md)
│       │   └── utils/       # Utility functions
│       └── package.json
├── README.md           # Project overview and structure
└── ...
```

- **CLI code:** `packages/cli/src/cli`
- **Injectors:** `packages/cli/src/injectors` ([README](packages/cli/src/injectors/README.md))
- **Types:** `packages/cli/src/types` ([README](packages/cli/src/types/README.md))
- **Templates:** `packages/cli/src/template` (add new files here and access them from injectors)

## 🗣️ Before You Start

1. **Browse open issues** and find something you'd like to work on.
2. **Comment on the issue** to let maintainers know you're interested.
3. **Wait for a maintainer to assign you the issue** before starting work. This avoids duplicate efforts and ensures your work aligns with project goals.

## 🌱 Getting Set Up

1. **Fork the repository** and clone your fork:
   ```bash
   git clone https://github.com/your-username/nodetsp.git
   cd nodetsp
   ```
2. **Install dependencies:**
   ```bash
   pnpm install
   ```
3. **Create a branch for your work:**
   - Name your branch after the issue, e.g. `issue-123-fix-typo` or `issue-45-add-feature`
   ```bash
   git checkout -b issue-<number>-<short-description>
   ```
4. **Read the root `README.md` and the relevant subfolder READMEs** (especially about injectors and types) to understand the architecture and contribution guidelines.

## 🛠️ Development & Testing

- **All code should have proper JSDoc comments** to help other contributors understand your work.
- **Add new templates** in `packages/cli/src/template` and access them from your injector or CLI logic.
- **Run the format script before committing:**
  ```bash
  pnpm format
  ```
- **Use the `load` script for local testing:**
  This script will format, build, and link the CLI globally so you can test your changes as if you installed the CLI from npm.
  ```bash
  pnpm run load
  # Now you can run 'nodetsp' anywhere on your system
  ```

## 🚀 Making a Contribution

- **Push your branch to your fork** and open a pull request against the `main` branch of the original repository.
- **Describe your changes clearly** in the PR description, referencing the issue number.
- **Ensure your code is well-formatted and documented** (run `pnpm format` and use JSDoc).
- **If you add or change templates,** make sure they are in `src/template` and referenced correctly.

## 📝 Code Style

- Use TypeScript for all code.
- Use ESLint and Prettier (run `pnpm format` before committing).
- Write clear, descriptive commit messages.
- Add or update JSDoc comments for all exported functions, classes, and complex logic.

## 🐛 Bug Reports & Feature Requests

- For bugs, use the bug report template and provide as much detail as possible.
- For features, use the feature request template and explain the value to users.

## 📚 Resources

- [Root README](./README.md)
- [CLI README](./packages/cli/README.md)
- [Injectors README](./packages/cli/src/injectors/README.md)
- [Types README](./packages/cli/src/types/README.md)

## 📝 License

By contributing, you agree that your contributions will be licensed under the project's MIT License.
