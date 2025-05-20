# 🤝 Contributing to NodeTSP

Thank you for considering contributing to NodeTSP! As a CLI tool for bootstrapping TypeScript projects, your contributions can help improve the development experience for many Node.js developers.

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

4. **Create a branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

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

1. **Update documentation** if you're changing functionality
2. **Add or update tests** for new features or bug fixes
3. **Ensure your code follows the project's style** by running formatting and linting
4. **Make atomic commits** with clear descriptive messages
5. **Write a detailed PR description** explaining:
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
