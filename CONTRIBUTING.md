# Contributing

Hi! Thanks for your interest in contributing to nodetsp. This is a hobby
project of mine, and I'm excited that you're considering helping out.

This was essentialy a complete rewrite you could find the old project [here](https://github.com/devharshthakur/nodetsp-depreciated.git). Basicaly i stripped out many things (injectors), make it more simple. This projects is basicaly just copies pre-made templates, removed support for cli args for now as it will not affect DX that much for our use case. It is planned to be implemented later.

## Getting Started

I don't have a formal/complex contribution process, but here's what works for me:

1. Fork the repository
2. Create a branch for your changes (follow naming conventions below)
3. Make your changes (follow commit message conventions below)
4. Submit a pull request (follow PR title conventions below)

I'll review it when I can - keep in mind that this isn't my full-time job,
so response times may vary.

> Note: I'm planning to add PR templates soon to make the process more
> structured and easier for both of us.

## What I'm Looking For

I'm open to all kinds of contributions:

- Bug fixes
- New features (especially templates!)
- Documentation improvements
- Bug reports
- Feature requests

## Development Setup

```bash
# Clone your fork
git clone https://github.com/devharshthakur/nodetsp.git
cd nodetsp

# Install dependencies
pnpm install

# Build the CLI
pnpm build

# Build and link it glablly for testing
pnpm load
```
## Naming Conventions

### Branch Names

Use conventional commit format for branch names:

- `feat/feature-name` - for new features
- `fix/bug-description` - for bug fixes
- `docs/update-description` - for documentation changes
- `refactor/cleanup-description` - for refactoring

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

### PR Titles

Follow the same conventional commit format as commit messages:

- `feat(cli): add new template option`
- `fix(scaffold): resolve template copying issue`

## Submitting Changes

When you open a PR, please include:

### PR Description

- **Clear description**: What you changed and why
- **Problem statement**: What issue you're solving (if applicable)
- **Testing steps**: How to test your changes
- **Screenshots**: For UI changes if applicable
- **Breaking changes**: Any breaking changes and how to handle them

### Commit Guidelines

- **Small, focused commits**: Each commit should address one logical or a small change
- **Clear commit messages**: Follow the conventional commit format above
- **No large commits**: I won't review PRs with large, monolithic commits

### Code Quality

- **Follow existing patterns**: Look at similar code in the codebase
- **Update docs**: Update README or other documentation if needed

### Review Process

- I'll review your PR when I have time
- I may ask for changes or clarification
- Be patient - this is a hobby project, not my full-time job
- I'll help with formatting if something doesn't follow conventions

Don't worry too much about following strict conventions - I'm flexible and
will help with formatting if needed.

## Questions?

If you have questions about the project or how to contribute, feel free to
open an issue or reach out. I'm happy to help!

Thanks again for your interest in contributing to my project.
