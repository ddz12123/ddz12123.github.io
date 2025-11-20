---
sidebar_position: 1
description: Docker Compose完整使用指南，包含YAML配置、常用命令和最佳实践
keywords: [Docker Compose, 容器编排, YAML配置, Docker命令]
---

# 🐳 Docker Compose 使用指南

## 📋 概述

Docker Compose 是一个用于定义和运行多容器Docker应用程序的工具。通过YAML文件配置应用服务，可以轻松实现一键部署，是开发环境和生产环境部署的利器。

### 🎯 核心优势
- **简化部署**：一条命令启动整个应用栈
- **环境一致性**：开发、测试、生产环境配置统一
- **服务编排**：轻松管理多个相互依赖的服务
- **可移植性**：配置即代码，便于分享和版本控制

## 🏗️ YAML文件结构详解
```yaml
version: '3.8'  # Docker Compose文件版本

services:
  # Web服务配置
  web:
    image: nginx:latest  # 使用最新版Nginx镜像
    container_name: web-server  # 容器名称
    ports:
      - "80:80"  # 端口映射 (主机:容器)
    volumes:
      - ./html:/usr/share/nginx/html  # 卷挂载
    restart: unless-stopped  # 重启策略
    depends_on:
      - db  # 依赖服务

  # 数据库服务配置
  db:
    image: postgres:13  # PostgreSQL 13版本
    container_name: postgres-db
    environment:
      POSTGRES_DB: myapp      # 数据库名称
      POSTGRES_USER: admin      # 数据库用户
      POSTGRES_PASSWORD: example  # 数据库密码
    volumes:
      - postgres_data:/var/lib/postgresql/data  # 数据持久化
    restart: unless-stopped

# 命名卷定义
volumes:
  postgres_data:
```

### 📌 配置要点

| 配置项 | 说明 | 示例 |
|--------|------|------|
| `version` | Docker Compose文件格式版本 | `'3.8'` |
| `services` | 定义各个服务 | `web`, `db` |
| `image` | 使用的镜像 | `nginx:latest` |
| `ports` | 端口映射 | `"80:80"` |
| `volumes` | 文件挂载 | `./html:/usr/share/nginx/html` |
| `environment` | 环境变量 | `POSTGRES_PASSWORD: example` |
| `restart` | 重启策略 | `unless-stopped` |

## ⚡ 常用命令大全
```bash
# 🚀 服务管理命令
docker-compose up -d       # 启动服务(后台运行)
docker-compose up --build  # 启动并重新构建镜像
docker-compose down        # 停止并删除容器和网络
docker-compose down -v     # 停止并删除容器、网络和卷

# 📊 状态查看命令
docker-compose ps          # 查看运行状态
docker-compose logs         # 查看日志
docker-compose logs -f      # 实时查看日志
docker-compose top         # 查看进程信息

# 🔧 容器操作命令
docker-compose exec web sh   # 进入容器shell
docker-compose exec web bash # 进入容器bash
docker-compose restart      # 重启所有服务
docker-compose restart web  # 重启特定服务

# 🗂️ 其他实用命令
docker-compose config       # 验证并查看配置
docker-compose pull        # 拉取镜像
docker-compose build       # 构建镜像
```

## 💡 最佳实践与技巧

### 🎯 环境分离
建议为不同环境创建不同的Compose文件：
```bash
# 开发环境
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

# 生产环境
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### 🔄 健康检查
为服务添加健康检查配置：
```yaml
services:
  web:
    image: nginx:latest
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:80"]
      interval: 30s
      timeout: 10s
      retries: 3
```

### 📋 常见问题排查

| 问题 | 解决方案 |
|------|----------|
| 端口冲突 | 修改`ports`配置或使用不同端口 |
| 权限问题 | 检查文件权限，使用`user: root` |
| 网络连接失败 | 检查服务依赖关系和启动顺序 |
| 卷数据丢失 | 使用命名卷而非绑定挂载 |

## 🔗 相关资源

- [Docker Compose官方文档](https://docs.docker.com/compose/)
- [Docker Compose配置文件参考](https://docs.docker.com/compose/compose-file/)
- [Docker最佳实践](https://docs.docker.com/develop/dev-best-practices/)

