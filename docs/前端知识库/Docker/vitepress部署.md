# vitepress 部署

## 1. Dockerfile
```dockerfile
# 使用官方的 Nginx 镜像作为基础镜像
FROM nginx:alpine

# 设置工作目录
WORKDIR /app

# 删除默认的 Nginx 配置文件
RUN rm /etc/nginx/conf.d/default.conf

# 复制自定义的 Nginx 配置文件
COPY nginx.conf /etc/nginx/conf.d/

# 将打包后的静态文件复制到 Nginx 的默认静态文件目录
COPY docs /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]

```

## 2. nginx.conf

```nginx
server {
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    listen 80;
    server_name _;
    index index.html;

    location / {
        # content location
        root /usr/share/nginx/html;

        # exact matches -> reverse clean urls -> folders -> not found
        try_files $uri $uri.html $uri/ =404;

        # non existent pages
        error_page 404 /404.html;

        # a folder without index.html raises 403 in this setup
        error_page 403 /404.html;

        # adjust caching headers
        # files in the assets folder have hashes filenames
        location ~* ^/assets/ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

## 3. 构建脚本

### 3.1 build.sh
```shell
#!/bin/bash
#chmod +x build.sh

# 检查并删除旧的容器
if [ "$(docker ps -a -q -f name=doc-web)" ]; then
    echo "Stopping and removing existing container doc-web..."
    docker stop doc-web
    docker rm doc-web
fi

# 检查并删除旧的镜像
if [ "$(docker images -q doc-container)" ]; then
    echo "Removing existing image doc-container..."
    docker rmi doc-container
fi

# 构建 Docker 镜像
docker build -t doc-container .

# 运行 Docker 容器并挂载目录
docker run -d -p 5000:80 --name doc-web -v /home/app/doc-web/docs:/usr/share/nginx/html doc-container

# 打印容器日志
docker logs -f doc-web

```