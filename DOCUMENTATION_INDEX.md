# ChatGPT Desktop Application - 文档索引

## 📚 文档概览

欢迎来到 ChatGPT Desktop Application 的文档中心！这里提供了完整的项目文档，帮助你快速了解、开发和使用这个项目。

## 📖 文档目录

### 🚀 快速开始

- **[QUICK_START.md](./QUICK_START.md)** - 5 分钟快速上手指南
  - 前置要求检查
  - 快速安装步骤
  - 常用开发命令
  - 常见问题解决

### 📋 项目文档

- **[PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md)** - 完整项目文档
  - 项目概述和特性
  - 技术栈详解
  - 项目结构分析
  - 开发环境搭建
  - 打包和发布教程

### 🛠️ 开发指南

- **[DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)** - 详细开发指南
  - 代码结构深度分析
  - 开发环境配置
  - 开发流程和调试技巧
  - 构建和打包流程
  - 代码质量保证
  - 最佳实践

### 🔧 API 文档

- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - 完整 API 参考
  - Tauri API 配置
  - 前端 API 接口
  - 后端 API 接口
  - UI 组件 API
  - 构建配置 API
  - 数据模型定义

## 🎯 按需阅读指南

### 👶 新手入门

如果你是第一次接触这个项目，建议按以下顺序阅读：

1. **[QUICK_START.md](./QUICK_START.md)** - 快速上手
2. **[PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md)** - 项目概览
3. **[DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)** - 开发指南

### 👨‍💻 开发者

如果你要参与项目开发，建议阅读：

1. **[DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)** - 开发指南
2. **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - API 文档
3. **[PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md)** - 项目文档

### 🔧 维护者

如果你要维护项目，建议阅读：

1. **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - API 文档
2. **[DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)** - 开发指南
3. **[PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md)** - 项目文档

## 📁 项目结构快速参考

```
ChatGPT/
├── 📄 文档文件
│   ├── DOCUMENTATION_INDEX.md      # 本文档
│   ├── QUICK_START.md              # 快速开始
│   ├── PROJECT_DOCUMENTATION.md    # 项目文档
│   ├── DEVELOPMENT_GUIDE.md        # 开发指南
│   └── API_DOCUMENTATION.md        # API 文档
├── 📁 前端代码 (src/)
│   ├── components/                 # React 组件
│   ├── hooks/                     # 自定义 Hooks
│   ├── view/                      # 页面视图
│   └── main.tsx                   # 应用入口
├── 📁 后端代码 (src-tauri/)
│   ├── src/                       # Rust 源代码
│   └── tauri.conf.json            # Tauri 配置
├── 📁 脚本文件 (scripts/)
├── 📁 静态资源 (public/)
└── 📄 配置文件
    ├── package.json               # Node.js 配置
    ├── Cargo.toml                # Rust 配置
    ├── vite.config.ts            # Vite 配置
    └── tsconfig.json             # TypeScript 配置
```

## 🚀 快速命令参考

### 开发命令

```bash
# 启动开发环境
pnpm run dev

# 仅启动前端
pnpm run dev:fe

# 构建应用
pnpm run build

# 格式化代码
pnpm run prettier
pnpm run fmt:rs
```

### 发布命令

```bash
# 发布版本
pnpm run release

# 更新下载链接
pnpm run download
```

## 🔍 常见问题快速查找

### 环境问题

- **端口冲突**: 查看 [QUICK_START.md](./QUICK_START.md) 的常见问题部分
- **依赖安装失败**: 查看 [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) 的依赖问题解决

### 构建问题

- **构建失败**: 查看 [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) 的构建问题解决
- **打包问题**: 查看 [PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md) 的打包教程

### 开发问题

- **API 使用**: 查看 [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- **代码结构**: 查看 [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) 的代码结构分析

## 📚 外部资源

### 官方文档

- [Tauri 官方文档](https://tauri.studio/)
- [React 官方文档](https://react.dev/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [Rust 官方文档](https://doc.rust-lang.org/)

### 社区资源

- [项目 GitHub](https://github.com/lencx/ChatGPT)
- [Discord 社区](https://discord.gg/aPhCRf4zZr)
- [项目 Issues](https://github.com/lencx/ChatGPT/issues)

## 🤝 贡献指南

### 文档贡献

如果你发现文档中的错误或想要改进，请：

1. Fork 项目
2. 创建功能分支
3. 修改相关文档
4. 提交 Pull Request

### 代码贡献

如果你想要贡献代码，请：

1. 阅读 [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)
2. 查看 [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
3. 遵循项目的代码规范
4. 提交 Pull Request

## 📞 获取帮助

### 社区支持

- **GitHub Issues**: [项目 Issues](https://github.com/lencx/ChatGPT/issues)
- **Discord 社区**: [加入 Discord](https://discord.gg/aPhCRf4zZr)

### 文档反馈

如果你对文档有任何建议或问题，请：

1. 在 GitHub Issues 中提出
2. 在 Discord 社区中讨论
3. 直接联系项目维护者

## 📝 文档更新日志

### 最新更新

- 创建了完整的文档体系
- 添加了快速开始指南
- 完善了开发指南
- 补充了 API 文档

### 计划更新

- 添加更多代码示例
- 完善调试指南
- 添加视频教程链接
- 翻译为其他语言

---

**提示**: 建议将这份文档索引作为你的主要导航工具。如果你在特定文档中找不到需要的信息，请回到这个索引页面查找相关链接。

**注意**: 文档会随着项目的发展而更新，建议定期查看最新版本。
