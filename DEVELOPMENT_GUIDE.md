# ChatGPT Desktop Application - 开发指南

## 🎯 开发概述

本指南将帮助你深入了解 ChatGPT Desktop Application 的开发流程，包括代码结构、开发环境配置、调试技巧等。

## 📁 代码结构深度分析

### 前端架构 (src/)

#### 1. 组件结构 (src/components/)

```
components/
├── FilePath/          # 文件路径组件
├── Markdown/          # Markdown 渲染组件
│   ├── Editor.tsx     # Markdown 编辑器
│   ├── index.scss     # 样式文件
│   └── index.tsx      # 主组件
├── SwitchOrigin/      # 源切换组件
└── Tags/              # 标签组件
```

#### 2. 页面视图 (src/view/)

```
view/
├── about/             # 关于页面
├── awesome/           # 优秀功能页面
│   ├── config.tsx     # 配置组件
│   ├── Form.tsx       # 表单组件
│   └── index.tsx      # 主页面
├── dashboard/         # 仪表板
├── download/          # 下载页面
├── markdown/          # Markdown 页面
├── notes/             # 笔记页面
├── prompts/           # 提示词管理
│   ├── SyncCustom/    # 同步自定义
│   ├── SyncPrompts/   # 同步提示词
│   └── UserCustom/    # 用户自定义
├── scripts/           # 脚本管理
│   ├── config.tsx     # 配置
│   ├── Editor.tsx     # 编辑器
│   └── index.tsx      # 主页面
└── settings/          # 设置页面
    ├── General.tsx    # 通用设置
    ├── index.tsx      # 主设置
    ├── MainWindow.tsx # 主窗口设置
    └── TrayWindow.tsx # 托盘窗口设置
```

#### 3. 自定义 Hooks (src/hooks/)

```typescript
// 主要 Hooks 功能
hooks/
├── useChatPrompt.ts   # 聊天提示词管理
├── useColumns.tsx     # 列管理
├── useData.ts         # 数据管理
├── useInit.ts         # 初始化逻辑
├── useJson.ts         # JSON 处理
└── useTable.tsx       # 表格管理
```

### 后端架构 (src-tauri/src/)

#### 1. 应用模块 (src-tauri/src/app/)

```rust
app/
├── cmd.rs             # 命令处理
├── fs_extra.rs        # 文件系统扩展
├── gpt.rs             # GPT 相关功能
├── menu.rs            # 菜单管理
├── mod.rs             # 模块定义
├── script.rs          # 脚本处理
├── setup.rs           # 应用设置
├── template.rs        # 模板处理
└── window.rs          # 窗口管理
```

#### 2. 核心文件

```rust
src-tauri/src/
├── conf.rs            # 配置管理
├── main.rs            # 应用入口
├── utils.rs           # 工具函数
└── vendors/           # 第三方库
    ├── floating-ui-core.js
    ├── floating-ui-dom.js
    ├── html2canvas.js
    ├── jspdf.js
    ├── turndown-plugin-gfm.js
    └── turndown.js
```

## 🛠️ 开发环境配置

### 1. 开发工具推荐

#### IDE 配置

- **VS Code** (推荐)
  - 扩展: Rust Analyzer, TypeScript, Prettier, ESLint
  - 设置: 启用自动格式化

#### 调试工具

- **Chrome DevTools**: 前端调试
- **Rust Analyzer**: Rust 代码分析
- **Tauri DevTools**: Tauri 应用调试

### 2. 环境变量配置

创建 `.env` 文件：

```bash
# 开发环境变量
TAURI_DEBUG=true
VITE_APP_TITLE=ChatGPT Desktop
```

### 3. 开发服务器配置

```typescript
// vite.config.ts 关键配置
export default defineConfig({
  server: {
    port: 1420,
    strictPort: true,
  },
  envPrefix: ['VITE_', 'TAURI_'],
  build: {
    target: ['es2021', 'chrome100', 'safari13'],
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    sourcemap: !!process.env.TAURI_DEBUG,
  },
});
```

## 🔧 开发流程

### 1. 功能开发流程

#### 前端功能开发

```bash
# 1. 创建新组件
mkdir src/components/NewComponent
touch src/components/NewComponent/index.tsx
touch src/components/NewComponent/index.scss

# 2. 创建新页面
mkdir src/view/newPage
touch src/view/newPage/index.tsx
touch src/view/newPage/config.tsx

# 3. 添加路由
# 编辑 src/routes.tsx
```

#### 后端功能开发

```bash
# 1. 创建新模块
touch src-tauri/src/app/new_module.rs

# 2. 在 mod.rs 中注册模块
# 编辑 src-tauri/src/app/mod.rs

# 3. 实现功能
# 编辑新模块文件
```

### 2. 调试技巧

#### 前端调试

```typescript
// 1. 使用 React DevTools
// 安装 React Developer Tools 扩展

// 2. 使用 console 调试
console.log('Debug info:', data);

// 3. 使用 React 调试
import { useEffect } from 'react';

useEffect(() => {
  console.log('Component mounted');
}, []);
```

#### 后端调试

