# 🤝 Contributing to NodeTSP

Thank you for considering contributing to NodeTSP! As a CLI tool for bootstrapping TypeScript projects, your contributions can help improve the development experience for many Node.js developers.

## 🔐 Branch Management

**Important: The `main` branch is read-only.** Only repository maintainers can push final changes to the main branch. Contributors should:

1. Always create feature branches from the `dev` branch (which is used for active development)
2. Develop in your feature branch (`feature/your-feature`) within your forked repository
3. Combine and merge your changes to your forked `dev` branch before submitting a PR
4. Create pull requests from your forked `dev` branch to the original repository's `dev` branch

This creates a single, clean commit for approval (in case multiple codechanges/commits) and helps maintain stability in the main codebase.

## 🧩 Role Assignment

Before starting work on any feature or bug fix:

1. **Always assign yourself a role** by commenting on the relevant issue
2. If no issue exists, create one first describing the change you want to make
3. Wait for maintainer approval before beginning significant work
4. Discuss your implementation approach in the issue conversation

This prevents duplicate efforts and ensures your contribution aligns with the project's direction.

## 🚀 Getting Started

1. **Fork the repository**

2. **Clone your fork**

   ```bash
   git clone https://github.com/your-username/nodetsp.git
   cd nodetsp
   ```

3. **Install dependencies**

   ```bash
   pnpm install
   ```

4. **Set up your branches**

   ```bash
   # Ensure you have the latest dev branch
   git checkout dev
   git pull origin dev

   # Create your feature branch from dev
   git checkout -b feature/amazing-feature
   ```

   **Important**: Always create feature branches from `dev`, not from `main`.

## 💻 Development Workflow

### Project Structure

```
nodetsp/
├── src/               # Source code
│   ├── index.ts       # Entry point
│   ├── cmd/           # Command implementations
│   └── utils/         # Utility functions and helpers
├── test/              # Test files
├── dist/              # Compiled output (generated)
└── ...                # Config files
```

### Building the project

```bash
pnpm build
```

### Testing locally

To test your changes locally, you can use the following commands:

```bash
# Link the package globally
pnpm link --global

# Run the CLI with your changes
nodetsp init
```

### Code Style

This project uses:

- TypeScript for type safety
- ESLint for linting
- Prettier for code formatting

To ensure your code meets the project standards:

```bash
# Format code
pnpm format

# Check formatting
pnpm format:check

# Lint code
pnpm lint

# Fix linting issues
pnpm lint:fix
```

## 📋 Pull Request Process

1. **Create pull requests against the `dev` branch**, not main
2. **Update documentation** if you're changing functionality
3. **Add or update tests** for new features or bug fixes
4. **Ensure your code follows the project's style** by running formatting and linting
5. **Make atomic commits** with clear descriptive messages
6. **Write a detailed PR description** explaining:
   - What changes you've made
   - Why you've made them
   - How they impact users
   - Any testing you've performed

## 🐛 Bug Reports

If you find a bug in NodeTSP, please create an issue using the bug report template with:

- A clear title and description
- CLI command and options used
- Steps to reproduce the bug
- Expected and actual behavior
- Screenshots if applicable
- Your environment details:
  - NodeTSP version
  - Node.js version
  - OS details
  - Package manager (npm/pnpm) and version

## ✨ Feature Requests

Feature requests are welcome! Please use the feature request template and provide:

- A clear description of the feature
- Why it would be valuable to NodeTSP users
- Any implementation ideas you have
- How it fits with NodeTSP's goal of streamlining TypeScript project creation

## 📝 License

By contributing, you agree that your contributions will be licensed under the project's MIT License.
