# Contributing to cz-conventional-emoji

First off, thank you for considering contributing to cz-conventional-emoji! 🎉

[English](./CONTRIBUTING.md) | [简体中文](./CONTRIBUTING.zh-CN.md)

The following is a set of guidelines for contributing to this project. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Pull Requests](#pull-requests)
- [Development Setup](#development-setup)
- [Styleguides](#styleguides)
  - [Git Commit Messages](#git-commit-messages)
  - [JavaScript Styleguide](#javascript-styleguide)
- [Additional Notes](#additional-notes)

## Code of Conduct

This project and everyone participating in it is governed by common sense and mutual respect. Be kind, be professional, and be constructive.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the [existing issues](https://github.com/gaoac/cz-conventional-emoji/issues) to avoid duplicates.

When you create a bug report, please include as many details as possible:

- **Use a clear and descriptive title** for the issue
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** to demonstrate the steps
- **Describe the behavior you observed** and what you expected
- **Include screenshots or animated GIFs** if relevant
- **Describe your environment**:
  - Node.js version
  - npm/yarn/pnpm version
  - Operating system
  - Terminal/shell being used

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful** to most users
- **List any alternative solutions** you've considered

### Pull Requests

Please follow these steps:

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** with clear, descriptive commits
3. **Add tests** if you're adding functionality
4. **Ensure all tests pass** by running `pnpm test`
5. **Ensure code quality** by running `pnpm lint`
6. **Update documentation** as needed
7. **Submit your pull request**

#### Pull Request Guidelines

- Keep PRs focused on a single issue/feature
- Update the README.md if needed
- Add yourself to the contributors list if you'd like
- Be responsive to feedback and review comments
- Follow the existing code style

## Development Setup

### Prerequisites

- Node.js >= 16
- pnpm (recommended) or npm

### Setup Steps

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/cz-conventional-emoji.git
cd cz-conventional-emoji

# Install dependencies
pnpm install

# Run tests
pnpm test

# Run tests in watch mode
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run linter
pnpm lint

# Auto-fix linting issues
pnpm lint:fix

# Format code
pnpm format
```

### Project Structure

```
cz-conventional-emoji/
├── index.js              # Main entry point and configuration loader
├── engine.js             # Core prompt engine
├── index.d.ts            # TypeScript type definitions
├── engine.test.js        # Test suite
├── package.json          # Package configuration
├── .eslintrc.json        # ESLint configuration
├── .prettierrc           # Prettier configuration
├── vitest.config.js      # Vitest configuration
└── README.md             # Documentation
```

## Styleguides

### Git Commit Messages

**Use this tool to create your commits!** 😄

```bash
pnpm commit
# or
git cz
```

This project uses its own commitizen adapter. Your commits should follow the conventional commit format with gitmoji:

- ✨ `feat`: New features
- 🐛 `fix`: Bug fixes
- 📝 `docs`: Documentation changes
- 💄 `style`: Code style changes (formatting, etc.)
- ♻️ `refactor`: Code refactoring
- ⚡ `perf`: Performance improvements
- ✅ `test`: Adding or updating tests
- 🔧 `chore`: Maintenance tasks

### JavaScript Styleguide

We use ESLint to maintain code quality. Key points:

- Use single quotes for strings
- Use 2 spaces for indentation
- Add semicolons at the end of statements
- Use descriptive variable names
- Add comments for complex logic
- Keep functions focused and small

Run `pnpm lint` to check your code style, or `pnpm lint:fix` to auto-fix issues.

## Testing

We use Vitest for testing. Please ensure:

- All new features have corresponding tests
- All existing tests pass
- Aim for high test coverage (currently at ~81%)
- Tests are clear and well-documented

```bash
# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run tests with UI
pnpm test:ui
```

## Documentation

- Update README.md for user-facing changes
- Update README.zh-CN.md (Chinese version) as well
- Add JSDoc comments for new functions
- Update TypeScript definitions if needed

## Release Process

Releases are managed by the maintainers using `standard-version`:

```bash
# Bump version and generate changelog
pnpm release

# Or specify version
pnpm release-as -- --release-as minor
```

## Questions?

Feel free to open an issue with your question, or reach out to the maintainers:

- GitHub: [@gaoac](https://github.com/gaoac)
- Email: gaoac.snow@outlook.com

## License

By contributing to cz-conventional-emoji, you agree that your contributions will be licensed under its MIT License.

---

Thank you for contributing! 🚀