```rust
// 1. 使用 log 宏
use log::{info, warn, error};

info!("Application started");
warn!("Warning message");
error!("Error occurred: {}", err);

// 2. 使用 println! 快速调试
println!("Debug: {:?}", data);

// 3. 使用 dbg! 宏
dbg!(variable);
```

### 3. 测试策略

#### 前端测试

```bash
# 单元测试 (如果配置了)
pnpm test

# 组件测试
pnpm test:components

# E2E 测试
pnpm test:e2e
```

#### 后端测试

```bash
# Rust 测试
cd src-tauri
cargo test

# 特定模块测试
cargo test --package chatgpt --lib
```

## 📦 构建和打包

### 1. 开发构建

```bash
# 前端开发构建
pnpm run dev:fe

# 完整开发环境
pnpm run dev

# 生产构建
pnpm run build
```

### 2. 平台特定构建

#### Windows

```bash
# 构建 Windows 版本
pnpm run build
# 产物: src-tauri/target/release/bundle/msi/ChatGPT_*.msi
```

#### macOS

```bash
# 构建 macOS 版本
pnpm run build
# 产物: src-tauri/target/release/bundle/dmg/ChatGPT_*.dmg
```

#### Linux

```bash
# 构建 Linux 版本
pnpm run build
# 产物: src-tauri/target/release/bundle/deb/ChatGPT_*.deb
```

### 3. 发布流程

```bash
# 1. 更新版本号
# 编辑 package.json 和 src-tauri/Cargo.toml

# 2. 构建发布版本
pnpm run build

# 3. 运行发布脚本
pnpm run release

# 4. 更新下载链接
pnpm run download
```

## 🔍 代码质量保证

### 1. 代码格式化

```bash
# 格式化 Rust 代码
pnpm run fmt:rs

# 格式化 TypeScript/JavaScript 代码
pnpm run prettier

# 检查代码格式
pnpm run pretty-quick
```

### 2. 代码检查

```bash
# TypeScript 类型检查
pnpm run type-check

# ESLint 检查
pnpm run lint

# Rust 代码检查
cd src-tauri
cargo clippy
```

### 3. Git Hooks

项目使用 Husky 配置了 Git hooks：

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "pretty-quick --staged"
    }
  }
}
```

## 🐛 常见问题解决

### 1. 开发环境问题

#### 端口冲突

```bash
# 检查端口占用
lsof -i :1420

# 修改端口
# 编辑 vite.config.ts
server: {
  port: 1421, // 修改端口
  strictPort: true,
}
```

#### 依赖问题

```bash
# 清理 Node.js 依赖
rm -rf node_modules pnpm-lock.yaml
pnpm install

# 清理 Rust 依赖
cd src-tauri
cargo clean
cargo build
```

### 2. 构建问题

#### 内存不足

```bash
# 增加 Node.js 内存限制
export NODE_OPTIONS="--max-old-space-size=4096"
pnpm run build
```

#### 签名问题 (macOS)

```bash
# 移除隔离属性
sudo xattr -r -d com.apple.quarantine /path/to/ChatGPT.app
```

### 3. 运行时问题

#### 权限问题

```json
// 检查 tauri.conf.json 中的权限配置
{
  "tauri": {
    "allowlist": {
      "fs": {
        "all": false,
        "readFile": true,
        "writeFile": true
      }
    }
  }
}
```

#### 网络问题

```json
// 检查安全配置
{
  "tauri": {
    "security": {
      "dangerousRemoteDomainIpcAccess": [
        {
          "domain": "chat.openai.com",
          "enableTauriAPI": true
        }
      ]
    }
  }
}
```

## 📚 最佳实践

### 1. 代码组织

#### 前端最佳实践

- 使用 TypeScript 严格模式
- 组件按功能模块组织
- 使用自定义 Hooks 复用逻辑
- 样式使用 SCSS 模块化

#### 后端最佳实践

- 使用 Rust 错误处理模式
- 模块化组织代码
- 使用 async/await 处理异步
- 合理使用日志记录

### 2. 性能优化

#### 前端优化

- 使用 React.memo 优化渲染
- 代码分割减少包大小
- 图片懒加载
- 虚拟滚动处理大量数据

#### 后端优化

- 使用 Rust 零成本抽象
- 合理使用内存管理
- 异步处理 I/O 操作
- 缓存常用数据

### 3. 安全考虑

- 输入验证和清理
- 安全的文件操作
- 网络请求安全
- 用户数据保护

## 🚀 部署和维护

### 1. 自动化部署

```yaml
# .github/workflows/build.yml 示例
name: Build and Release

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]

    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - uses: actions/setup-rust@v1
      - run: pnpm install
      - run: pnpm run build
```

### 2. 监控和维护

- 错误日志收集
- 性能监控
- 用户反馈收集
- 定期安全更新

## 📖 学习资源

### 官方文档

- [Tauri 官方文档](https://tauri.studio/)
- [React 官方文档](https://react.dev/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [Rust 官方文档](https://doc.rust-lang.org/)

### 社区资源

- [Tauri Discord](https://discord.gg/tauri)
- [React 社区](https://reactjs.org/community)
- [Rust 社区](https://www.rust-lang.org/community)

---

这份开发指南将帮助你更好地理解和开发 ChatGPT Desktop Application。如有问题，请参考项目 Issues 或创建新的 Issue。
