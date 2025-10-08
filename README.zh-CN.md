# cz-conventional-emoji

一个遵循 conventional-changelog 的带有 emoji 的 commitizen 适配器。

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![npm version](https://img.shields.io/npm/v/cz-conventional-emoji.svg)](https://www.npmjs.com/package/cz-conventional-emoji)
[![npm downloads](https://img.shields.io/npm/dm/cz-conventional-emoji.svg)](https://www.npmjs.com/package/cz-conventional-emoji)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Test Coverage](https://img.shields.io/badge/coverage-95.8%25-brightgreen.svg)](./coverage)

[![NPM](https://nodei.co/npm/cz-conventional-emoji.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/cz-conventional-emoji/)

[English](./README.md) | 简体中文

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

## ✨ 特性

- 🎨 **70+ Gitmoji 类型** - 全面的 emoji 支持，覆盖所有提交场景
- 🔧 **灵活配置** - 支持全局、项目级或环境变量配置
- 📦 **Standard-Version 兼容** - 与自动化版本管理工具无缝协作
- 💪 **TypeScript 支持** - 包含完整的类型定义
- ✅ **充分测试** - 174 个测试用例，95.8% 核心引擎覆盖率
- 🎯 **Commitizen 友好** - 完全兼容 commitizen 生态系统

## 🚀 快速开始

60 秒快速上手：

```bash
# 1. 安装
npm install --save-dev cz-conventional-emoji

# 2. 配置（添加到 package.json）
npm pkg set config.commitizen.path="./node_modules/cz-conventional-emoji"

# 3. 开始使用！
git cz
```

就是这样！现在你可以用 emoji 创建漂亮的提交了。🎉

## 关于此项目

本项目基于 [cz-conventional-changelog](https://github.com/commitizen/cz-conventional-changelog) 开发，具有以下增强功能：

- **增强的 Gitmoji 支持**：改进了 gitmoji 集成，具有更好的对齐、间距和终端显示效果
- **修复表情符号渲染**：通过添加适当间距解决 Variation Selector-16 终端显示问题
- **更好的类型排序**：重新排序提交类型以匹配 conventional-commit-types 标准
- **扩展的 Gitmoji 类型**：支持 70+ 种 gitmoji 类型，提供全面的覆盖
- **standard-version 兼容**：commit 消息格式调整为 `type(scope): emoji subject` 以确保与 standard-version 完全兼容

在保留所有原始功能的同时，添加了这些改进以获得更好的用户体验。

## Commit 消息格式

为了确保与 standard-version 等工具的兼容性，commit 消息格式已调整为：

```
type(scope): emoji subject
```

**格式说明：**

- `type`: 提交类型（feat、fix、docs等）
- `scope`: 可选的作用域
- `emoji`: 对应的 gitmoji 表情符号
- `subject`: 简短的描述

这种格式确保了：

1. **标准兼容性**：type 在消息开头，符合 conventional commit 规范
2. **工具支持**：能被 standard-version、commitlint 等工具正确识别
3. **视觉美观**：仍然保留了 emoji 的视觉提示作用

## 安装

我们默认你已经安装过 [Commitizen](https://github.com/commitizen/cz-cli)。

### 全局安装

```bash
# 使用 npm
npm install --global cz-conventional-emoji

# 使用 yarn
yarn global add cz-conventional-emoji

# 使用 pnpm
pnpm add --global cz-conventional-emoji

# 设置全局默认适配器
echo '{ "path": "cz-conventional-emoji" }' > ~/.czrc
```

### 本地安装（推荐）

```bash
# 作为开发依赖安装
npm install --save-dev cz-conventional-emoji
```

然后添加到你的 `package.json`：

```json
{
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-emoji"
    }
  }
}
```

或使用快捷命令：

```bash
npm pkg set config.commitizen.path="./node_modules/cz-conventional-emoji"
```

## 使用

当需要提交时，只需使用 `git cz` 代替 `git commit`：

```bash
git add .
git cz
```

查看 [Commitizen](https://github.com/commitizen/cz-cli) 官方文档了解更多信息。

## ⚙️ 配置

### 使用 package.json（推荐）

在你的 `package.json` 中添加配置：

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

### 使用 .czrc 文件

在项目根目录或用户主目录创建 `.czrc` 文件：

```json
{
  "path": "cz-conventional-emoji",
  "useGitmoji": true,
  "maxHeaderWidth": 100,
  "maxLineWidth": 100
}
```

### 使用环境变量

你也可以通过环境变量进行配置：

```bash
# 禁用 gitmoji 模式
CZ_USE_GITMOJI=false git cz

# 设置自定义最大宽度
CZ_MAX_HEADER_WIDTH=80 git cz
CZ_MAX_LINE_WIDTH=120 git cz

# 设置默认值
CZ_TYPE=feat CZ_SCOPE=api git cz
```

### 配置选项

| 选项 | 类型 | 默认值 | 说明 |
|--------|------|---------|-------------|
| `useGitmoji` | boolean | `true` | 启用/禁用 gitmoji 模式 |
| `maxHeaderWidth` | number | `100` | 最大标题长度 |
| `maxLineWidth` | number | `100` | 正文/页脚的最大行宽 |
| `defaultType` | string | - | 默认提交类型 |
| `defaultScope` | string | - | 默认作用域 |
| `defaultSubject` | string | - | 默认主题 |
| `defaultBody` | string | - | 默认正文 |
| `defaultIssues` | string | - | 默认问题引用 |
| `disableScopeLowerCase` | boolean | `false` | 禁用作用域小写转换 |
| `disableSubjectLowerCase` | boolean | `false` | 禁用主题小写转换 |

### 禁用 Gitmoji 模式

如果你喜欢不带 emoji 的传统提交：

**全局配置：**

```bash
echo '{ "path": "cz-conventional-emoji", "useGitmoji": false }' > ~/.czrc
```

**项目配置：**

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

**环境变量：**

```bash
CZ_USE_GITMOJI=false git cz
```

## 常用 Gitmoji 类型

[查看完整的 70+ gitmoji 类型](https://gitmoji.dev/)

| 表情符号 | 类型名称 | 描述 |
|----------|----------|------|
| ✨ | `feat` | 引入新功能 |
| 🐛 | `fix` | 修复错误 |
| 🚑 | `hotfix` | 紧急修复 |
| 📝 | `docs` | 添加或更新文档 |
| 💄 | `style` | 添加或更新 UI 和样式文件 |
| ♻️ | `refactor` | 重构代码 |
| ⚡ | `perf` | 提高性能 |
| ✅ | `test` | 添加、更新或通过测试 |
| 🏗️ | `build` | 添加或更新构建系统 |
| 👷 | `ci` | 添加或更新 CI 配置 |
| ✏️ | `chore` | 修复拼写错误或文案 |
| ⏪ | `revert` | 撤销更改 |

## 示例

### Gitmoji 模式（默认）

```bash
feat(api): ✨ add user authentication endpoint

Add OAuth2 authentication support for Google and GitHub providers.
Includes user profile management and token refresh functionality.

Closes #123
```

### 传统模式

```bash
feat(api): add user authentication endpoint

Add OAuth2 authentication support for Google and GitHub providers.
Includes user profile management and token refresh functionality.

Closes #123
```

### 版本更新示例

使用提供的 `.versionrc.js` 配置：

```bash
# 次版本号更新 (1.1.2 → 1.2.0)
feat(auth): ✨ add OAuth2 support

# 修订版本号更新 (1.1.2 → 1.1.3)  
fix(api): 🐛 resolve authentication bug

# 主版本号更新 (1.1.2 → 2.0.0)
feat(api): 💥 redesign authentication system

BREAKING CHANGE: The authentication API has been completely redesigned.
```

## Standard-Version 配置

> **注意**: `.versionrc.js` 配置文件专门用于 `standard-version`。如果您使用 `semantic-release`，则需要不同的配置格式（`.releaserc` 或 `release.config.js`）。

### 快速设置

1. **安装 standard-version**：

   ```bash
   npm install --save-dev standard-version
   ```

2. **添加脚本到 package.json**：

   ```json
   {
     "scripts": {
       "release": "standard-version"
     }
   }
   ```

3. **生成变更日志并更新版本**：

   ```bash
   npm run release
   ```

### 详细配置

<details>
<summary>点击展开完整的 .versionrc.js 配置</summary>

要在变更日志生成和版本更新中启用所有 gitmoji 类型，请在项目根目录创建 `.versionrc.js` 文件：

```javascript
module.exports = {
  "types": [
    // 标准类型
    { "type": "feat", "section": "Features", "bump": "minor" },
    { "type": "fix", "section": "Bug Fixes", "bump": "patch" },
    { "type": "perf", "section": "Performance Improvements", "bump": "patch" },
    
    // 扩展类型 - 次版本号（新功能）
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
    
    // 扩展类型 - 修订版本号（修复和改进）
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
    
    // 隐藏类型（不在变更日志中显示）
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

### 版本更新规则

- **主版本号** (1.0.0 → 2.0.0): `breaking`（当使用 BREAKING CHANGE 页脚时）
- **次版本号** (1.0.0 → 1.1.0): `feat`, `hotfix`, `init`, `seed`, `easter-egg`, `feature-flags`, `animation`, `auth`, `business-logic`, `dx`, `sponsors`, `concurrency`, `validation`, `offline`
- **修订版本号** (1.0.0 → 1.0.1): `fix`, `perf`, `security`, `ci-fix`, `warn`, `quick-fix`, `error-handling`, `dead-code`, `failing-test`, `health-check`, `style`, `refactor`, `accessibility`, `ux`, `responsive`, `seo`, `types`, `text`, `database`, `experiment`, `deprecate`, `docs`, `test`, `build`, `ci`, `chore`, `revert`, `wip`, `release`, `remove`, `secrets`, `version`, `downgrade`, `upgrade`, `pin`, `analytics`, `deps-add`, `deps-remove`, `i18n`, `bad-code`, `merge`, `package`, `external-api`, `move`, `license`, `assets`, `comments`, `drunk-code`, `logs`, `remove-logs`, `contributors`, `mock`, `gitignore`, `snapshots`, `infrastructure`

### 使用方法

1. **安装 standard-version**：

   ```bash
   npm install --save-dev standard-version
   ```

2. **在 package.json 中添加脚本**：

   ```json
   {
     "scripts": {
       "release": "standard-version"
     }
   }
   ```

3. **生成变更日志并更新版本**：

   ```bash
   npm run release
   ```

此配置将：

- 在版本更新中包含所有 gitmoji 类型，并设置正确的 `bump` 属性
- 生成分类清晰的变更日志
- 隐藏非必要类型但仍会处理它们
- 根据提交类型自动更新版本号

</details>

### 替代方案：Semantic-Release 配置

如果您更喜欢使用 `semantic-release` 而不是 `standard-version`，请创建 `.releaserc` 文件：

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

**主要区别：**

- `standard-version`: 使用 `.versionrc.js` 和 `bump` 属性
- `semantic-release`: 使用 `.releaserc` 和 `releaseRules` 以及插件系统
- 两个工具都分析常规提交，但使用不同的配置格式

### 其他语义化版本工具

对于 Node.js 生态系统中其他流行的语义化版本工具，请参考其各自的文档：

- **conventional-changelog**: 使用不同的配置格式
- **release-it**: 有自己的配置系统
- **lerna**: 使用 `lerna.json` 进行配置

每个工具都有自己的方式来处理常规提交和版本更新。上面显示的 `.versionrc.js` 格式仅适用于 `standard-version`。

## ❓ 常见问题

### 我可以不使用 commitizen 吗？

不可以，这是一个需要安装 commitizen 的 commitizen 适配器。使用 `npm install -g commitizen` 安装。

### 这与 Husky 兼容吗？

可以！你可以将它与 Husky 预提交钩子集成。在你的 `.husky/prepare-commit-msg` 中添加：

```bash
exec < /dev/tty && node_modules/.bin/cz --hook || true
```

### 如何在某些提交中禁用 emoji？

使用环境变量：`CZ_USE_GITMOJI=false git cz`

### 我可以自定义 gitmoji 类型吗？

目前，gitmoji 类型是基于 [gitmojis](https://gitmoji.dev/) 规范预定义的。对于自定义类型，你可以在 `.czrc` 文件中配置常规类型。

### 为什么我的环境变量不起作用？

确保使用正确的值格式：

- ✅ `CZ_USE_GITMOJI=true` 或 `CZ_USE_GITMOJI=false`
- ❌ 不要只写 `CZ_USE_GITMOJI`（这不会生效）

### 如何与 commitlint 集成？

此适配器会自动读取 commitlint 配置。只需安装 `@commitlint/load` 并配置你的 `.commitlintrc.js`。

### 这支持 monorepo 吗？

支持！你可以为 monorepo 中的不同包设置不同的作用域。作用域字段完全可自定义。

## 🤝 贡献

欢迎贡献！我们期待你的帮助让这个项目变得更好。

### 贡献方式

- 🐛 **发现了 bug？** [提交 issue](https://github.com/gaoac/cz-conventional-emoji/issues/new)
- 💡 **有功能想法？** [发起讨论](https://github.com/gaoac/cz-conventional-emoji/discussions)
- 📖 **改进文档** - 修复错别字、添加示例、完善说明
- 🔀 **提交 Pull Request** - Bug 修复、功能或改进

### 开始贡献

1. Fork 仓库
2. 克隆你的 fork：`git clone https://github.com/YOUR_USERNAME/cz-conventional-emoji.git`
3. 安装依赖：`pnpm install`
4. 进行更改
5. 运行测试：`pnpm test`
6. 运行 linter：`pnpm lint`
7. 提交 PR

详细指南请阅读我们的[贡献指南](./CONTRIBUTING.zh-CN.md)（[English](./CONTRIBUTING.md)）。

## 作者

gaoancun <gaoac.snow@outlook.com>

## 许可证

[MIT](LICENSE)

## 相关项目

- [commitizen](https://github.com/commitizen/cz-cli) - commitizen CLI
- [cz-conventional-changelog](https://github.com/commitizen/cz-conventional-changelog) - 原始常规变更日志适配器
- [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) - 从 git 元数据生成变更日志
- [conventional-commit-types](https://github.com/commitizen/conventional-commit-types) - 常规提交类型列表
- [gitmoji](https://gitmoji.dev/) - 提交消息的表情符号指南
