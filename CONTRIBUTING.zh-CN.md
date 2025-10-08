# 贡献指南

首先，感谢您考虑为 cz-conventional-emoji 做出贡献！🎉

[English](./CONTRIBUTING.md) | [简体中文](./CONTRIBUTING.zh-CN.md)

以下是为本项目做出贡献的指南。这些主要是指南而非规则。请运用您的最佳判断，并随时在 Pull Request 中提出对本文档的修改建议。

## 目录

- [行为准则](#行为准则)
- [如何贡献](#如何贡献)
  - [报告 Bug](#报告-bug)
  - [提出功能建议](#提出功能建议)
  - [提交 Pull Request](#提交-pull-request)
- [开发环境设置](#开发环境设置)
- [代码规范](#代码规范)
  - [Git 提交信息](#git-提交信息)
  - [JavaScript 代码规范](#javascript-代码规范)
- [附加说明](#附加说明)

## 行为准则

本项目及其所有参与者遵循常识和相互尊重的原则。请保持友善、专业和建设性。

## 如何贡献

### 报告 Bug

在创建 Bug 报告之前，请先检查[现有的 issues](https://github.com/gaoac/cz-conventional-emoji/issues) 以避免重复。

创建 Bug 报告时，请尽可能包含详细信息：

- **使用清晰且描述性的标题**
- **描述重现问题的确切步骤**
- **提供具体的示例**来演示这些步骤
- **描述您观察到的行为**以及您期望看到什么行为
- **如果相关，包含截图或动画 GIF**
- **描述您的环境**：
  - Node.js 版本
  - npm/yarn/pnpm 版本
  - 操作系统
  - 使用的终端/Shell

### 提出功能建议

功能建议也通过 GitHub issues 进行跟踪。创建功能建议时，请包含：

- **使用清晰且描述性的标题**
- **提供所建议功能的详细描述**
- **解释为什么此功能对大多数用户有用**
- **列出您考虑过的任何替代方案**

### 提交 Pull Request

请遵循以下步骤：

1. **Fork 仓库**并从 `main` 创建您的分支
2. **进行更改**并使用清晰、描述性的提交
3. **如果添加了功能，请添加测试**
4. **确保所有测试通过**，运行 `pnpm test`
5. **确保代码质量**，运行 `pnpm lint`
6. **根据需要更新文档**
7. **提交您的 Pull Request**

#### Pull Request 指南

- 保持 PR 专注于单个问题/功能
- 如有需要，更新 README.md
- 如果您愿意，可以将自己添加到贡献者列表中
- 对反馈和审查意见保持响应
- 遵循现有的代码风格

## 开发环境设置

### 前置要求

- Node.js >= 16
- pnpm（推荐）或 npm

### 设置步骤

```bash
# 克隆您的 fork
git clone https://github.com/YOUR_USERNAME/cz-conventional-emoji.git
cd cz-conventional-emoji

# 安装依赖
pnpm install

# 运行测试
pnpm test

# 在监视模式下运行测试
pnpm test

# 运行测试并生成覆盖率报告
pnpm test:coverage

# 运行代码检查
pnpm lint

# 自动修复代码问题
pnpm lint:fix

# 格式化代码
pnpm format
```

### 项目结构

```
cz-conventional-emoji/
├── index.js              # 主入口点和配置加载器
├── engine.js             # 核心提示引擎
├── index.d.ts            # TypeScript 类型定义
├── engine.test.js        # 测试套件
├── package.json          # 包配置
├── eslint.config.js      # ESLint 配置
├── .prettierrc           # Prettier 配置
├── vitest.config.js      # Vitest 配置
└── README.md             # 文档
```

## 代码规范

### Git 提交信息

**使用本工具来创建您的提交！** 😄

```bash
pnpm commit
# 或
git cz
```

本项目使用自己的 commitizen 适配器。您的提交应遵循带有 gitmoji 的 conventional commit 格式：

- ✨ `feat`: 新功能
- 🐛 `fix`: Bug 修复
- 📝 `docs`: 文档更改
- 💄 `style`: 代码风格更改（格式化等）
- ♻️ `refactor`: 代码重构
- ⚡ `perf`: 性能改进
- ✅ `test`: 添加或更新测试
- 🔧 `chore`: 维护任务

### JavaScript 代码规范

我们使用 ESLint 来维护代码质量。关键要点：

- 字符串使用单引号
- 使用 2 个空格缩进
- 语句末尾添加分号
- 使用描述性的变量名
- 为复杂逻辑添加注释
- 保持函数专注且简短

运行 `pnpm lint` 检查您的代码风格，或运行 `pnpm lint:fix` 自动修复问题。

## 测试

我们使用 Vitest 进行测试。请确保：

- 所有新功能都有相应的测试
- 所有现有测试都通过
- 力争高测试覆盖率（目前约 81%）
- 测试清晰且有良好的文档

```bash
# 运行测试
pnpm test

# 运行测试并生成覆盖率报告
pnpm test:coverage

# 使用 UI 运行测试
pnpm test:ui
```

## 文档

- 更新 README.md 以反映面向用户的更改
- 同时更新 README.zh-CN.md（中文版本）
- 为新函数添加 JSDoc 注释
- 如有需要，更新 TypeScript 类型定义

## 发布流程

发布由维护者使用 `standard-version` 管理：

```bash
# 更新版本并生成 changelog
pnpm release

# 或指定版本
pnpm release-as -- --release-as minor
```

## 有疑问？

随时通过 issue 提出您的问题，或联系维护者：

- GitHub: [@gaoac](https://github.com/gaoac)
- 邮箱: gaoac.snow@outlook.com

## 许可证

通过为 cz-conventional-emoji 做出贡献，您同意您的贡献将按照其 MIT 许可证进行许可。

---

再次感谢您的贡献！🚀

