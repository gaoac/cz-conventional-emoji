# cz-conventional-emoji

一个遵循 conventional-changelog 的带有 emoji 的 commitizen 适配器。

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

[![NPM](https://nodei.co/npm/cz-conventional-emoji.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/cz-conventional-emoji/)

[English](./README.md) | 简体中文

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

## 关于此分支

本项目是 [cz-conventional-changelog](https://github.com/commitizen/cz-conventional-changelog) 的分支，具有以下增强功能：

- **增强的 Gitmoji 支持**：改进了 gitmoji 集成，具有更好的对齐和间距
- **修复表情符号渲染**：解决了导致终端间距问题的 Variation Selector-16 问题
- **更好的类型排序**：重新排序提交类型以匹配 conventional-commit-types 标准
- **改进的对齐**：修复了描述文本对齐以获得更好的视觉一致性
- **默认启用 Gitmoji**：安装后即可使用 emoji 提交，无需额外配置
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

### 全局

```
yarn global add cz-conventional-emoji
# OR
# npm install --global cz-conventional-emoji

# 设置全局默认适配器
echo '{ "path": "cz-conventional-emoji" }' > ~/.czrc
```

### 本地

```
yarn add cz-conventional-emoji
# OR
# npm install --save-dev cz-conventional-emoji

# 为你的项目设置默认适配器
"config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-emoji"
    },
  }
```

## 使用

当需要提交时，只需使用"git cz"代替"git commit"即可。查看[Commitizen](https://github.com/commitizen/cz-cli)官方文档了解更多信息。

### 禁用 Gitmoji 模式

如果你不想使用 emoji，可以通过以下方式禁用：

**全局配置**
```bash
echo '{ "path": "cz-conventional-emoji", "useGitmoji": false }' > ~/.czrc
```

**项目配置**
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

**环境变量**
```bash
CZ_USE_GITMOJI=false git cz
```

## 常用 Gitmoji 类型

| 表情符号 | 类型名称 | 描述 |
|----------|----------|------|
| ✨ | `feat` | 引入新功能 |
| 🐛 | `fix` | 修复错误 |
| 📝 | `docs` | 添加或更新文档 |
| 💄 | `style` | 添加或更新 UI 和样式文件 |
| ♻️ | `refactor` | 重构代码 |
| ⚡ | `perf` | 提高性能 |
| ✅ | `test` | 添加、更新或通过测试 |
| 🏗️ | `build` | 添加或更新构建系统 |
| 👷 | `ci` | 添加或更新 CI 配置 |
| ✏️ | `chore` | 修复拼写错误 |
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

## 作者

gaoancun <gaoac.snow@outlook.com>

## 许可证

[MIT](LICENSE)

## 相关项目

- [commitizen](https://github.com/commitizen/cz-cli) - commitizen CLI
- [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) - 从 git 元数据生成变更日志
- [conventional-commit-types](https://github.com/commitizen/conventional-commit-types) - 常规提交类型列表
- [gitmoji](https://gitmoji.dev/) - 提交消息的表情符号指南
- [cz-conventional-changelog](https://github.com/commitizen/cz-conventional-changelog) - 原始常规变更日志适配器