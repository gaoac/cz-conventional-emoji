# 测试用例说明文档

## 📋 概述

本文档详细说明了 `cz-conventional-emoji` 项目的测试套件结构、测试用例分类以及如何运行和维护测试。

## 🏗️ 测试架构

### 模块化结构

```
tests/
├── helpers/
│   └── test-helpers.js          # 共享测试辅助函数
├── commit-message.test.js       # 提交消息生成测试
├── validation.test.js           # 输入验证测试
├── gitmoji.test.js              # Gitmoji 支持测试
├── configuration.test.js        # 配置选项测试
├── edge-cases.test.js           # 边缘情况测试
└── index.test.js               # 主测试入口文件
```

## 📊 测试统计

- **总测试文件**: 6 个
- **总测试用例**: 174 个
- **执行时间**: ~780ms
- **覆盖率**: 95.8% (核心引擎)

## 🧪 测试模块详解

### 1. commit-message.test.js - 提交消息测试

**功能**: 测试各种提交消息格式的生成

**测试数量**: 10 个
**覆盖场景**:

- 基本提交消息格式 (有/无 scope)
- 包含 body 的提交消息
- 包含 issues 的提交消息
- 包含 breaking changes 的提交消息

- 大小写处理 (scope 和 subject)

**关键测试用例**:

```javascript
// 基本格式测试
it('only header w/ out scope', () => {
  expect(commitMessage({ type, subject }))
    .to.equal(`feat: ✨ ${subject}`);
});

// 包含 scope 的格式测试
it('only header w/ scope', () => {
  expect(commitMessage({ type, scope, subject }))
    .to.equal(`feat(${scope}): ✨ ${subject}`);

});
```

### 2. validation.test.js - 验证测试

**功能**: 测试输入验证和过滤逻辑
**测试数量**: 13 个
**覆盖场景**:

- 主题长度验证
- 大小写转换
- 字符串修剪
- 条件显示逻辑

**关键测试用例**:

```javascript
// 长度验证测试
it('subject exceeds max length', () => {
  expect(() => {
    commitMessage({ type, subject: 'a'.repeat(101) });
  }).to.throw('subject is too long');
});


// 大小写转换测试
it('lowercase scope', () => {
  expect(filter('HELLO')).to.equal('hello');

});
```

### 3. gitmoji.test.js - Gitmoji 测试

**功能**: 测试 Gitmoji 表情符号支持

**测试数量**: 15 个
**覆盖场景**:

- Gitmoji 类型选择
- 表情符号映射
- 选择项格式化
- 传统类型与 Gitmoji 类型切换

**关键测试用例**:

```javascript
// Gitmoji 类型测试
it('should use gitmoji types when useGitmoji is true', () => {
  const choices = getChoices({ useGitmoji: true });
  expect(choices[0].name).to.include('✨');

});

// 类型映射测试

it('should map :sparkles: to feat', () => {
  expect(commitMessage({ type: ':sparkles:', subject }))
    .to.equal('feat: ✨ add new feature');
});
```

### 4. configuration.test.js - 配置测试

**功能**: 测试各种配置选项
**测试数量**: 28 个
**覆盖场景**:

- 自定义配置选项
- 默认值处理
- 提示消息生成
- 非 Gitmoji 模式

**关键测试用例**:

```javascript
// 自定义配置测试

it('should handle custom maxLineWidth', () => {
  const options = { maxLineWidth: 50 };
  expect(commitMessage({ type, subject, body }, options))

    .to.contain('body content');
});

// 默认值测试
it('defaultType default', () => {
  expect(questionDefault('type')).to.equal('feat');

});
```

### 5. edge-cases.test.js - 边缘情况测试

**功能**: 测试边界条件和错误处理
**测试数量**: 9 个
**覆盖场景**:

- 空值处理
- null/undefined 值
- 错误输入处理
- 提示消息变体

**关键测试用例**:

```javascript
// 空值处理测试
it('should handle empty scope', () => {
  expect(commitMessage({ type, scope: '', subject }))
    .to.equal(`feat: ✨ ${subject}`);
});


// 错误输入测试
it('should handle empty subject', () => {
  expect(() => {

    commitMessage({ type, subject: '' });
  }).to.throw('subject is required');
});
```

### 6. index.test.js - 主测试文件

**功能**: 整合所有测试模块
**测试数量**: 107 个

**功能**: 导入并运行所有子模块测试

## 🔧 测试辅助函数

### test-helpers.js

**功能**: 提供共享的测试辅助函数和数据

**主要函数**:

- `commitMessage()` - 生成提交消息
- `processQuestions()` - 处理问题流程

- `questionPrompt()` - 获取问题提示
- `questionFilter()` - 获取过滤函数
- `questionWhen()` - 获取条件函数
- `getQuestion()` - 获取问题对象
- `getChoices()` - 获取选择项

**测试数据**:

- `defaultOptions` - 默认配置选项
- `testData` - 测试数据集合
- `customOptions` - 自定义配置选项

## 🚀 运行测试

### 运行所有测试

```bash

npm test
```

### 运行特定模块测试

```bash
# 运行提交消息测试

npm test -- tests/commit-message.test.js

# 运行验证测试
npm test -- tests/validation.test.js

# 运行 Gitmoji 测试
npm test -- tests/gitmoji.test.js
```

### 运行覆盖率测试

```bash
npm test -- --coverage
```

### 运行详细输出

```bash
npm test -- --reporter=verbose
```

## 📈 测试覆盖率

### 当前覆盖率统计

- **总覆盖率**: 95.8%
- **核心引擎 (engine.js)**: 95.8%
- **测试辅助函数**: 98.44%
