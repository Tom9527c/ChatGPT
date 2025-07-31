# ChatGPT Desktop Application - 快速开始指南

## 🚀 5 分钟快速上手

本指南将帮助你在 5 分钟内快速搭建开发环境并运行项目。

## 📋 前置要求

确保你的系统已安装以下工具：

### 必需工具

- **Node.js** (版本 14.18.0 或更高)
- **Rust** (版本 1.57 或更高)
- **pnpm** (推荐包管理器)

### 检查安装

```bash
# 检查 Node.js
node --version

# 检查 Rust
rustc --version
cargo --version

# 检查 pnpm
pnpm --version
```

## ⚡ 快速安装

### 1. 克隆项目

```bash
git clone https://github.com/lencx/ChatGPT.git
cd ChatGPT
```

### 2. 安装依赖

```bash
# 安装前端依赖
pnpm install

# 安装 Rust 依赖
cd src-tauri
cargo build
cd ..
```

### 3. 启动开发环境

```bash
# 启动完整开发环境
pnpm run dev
```

🎉 **恭喜！** 现在你应该能看到 ChatGPT Desktop Application 在开发模式下运行了。

## 🔧 常用开发命令

### 开发命令

```bash
# 启动前端开发服务器 (仅前端)
pnpm run dev:fe

# 启动完整开发环境 (前端 + Tauri)
pnpm run dev

# 构建前端
pnpm run build:fe

# 构建桌面应用
pnpm run build
```

### 代码质量

```bash
# 格式化 Rust 代码
pnpm run fmt:rs

# 格式化 TypeScript/JavaScript 代码
pnpm run prettier

# 检查代码格式
pnpm run pretty-quick
```

### 发布相关

```bash
# 更新器配置
pnpm run updater

# 发布版本
pnpm run release

# 下载发布文件
pnpm run download
```

## 📁 项目结构概览

```
ChatGPT/
├── src/                    # 前端源代码
│   ├── components/         # React 组件
│   ├── hooks/             # 自定义 Hooks
│   ├── view/              # 页面视图
│   └── main.tsx           # 应用入口
├── src-tauri/             # Tauri 后端代码
│   ├── src/               # Rust 源代码
│   └── tauri.conf.json    # Tauri 配置
├── package.json           # Node.js 配置
└── Cargo.toml            # Rust 配置
```

## 🎯 快速开发流程

### 1. 修改前端代码

```bash
# 编辑 src/ 目录下的文件
# 保存后会自动热重载
```

### 2. 修改后端代码

```bash
# 编辑 src-tauri/src/ 目录下的文件
# 保存后需要重启开发服务器
```

### 3. 添加新功能

```bash
# 1. 创建新组件
mkdir src/components/MyComponent
touch src/components/MyComponent/index.tsx

# 2. 创建新页面
mkdir src/view/myPage
touch src/view/myPage/index.tsx

# 3. 添加路由 (编辑 src/routes.tsx)
```

## 🐛 常见问题快速解决

### 问题 1: 端口被占用

```bash
# 解决方案: 修改 vite.config.ts 中的端口
server: {
  port: 1421, // 改为其他端口
  strictPort: true,
}
```

### 问题 2: 依赖安装失败

```bash
# 解决方案: 清理并重新安装
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### 问题 3: Rust 构建失败

```bash
# 解决方案: 清理 Rust 缓存
cd src-tauri
cargo clean
cargo build
cd ..
```

### 问题 4: 权限问题 (macOS)

```bash
# 解决方案: 移除隔离属性
sudo xattr -r -d com.apple.quarantine /path/to/ChatGPT.app
```

## 📦 快速打包

### 构建所有平台

```bash
# 构建桌面应用
pnpm run build

# 查看构建产物
ls src-tauri/target/release/bundle/
```

### 平台特定构建

```bash
# Windows
# 产物: src-tauri/target/release/bundle/msi/ChatGPT_*.msi

# macOS
# 产物: src-tauri/target/release/bundle/dmg/ChatGPT_*.dmg

# Linux
# 产物: src-tauri/target/release/bundle/deb/ChatGPT_*.deb
```

## 🔍 调试技巧

### 前端调试

```typescript
// 在浏览器中打开 DevTools
// 快捷键: F12 或 Cmd+Option+I (macOS)

// 使用 console 调试
console.log('Debug info:', data);
```

### 后端调试

```rust
// 使用 log 宏
use log::{info, warn, error};

info!("Application started");
warn!("Warning message");
error!("Error occurred: {}", err);
```

### Tauri 调试

```bash
# 启用 Tauri DevTools
# 在开发模式下，Tauri 会自动启用 DevTools
```

## 📚 下一步学习

1. **阅读详细文档**: [PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md)
2. **学习开发指南**: [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)
3. **查看代码示例**: 浏览 `src/` 和 `src-tauri/src/` 目录
4. **参与社区**: 加入 [Discord](https://discord.gg/aPhCRf4zZr)

## 🆘 获取帮助

- **GitHub Issues**: [项目 Issues](https://github.com/lencx/ChatGPT/issues)
- **Discord 社区**: [加入 Discord](https://discord.gg/aPhCRf4zZr)
- **文档**: 查看项目中的文档文件

---

**提示**: 如果遇到问题，请先检查本指南的常见问题部分，然后查看详细文档或寻求社区帮助。
