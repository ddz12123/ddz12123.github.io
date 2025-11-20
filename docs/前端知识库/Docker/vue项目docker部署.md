# vue项目docker部署

## 1. 使用Dockerfile部署

### 1.1 多阶段构建Dockerfile
```dockerfile
# 构建阶段
FROM node:18-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 生产阶段
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 1.2 Nginx配置示例 (nginx.conf)
```nginx
server {
    listen 80;
    server_name localhost;

    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
```

### 1.3 构建并运行命令
```bash
docker build -t vue-app .
docker run -d -p 8080:80 vue-app
```

## 2. 使用docker-compose部署

### 2.1 docker-compose.yml示例
```yaml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8080:80"
    restart: unless-stopped

  # 可选的Nginx反向代理服务
  nginx:
    image: nginx:stable-alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
      - ./dist:/usr/share/nginx/html
    depends_on:
      - frontend
```

### 2.2 启动命令
```bash
docker-compose up -d
```