# PicList 图床工具的使用

:::tip 简介
PicList 是一款功能强大的图床工具，支持多种图床服务，包括 GitHub、Gitee、阿里云 OSS 等。它提供了简洁的界面和丰富的功能，是开发者和内容创作者的理想选择。
:::

## 官方资源

| 平台 | 链接 |
|------|------|
| GitHub | [https://github.com/Kuingsmile/PicList](https://github.com/Kuingsmile/PicList) |
| 官网 | [https://piclist.cn/configure#github%E5%9B%BE%E5%BA%8A](https://piclist.cn/configure#github%E5%9B%BE%E5%BA%8A) |

## 配置 Gitee 图床

:::info 注意
以下步骤将指导您如何在 PicList 中配置 Gitee 图床，实现图片自动上传和链接生成。
:::

### 步骤 1：安装 Gitee 上传插件

1. 打开 PicList 应用
2. 在插件市场中搜索并安装 "Gitee 上传插件"

![安装 Gitee 上传插件](/img/docs/PixPin_2025-11-20_14-28-00.png)

### 步骤 2：配置插件

1. 进入设置页面
2. 找到 Gitee 插件配置项
3. 填写您的 Gitee 账户信息

![配置插件](/img/docs/PixPin_2025-11-20_14-28-58.png)

:::warning 安全提醒
请妥善保管您的 Gitee 访问令牌，不要泄露给他人。
:::

## 配置 Typora 图传

:::tip 应用场景
通过配置 Typora 与 PicList 的集成，可以实现截图后自动上传至图床并插入 Markdown 文档。
:::

### 配置步骤

1. 打开 Typora 编辑器
2. 进入 `偏好设置`（Windows）或 `设置`（macOS）
3. 选择 `图像` 选项卡
4. 配置上传服务为 PicList

![Typora 偏好设置](/img/docs/PixPin_2025-11-20_14-29-10.png)

### 验证配置

完成配置后，您可以：
- 使用截图工具截取图片
- 直接粘贴到 Typora 中
- 图片将自动上传至您配置的图床服务
- Markdown 文档中将自动插入图片链接

:::success 最佳实践
建议定期备份图床中的重要图片，避免因平台政策变更导致图片丢失。
:::
