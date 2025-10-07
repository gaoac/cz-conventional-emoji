# cz-conventional-emoji

A commitizen adapter with emoji that follows conventional-changelog.

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

[![NPM](https://nodei.co/npm/cz-conventional-emoji.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/cz-conventional-emoji/)

English | [简体中文](./README.zh-CN.md)

```
 Select the type of change that you're committing: (Use arrow keys)
❯ ✨  feat:              Introduce new features
  🐛  fix:               Fix a bug
  📝  docs:              Add or update documentation
  💄  style:             Add or update the UI and style files
  ♻️  refactor:          Refactor code
  ⚡  perf:              Improve performance
  ✅  test:              Add, update, or pass tests
  🏗️  build:             Make architectural changes
  👷  ci:                Add or update CI build system
  ✏️  chore:             Fix typos
  ⏪  revert:            Revert changes
(Move up and down to reveal more choices)
```

## About This Fork

This project is a fork of [cz-conventional-changelog](https://github.com/commitizen/cz-conventional-changelog) with the following enhancements:

- **Enhanced Gitmoji Support**: Improved gitmoji integration with better alignment and spacing
- **Fixed Emoji Rendering**: Resolved Variation Selector-16 issues that caused terminal spacing problems
- **Better Type Sorting**: Reordered commit types to match conventional-commit-types standards
- **Improved Alignment**: Fixed description text alignment for better visual consistency
- **Gitmoji Enabled by Default**: Use emoji commits out of the box after installation, no additional configuration needed
- **standard-version Compatible**: Commit message format adjusted to `type(scope): emoji subject` to ensure full compatibility with standard-version

All original features are preserved while adding these improvements for a better user experience.

## Commit Message Format

To ensure compatibility with tools like standard-version, the commit message format has been adjusted to:

```
type(scope): emoji subject
```

**Format Explanation:**
- `type`: Commit type (feat, fix, docs, etc.)
- `scope`: Optional scope
- `emoji`: Corresponding gitmoji emoji
- `subject`: Short description

This format ensures:
1. **Standard Compatibility**: Type at the beginning of the message, conforming to conventional commit specifications
2. **Tool Support**: Can be correctly recognized by tools like standard-version, commitlint, etc.
3. **Visual Appeal**: Still retains the visual cue function of emoji

## Installation

We assume you have already installed [Commitizen](https://github.com/commitizen/cz-cli).

### Global

```
yarn global add cz-conventional-emoji
# OR
# npm install --global cz-conventional-emoji

# Set global default adapter
echo '{ "path": "cz-conventional-emoji" }' > ~/.czrc
```

### Local

```
yarn add cz-conventional-emoji
# OR
# npm install --save-dev cz-conventional-emoji

# Set default adapter for your project
"config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-emoji"
    },
  }
```

## Usage

When you need to commit, simply use "git cz" instead of "git commit". See the [Commitizen](https://github.com/commitizen/cz-cli) official documentation for more information.

### Disable Gitmoji Mode

If you don't want to use emoji, you can disable it in the following ways:

**Global Configuration**
```bash
echo '{ "path": "cz-conventional-emoji", "useGitmoji": false }' > ~/.czrc
```

**Project Configuration**
```json5
{
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-emoji",
      "useGitmoji": false
    }
  }
}
```

**Environment Variable**
```bash
CZ_USE_GITMOJI=false git cz
```

## Common Gitmoji Types

| Emoji | Type Name | Description |
|-------|-----------|-------------|
| ✨ | `feat` | Introduce new features |
| 🐛 | `fix` | Fix a bug |
| 📝 | `docs` | Add or update documentation |
| 💄 | `style` | Add or update UI and style files |
| ♻️ | `refactor` | Refactor code |
| ⚡ | `perf` | Improve performance |
| ✅ | `test` | Add, update, or pass tests |
| 🏗️ | `build` | Add or update build system |
| 👷 | `ci` | Add or update CI configuration |
| ✏️ | `chore` | Fix typos |
| ⏪ | `revert` | Revert changes |

## Examples

### Gitmoji Mode (Default)

```bash
feat(api): ✨ add user authentication endpoint

Add OAuth2 authentication support for Google and GitHub providers.
Includes user profile management and token refresh functionality.

Closes #123
```

### Traditional Mode

```bash
feat(api): add user authentication endpoint

Add OAuth2 authentication support for Google and GitHub providers.
Includes user profile management and token refresh functionality.

Closes #123
```

## Author

gaoancun <gaoac.snow@outlook.com>

## License

[MIT](LICENSE)

## Related Projects

- [commitizen](https://github.com/commitizen/cz-cli) - commitizen CLI
- [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) - Generate changelogs from git metadata
- [conventional-commit-types](https://github.com/commitizen/conventional-commit-types) - List of conventional commit types
- [gitmoji](https://gitmoji.dev/) - An emoji guide for your commit messages
- [cz-conventional-changelog](https://github.com/commitizen/cz-conventional-changelog) - Original conventional changelog adapter
