---
sidebar_position: 1
description: Docusaurus静态网站部署完整指南，包含GitHub Pages、环境配置和常见问题解决
keywords: [Docusaurus, 静态网站, GitHub Pages, 部署, 自动化部署]
---

# Docusaurus 部署指南

## 🎯 概述

Docusaurus 是 Facebook 开源的静态网站生成器，专为文档站点设计。本指南将详细介绍如何将 Docusaurus 项目部署到不同的平台，特别是 GitHub Pages。

### ✨ 为什么选择 Docusaurus

- **专为文档优化**：内置文档版本管理、搜索功能
- **React 驱动**：现代化技术栈，易于扩展
- **SEO 友好**：自动生成 sitemap，支持元数据优化
- **国际化支持**：内置多语言支持
- **主题定制**：丰富的主题和插件生态

## 🚀 官方资源

<div class="resource-grid">

### 📖 官方文档

- [Docusaurus 中文官网](https://www.docusaurus.cn/) - 完整的中文文档
- [Docusaurus GitHub](https://github.com/facebook/docusaurus) - 源码和 Issues
- [Docusaurus 插件市场](https://docusaurus.io/community) - 丰富的插件生态

### 🎨 主题和插件

- [官方主题](https://docusaurus.io/docs/api/themes) - 官方提供的主题
- [社区插件](https://docusaurus.io/community) - 社区贡献的插件
- [主题展示](https://docusaurus.io/showcase) - 优秀的 Docusaurus 网站展示

</div>

## 🔧 环境准备

### 📋 前置要求

在开始部署之前，请确保你的开发环境满足以下要求：

| 工具     | 最低版本 | 推荐版本 | 安装命令         |
| -------- | -------- | -------- | ---------------- |
| Node.js  | 18.0     | LTS      | `node --version` |
| npm/yarn | 最新版   | 最新版   | `npm --version`  |
| Git      | 2.0+     | 最新版   | `git --version`  |

### 🛠️ 安装验证

```bash
# 检查 Node.js 版本
node --version

# 检查包管理器
npm --version
# 或
yarn --version

# 检查 Git
git --version
```

## 🌐 GitHub Pages 部署

### 1️⃣ 配置 GitHub 仓库

:::tip 仓库命名规范

- 用户/组织站点：`username.github.io`
- 项目站点：`project-name`
  :::

1. **创建 GitHub 仓库**

   - 登录 GitHub
   - 点击右上角的 "+" → "New repository"
   - 按照命名规范创建仓库

2. **启用 GitHub Pages**
   - 进入仓库 Settings
   - 找到 "Pages" 选项
   - Source 选择 "Deploy from a branch"
   - Branch 选择 `gh-pages`

### 2️⃣ 配置 Docusaurus

在 `docusaurus.config.js` 中配置部署信息：

```javascript title="docusaurus.config.js"
module.exports = {
  // ... 其他配置

  // GitHub Pages 配置
  url: "https://your-username.github.io", // 你的 GitHub Pages 地址
  baseUrl: "/your-repo-name/", // 仓库名称
  organizationName: "your-username", // GitHub 用户名
  projectName: "your-repo-name", // 仓库名称
  deploymentBranch: "gh-pages", // 部署分支

  // 其他配置...
};
```

### 3️⃣ 部署命令

#### 🎯 基础部署

```bash
# 设置 Git 用户信息（首次使用需要）
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 部署到 GitHub Pages
GIT_USER=<Your GitHub username> yarn deploy
```

#### 📋 实际示例

```bash
# 示例：用户名为 ddz12123
GIT_USER='ddz12123' yarn deploy

# 或使用 npm
GIT_USER='ddz12123' npm run deploy
```

#### 🔐 使用 Personal Access Token

如果启用了 2FA，需要使用 Personal Access Token：

```bash
# 使用 Personal Access Token
GIT_USER=<用户名> GIT_PASS=<Personal Access Token> yarn deploy
```

### 4️⃣ 自动化部署（推荐）

#### 🚀 GitHub Actions 配置

创建 `.github/workflows/deploy.yml`：

```yaml title=".github/workflows/deploy.yml"
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: yarn

      - name: Install dependencies
        run: yarn install --frozen-lockfile

      - name: Build website
        run: yarn build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

## 🎯 部署验证

### ✅ 检查部署状态

1. **查看 GitHub Pages 状态**

   - 进入仓库的 Actions 选项卡
   - 查看部署工作流是否成功

2. **访问网站**

   - 等待几分钟让 GitHub Pages 更新
   - 访问 `https://your-username.github.io/your-repo-name`

3. **检查控制台**
   - 打开浏览器开发者工具
   - 查看 Console 是否有错误信息

### 🔍 常见问题排查

| 问题     | 症状         | 解决方案                         |
| -------- | ------------ | -------------------------------- |
| 404 错误 | 页面无法访问 | 检查 `baseUrl` 配置是否正确      |
| 样式丢失 | 页面无样式   | 确认 `baseUrl` 以 `/` 结尾       |
| 部署失败 | Actions 报错 | 检查依赖安装和构建命令           |
| 路径错误 | 资源加载失败 | 使用相对路径或正确配置 `baseUrl` |

## 📊 性能优化

### 🚀 构建优化

```javascript title="docusaurus.config.js"
module.exports = {
  // ... 其他配置

  // 优化构建配置
  webpack: {
    jsLoader: (isServer) => ({
      loader: require.resolve("swc-loader"),
      options: {
        jsc: {
          parser: {
            syntax: "ecmascript",
            jsx: true,
          },
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
      },
    }),
  },
};
```

### 📈 SEO 优化

```javascript title="docusaurus.config.js"
module.exports = {
  // ... 其他配置

  // SEO 配置
  title: "你的站点标题",
  tagline: "站点的标语描述",
  url: "https://your-site.com",
  baseUrl: "/",

  // 元数据
  customFields: {
    description: "站点的详细描述",
  },

  // 插件配置
  plugins: [
    [
      "@docusaurus/plugin-sitemap",
      {
        changefreq: "weekly",
        priority: 0.5,
      },
    ],
  ],
};
```

## 🔗 相关资源

### 📚 官方资源

- [Docusaurus 官方文档](https://docusaurus.io/docs)
- [部署指南](https://docusaurus.io/docs/deployment)
- [GitHub Pages 部署](https://docusaurus.io/docs/deployment#deploying-to-github-pages)

### 🛠️ 工具推荐

- [Docusaurus 插件搜索](https://docusaurus.io/community)
- [主题市场](https://docusaurus.io/community)
- [部署模板](https://github.com/topics/docusaurus-template)

### 💬 社区支持

- [GitHub Discussions](https://github.com/facebook/docusaurus/discussions)
- [Discord 社区](https://discord.gg/docusaurus)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/docusaurus)
