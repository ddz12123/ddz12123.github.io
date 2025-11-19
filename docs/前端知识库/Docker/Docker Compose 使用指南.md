# Docker Compose 使用指南

## 基本概念
Docker Compose 是一个用于定义和运行多容器Docker应用程序的工具。通过YAML文件配置应用服务，可以轻松实现一键部署。

## YAML文件结构
```yaml
version: '3.8'
services:
  web:
    image: nginx:latest
    ports:
      - "80:80"
    volumes:
      - ./html:/usr/share/nginx/html

  db:
    image: postgres:13
    environment:
      POSTGRES_PASSWORD: example
```

## 常用命令
```bash
docker-compose up -d       # 启动服务(后台运行)
docker-compose down        # 停止并删除容器
docker-compose ps          # 查看运行状态
docker-compose logs         # 查看日志
docker-compose exec web sh # 进入容器
```

