# cz-conventional-emoji

A commitizen adapter with emoji that follows conventional-changelog.

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![npm version](https://img.shields.io/npm/v/cz-conventional-emoji.svg)](https://www.npmjs.com/package/cz-conventional-emoji)
[![npm downloads](https://img.shields.io/npm/dm/cz-conventional-emoji.svg)](https://www.npmjs.com/package/cz-conventional-emoji)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Test Coverage](https://img.shields.io/badge/coverage-95.8%25-brightgreen.svg)](./coverage)

[![NPM](https://nodei.co/npm/cz-conventional-emoji.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/cz-conventional-emoji/)

English | [简体中文](./README.zh-CN.md)

```
 Select the type of change that you're committing: (Use arrow keys)
❯ ✨  feat:              Introduce new features
  🐛  fix:               Fix a bug
  🚑  hotfix:            Critical bug fix
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

## ✨ Features

- 🎨 **70+ Gitmoji Types** - Comprehensive emoji support for all commit scenarios
- 🔧 **Flexible Configuration** - Global, project-level, or environment variable configuration
- 📦 **Standard-Version Compatible** - Works seamlessly with automated versioning tools
- 💪 **TypeScript Support** - Complete type definitions included
- ✅ **Well Tested** - 174 tests with 95.8% core engine coverage
- 🎯 **Commitizen Friendly** - Fully compatible with commitizen ecosystem

## 🚀 Quick Start

Get started in 60 seconds:

```bash
# 1. Install
npm install --save-dev cz-conventional-emoji

# 2. Configure (add to package.json)
npm pkg set config.commitizen.path="./node_modules/cz-conventional-emoji"

# 3. Use it!
git cz
```

That's it! Now you can create beautiful commits with emojis. 🎉

## About This Project

This project is based on [cz-conventional-changelog](https://github.com/commitizen/cz-conventional-changelog) with the following enhancements:

- **Enhanced Gitmoji Support**: Improved gitmoji integration with better alignment, spacing, and terminal display
- **Fixed Emoji Rendering**: Added proper spacing to resolve Variation Selector-16 terminal display issues
- **Better Type Sorting**: Reordered commit types to match conventional-commit-types standards
- **Extended Gitmoji Types**: Support for 70+ gitmoji types with comprehensive coverage
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

### Global Installation

```bash
# Using npm
npm install --global cz-conventional-emoji

# Using yarn
yarn global add cz-conventional-emoji

# Using pnpm
pnpm add --global cz-conventional-emoji

# Set global default adapter
echo '{ "path": "cz-conventional-emoji" }' > ~/.czrc
```

### Local Installation (Recommended)

```bash
# Install as dev dependency
npm install --save-dev cz-conventional-emoji
```

Then add to your `package.json`:

```json
{
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-emoji"
    }
  }
}
```

Or use the quick command:

```bash
npm pkg set config.commitizen.path="./node_modules/cz-conventional-emoji"
```

## Usage

When you need to commit, simply use `git cz` instead of `git commit`:

```bash
git add .
git cz
```

See the [Commitizen](https://github.com/commitizen/cz-cli) official documentation for more information.

## ⚙️ Configuration

### Using package.json (Recommended)

Add configuration to your `package.json`:

```json
{
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-emoji",
      "useGitmoji": true,
      "maxHeaderWidth": 100,
      "maxLineWidth": 100
    }
  }
}
```

### Using .czrc file

Create a `.czrc` file in your project root or home directory:

```json
{
  "path": "cz-conventional-emoji",
  "useGitmoji": true,
  "maxHeaderWidth": 100,
  "maxLineWidth": 100
}
```

### Using Environment Variables

You can also configure via environment variables:

```bash
# Disable gitmoji mode
CZ_USE_GITMOJI=false git cz

# Set custom max widths
CZ_MAX_HEADER_WIDTH=80 git cz
CZ_MAX_LINE_WIDTH=120 git cz

# Set defaults
CZ_TYPE=feat CZ_SCOPE=api git cz
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `useGitmoji` | boolean | `true` | Enable/disable gitmoji mode |
| `maxHeaderWidth` | number | `100` | Maximum header length |
| `maxLineWidth` | number | `100` | Maximum line width for body/footer |
| `defaultType` | string | - | Default commit type |
| `defaultScope` | string | - | Default scope |
| `defaultSubject` | string | - | Default subject |
| `defaultBody` | string | - | Default body |
| `defaultIssues` | string | - | Default issues |
| `disableScopeLowerCase` | boolean | `false` | Disable scope lowercase |
| `disableSubjectLowerCase` | boolean | `false` | Disable subject lowercase |

### Disable Gitmoji Mode

If you prefer traditional commits without emoji:

**Global Configuration:**

```bash
echo '{ "path": "cz-conventional-emoji", "useGitmoji": false }' > ~/.czrc
```

**Project Configuration:**

```json
{
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-emoji",
      "useGitmoji": false
    }
  }
}
```

**Environment Variable:**

```bash
CZ_USE_GITMOJI=false git cz
```

## Common Gitmoji Types

[View all 70+ gitmoji types](https://gitmoji.dev/)

| Emoji | Type Name | Description |
|-------|-----------|-------------|
| ✨ | `feat` | Introduce new features |
| 🐛 | `fix` | Fix a bug |
| 🚑 | `hotfix` | Critical bug fix |
| 📝 | `docs` | Add or update documentation |
| 💄 | `style` | Add or update UI and style files |
| ♻️ | `refactor` | Refactor code |
| ⚡ | `perf` | Improve performance |
| ✅ | `test` | Add, update, or pass tests |
| 🏗️ | `build` | Add or update build system |
| 👷 | `ci` | Add or update CI configuration |
| ✏️ | `chore` | Fix typos or text corrections |
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

### Version Bumping Examples

With the provided `.versionrc.js` configuration:

```bash
# Minor version bump (1.1.2 → 1.2.0)
feat(auth): ✨ add OAuth2 support

# Patch version bump (1.1.2 → 1.1.3)  
fix(api): 🐛 resolve authentication bug

# Major version bump (1.1.2 → 2.0.0)
feat(api): 💥 redesign authentication system

BREAKING CHANGE: The authentication API has been completely redesigned.
```

## Standard-Version Configuration

> **Note**: The `.versionrc.js` configuration file is specifically for `standard-version`. If you're using `semantic-release`, you'll need a different configuration format (`.releaserc` or `release.config.js`).

### Quick Setup

1. **Install standard-version**:

   ```bash
   npm install --save-dev standard-version
   ```

2. **Add scripts to package.json**:

   ```json
   {
     "scripts": {
       "release": "standard-version"
     }
   }
   ```

3. **Generate changelog and bump version**:

   ```bash
   npm run release
   ```

### Detailed Configuration

<details>
<summary>Click to expand full .versionrc.js configuration</summary>

To enable all gitmoji types in changelog generation and version bumping, create a `.versionrc.js` file in your project root:

```javascript
module.exports = {
  "types": [
    // Standard types
    { "type": "feat", "section": "Features", "bump": "minor" },
    { "type": "fix", "section": "Bug Fixes", "bump": "patch" },
    { "type": "perf", "section": "Performance Improvements", "bump": "patch" },
    
    // Extended types - Minor version (new features)
    { "type": "hotfix", "section": "Hotfixes", "bump": "minor" },
    { "type": "init", "section": "Features", "bump": "minor" },
    { "type": "seed", "section": "Features", "bump": "minor" },
    { "type": "easter-egg", "section": "Features", "bump": "minor" },
    { "type": "feature-flags", "section": "Features", "bump": "minor" },
    { "type": "animation", "section": "Features", "bump": "minor" },
    { "type": "auth", "section": "Features", "bump": "minor" },
    { "type": "business-logic", "section": "Features", "bump": "minor" },
    { "type": "dx", "section": "Features", "bump": "minor" },
    { "type": "sponsors", "section": "Features", "bump": "minor" },
    { "type": "concurrency", "section": "Features", "bump": "minor" },
    { "type": "validation", "section": "Features", "bump": "minor" },
    { "type": "offline", "section": "Features", "bump": "minor" },
    
    // Extended types - Patch version (fixes & improvements)
    { "type": "security", "section": "Bug Fixes", "bump": "patch" },
    { "type": "ci-fix", "section": "Bug Fixes", "bump": "patch" },
    { "type": "warn", "section": "Bug Fixes", "bump": "patch" },
    { "type": "quick-fix", "section": "Bug Fixes", "bump": "patch" },
    { "type": "error-handling", "section": "Bug Fixes", "bump": "patch" },
    { "type": "dead-code", "section": "Bug Fixes", "bump": "patch" },
    { "type": "failing-test", "section": "Bug Fixes", "bump": "patch" },
    { "type": "health-check", "section": "Bug Fixes", "bump": "patch" },
    { "type": "style", "section": "Performance Improvements", "bump": "patch" },
    { "type": "refactor", "section": "Performance Improvements", "bump": "patch" },
    { "type": "accessibility", "section": "Performance Improvements", "bump": "patch" },
    { "type": "ux", "section": "Performance Improvements", "bump": "patch" },
    { "type": "responsive", "section": "Performance Improvements", "bump": "patch" },
    { "type": "seo", "section": "Performance Improvements", "bump": "patch" },
    { "type": "types", "section": "Performance Improvements", "bump": "patch" },
    { "type": "text", "section": "Performance Improvements", "bump": "patch" },
    { "type": "database", "section": "Performance Improvements", "bump": "patch" },
    { "type": "experiment", "section": "Performance Improvements", "bump": "patch" },
    { "type": "deprecate", "section": "Performance Improvements", "bump": "patch" },
    
    // Hidden types (not shown in changelog)
    { "type": "docs", "section": "Documentation", "hidden": true, "bump": "patch" },
    { "type": "test", "section": "Tests", "hidden": true, "bump": "patch" },
    { "type": "build", "section": "Build System", "hidden": true, "bump": "patch" },
    { "type": "ci", "section": "CI", "hidden": true, "bump": "patch" },
    { "type": "chore", "section": "Chores", "hidden": true, "bump": "patch" },
    { "type": "revert", "section": "Reverts", "hidden": true, "bump": "patch" },
    { "type": "wip", "section": "Work in Progress", "hidden": true, "bump": "patch" },
    { "type": "release", "section": "Releases", "hidden": true, "bump": "patch" },
    { "type": "breaking", "section": "Breaking Changes", "bump": "major" },
    { "type": "remove", "section": "Removals", "hidden": true, "bump": "patch" },
    { "type": "secrets", "section": "Secrets", "hidden": true, "bump": "patch" },
    { "type": "version", "section": "Versions", "hidden": true, "bump": "patch" },
    { "type": "downgrade", "section": "Downgrades", "hidden": true, "bump": "patch" },
    { "type": "upgrade", "section": "Upgrades", "hidden": true, "bump": "patch" },
    { "type": "pin", "section": "Pins", "hidden": true, "bump": "patch" },
    { "type": "analytics", "section": "Analytics", "hidden": true, "bump": "patch" },
    { "type": "deps-add", "section": "Dependencies", "hidden": true, "bump": "patch" },
    { "type": "deps-remove", "section": "Dependencies", "hidden": true, "bump": "patch" },
    { "type": "i18n", "section": "Internationalization", "hidden": true, "bump": "patch" },
    { "type": "bad-code", "section": "Code Quality", "hidden": true, "bump": "patch" },
    { "type": "merge", "section": "Merges", "hidden": true, "bump": "patch" },
    { "type": "package", "section": "Packages", "hidden": true, "bump": "patch" },
    { "type": "external-api", "section": "External APIs", "hidden": true, "bump": "patch" },
    { "type": "move", "section": "Moves", "hidden": true, "bump": "patch" },
    { "type": "license", "section": "Licenses", "hidden": true, "bump": "patch" },
    { "type": "assets", "section": "Assets", "hidden": true, "bump": "patch" },
    { "type": "comments", "section": "Comments", "hidden": true, "bump": "patch" },
    { "type": "drunk-code", "section": "Code Quality", "hidden": true, "bump": "patch" },
    { "type": "logs", "section": "Logs", "hidden": true, "bump": "patch" },
    { "type": "remove-logs", "section": "Logs", "hidden": true, "bump": "patch" },
    { "type": "contributors", "section": "Contributors", "hidden": true, "bump": "patch" },
    { "type": "mock", "section": "Mocks", "hidden": true, "bump": "patch" },
    { "type": "gitignore", "section": "Git", "hidden": true, "bump": "patch" },
    { "type": "snapshots", "section": "Snapshots", "hidden": true, "bump": "patch" },
    { "type": "infrastructure", "section": "Infrastructure", "hidden": true, "bump": "patch" }
  ]
}
```

### Version Bumping Rules

- **Major version** (1.0.0 → 2.0.0): `breaking` (when using BREAKING CHANGE footer)
- **Minor version** (1.0.0 → 1.1.0): `feat`, `hotfix`, `init`, `seed`, `easter-egg`, `feature-flags`, `animation`, `auth`, `business-logic`, `dx`, `sponsors`, `concurrency`, `validation`, `offline`
- **Patch version** (1.0.0 → 1.0.1): `fix`, `perf`, `security`, `ci-fix`, `warn`, `quick-fix`, `error-handling`, `dead-code`, `failing-test`, `health-check`, `style`, `refactor`, `accessibility`, `ux`, `responsive`, `seo`, `types`, `text`, `database`, `experiment`, `deprecate`, `docs`, `test`, `build`, `ci`, `chore`, `revert`, `wip`, `release`, `remove`, `secrets`, `version`, `downgrade`, `upgrade`, `pin`, `analytics`, `deps-add`, `deps-remove`, `i18n`, `bad-code`, `merge`, `package`, `external-api`, `move`, `license`, `assets`, `comments`, `drunk-code`, `logs`, `remove-logs`, `contributors`, `mock`, `gitignore`, `snapshots`, `infrastructure`

### Usage

1. **Install standard-version**:

   ```bash
   npm install --save-dev standard-version
   ```

2. **Add scripts to package.json**:

   ```json
   {
     "scripts": {
       "release": "standard-version"
     }
   }
   ```

3. **Generate changelog and bump version**:

   ```bash
   npm run release
   ```

This configuration will:

- Include all gitmoji types in version bumping with proper `bump` attributes
- Generate comprehensive changelogs with proper categorization
- Hide non-essential types from changelog while still processing them
- Automatically bump version numbers based on commit types

</details>

### Alternative: Semantic-Release Configuration

If you prefer `semantic-release` over `standard-version`, create a `.releaserc` file instead:

```json
{
  "branches": ["main"],
  "plugins": [
    [
      "@semantic-release/commit-analyzer",
      {
        "preset": "conventionalcommits",
        "releaseRules": [
          { "type": "feat", "release": "minor" },
          { "type": "fix", "release": "patch" },
          { "type": "hotfix", "release": "minor" },
          { "type": "perf", "release": "patch" },
          { "type": "breaking", "release": "major" }
        ]
      }
    ],
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/github"
  ]
}
```

**Key Differences:**

- `standard-version`: Uses `.versionrc.js` with `bump` attributes
- `semantic-release`: Uses `.releaserc` with `releaseRules` and plugin system
- Both tools analyze conventional commits but use different configuration formats

### Other Semantic Versioning Tools

For other popular semantic versioning tools in the Node.js ecosystem, please refer to their respective documentation:

- **conventional-changelog**: Uses different configuration format
- **release-it**: Has its own configuration system
- **lerna**: Uses `lerna.json` for configuration

Each tool has its own way of handling conventional commits and version bumping. The `.versionrc.js` format shown above is specific to `standard-version` only.

## ❓ FAQ

### Can I use this without commitizen?

No, this is a commitizen adapter that requires commitizen to be installed. Install it with `npm install -g commitizen`.

### Does this work with Husky?

Yes! You can integrate it with Husky pre-commit hooks. Add to your `.husky/prepare-commit-msg`:

```bash
exec < /dev/tty && node_modules/.bin/cz --hook || true
```

### How do I disable emoji in some commits?

Use the environment variable: `CZ_USE_GITMOJI=false git cz`

### Can I customize the gitmoji types?

Currently, the gitmoji types are predefined based on the [gitmojis](https://gitmoji.dev/) specification. For custom types, you can configure conventional types in your `.czrc` file.

### Why isn't my environment variable working?

Make sure to use the correct value format:

- ✅ `CZ_USE_GITMOJI=true` or `CZ_USE_GITMOJI=false`
- ❌ Not just `CZ_USE_GITMOJI` (this won't work)

### How do I integrate with commitlint?

This adapter automatically reads commitlint configuration. Just install `@commitlint/load` and configure your `.commitlintrc.js`.

### Does this support monorepos?

Yes! You can set different scopes for different packages in your monorepo. The scope field is fully customizable.

## 🤝 Contributing

Contributions are welcome! We'd love your help to make this project even better.

### Ways to Contribute

- 🐛 **Found a bug?** [Open an issue](https://github.com/gaoac/cz-conventional-emoji/issues/new)
- 💡 **Have a feature idea?** [Start a discussion](https://github.com/gaoac/cz-conventional-emoji/discussions)
- 📖 **Improve documentation** - Fix typos, add examples, clarify instructions
- 🔀 **Submit a Pull Request** - Bug fixes, features, or improvements

### Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/cz-conventional-emoji.git`
3. Install dependencies: `pnpm install`
4. Make your changes
5. Run tests: `pnpm test`
6. Run linter: `pnpm lint`
7. Submit a PR

For detailed guidelines, please read our [Contributing Guide](./CONTRIBUTING.md) ([中文版](./CONTRIBUTING.zh-CN.md)).

## Author

gaoancun <gaoac.snow@outlook.com>

## License

[MIT](LICENSE)

## Related Projects

- [commitizen](https://github.com/commitizen/cz-cli) - commitizen CLI
- [cz-conventional-changelog](https://github.com/commitizen/cz-conventional-changelog) - Original conventional changelog adapter
- [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) - Generate changelogs from git metadata
- [conventional-commit-types](https://github.com/commitizen/conventional-commit-types) - List of conventional commit types
- [gitmoji](https://gitmoji.dev/) - An emoji guide for your commit messages
