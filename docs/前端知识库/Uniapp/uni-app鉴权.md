---
sidebar_position: 1
description: Uni-app完整鉴权解决方案，包含登录验证、权限控制、白名单机制等核心功能
keywords: [Uni-app, 鉴权, 登录验证, 权限控制, 白名单]
---

# 🔐 Uni-app 鉴权系统

## 📋 概述

在 Uni-app 应用开发中，鉴权是保障应用安全的重要环节。本指南提供一套完整的鉴权解决方案，支持登录验证、权限控制、白名单机制等核心功能。

### 🎯 核心功能

- **登录状态验证**：自动检测用户登录状态
- **页面权限控制**：基于路由的权限管理
- **白名单机制**：无需登录即可访问的页面
- **自动跳转**：未登录用户自动跳转到登录页
- **多端兼容**：支持 H5、小程序、App 等多个平台

## 🛠️ 创建鉴权工具

### 📁 1.1 创建鉴权工具文件

在 `utils/auth.js` 中创建鉴权工具类：
```javascript title="utils/auth.js"
/**
 * Uni-app 鉴权工具类
 * 提供用户登录状态验证和页面权限控制功能
 */

// 白名单页面 - 无需登录即可访问
const whiteList = [
  '/pages/login/login',      // 登录页面
  '/pages/register/register', // 注册页面
  '/pages/about/about',      // 关于页面
  '/pages/index/index',      // 首页
]

/**
 * 检查用户登录状态
 * @param {string} pagePath - 页面路径
 * @returns {boolean} - 是否有权限访问
 */
export function checkAuth(pagePath) {
  try {
    // 获取登录令牌
    const token = uni.getStorageSync('token')
    
    // 如果用户已登录，直接返回 true
    if (token) {
      return true
    }
    
    // 如果页面在白名单中，允许访问
    if (whiteList.includes(pagePath)) {
      return true
    }
    
    // 未登录且不在白名单，跳转到登录页
    uni.showToast({
      title: '请先登录',
      icon: 'none',
      duration: 1500
    })
    
    setTimeout(() => {
      uni.redirectTo({
        url: '/pages/login/login'
      })
    }, 1500)
    
    return false
  } catch (error) {
    console.error('鉴权检查失败:', error)
    return false
  }
}

/**
 * 获取用户信息
 * @returns {object|null} - 用户信息或 null
 */
export function getUserInfo() {
  try {
    const userInfo = uni.getStorageSync('userInfo')
    return userInfo || null
  } catch (error) {
    console.error('获取用户信息失败:', error)
    return null
  }
}

/**
 * 保存用户信息
 * @param {object} userInfo - 用户信息
 */
export function setUserInfo(userInfo) {
  try {
    uni.setStorageSync('userInfo', userInfo)
  } catch (error) {
    console.error('保存用户信息失败:', error)
  }
}

/**
 * 清除用户信息（退出登录）
 */
export function clearUserInfo() {
  try {
    uni.removeStorageSync('token')
    uni.removeStorageSync('userInfo')
  } catch (error) {
    console.error('清除用户信息失败:', error)
  }
}
```

## 🚀 使用示例

### 📱 在页面中使用

```vue title="pages/profile/profile.vue"
<template>
  <view class="profile-container">
    <view class="user-info" v-if="userInfo">
      <text>欢迎, {{ userInfo.nickname }}</text>
      <button @click="logout">退出登录</button>
    </view>
    <view class="login-prompt" v-else>
      <text>请先登录</text>
      <button @click="goToLogin">去登录</button>
    </view>
  </view>
</template>

<script>
import { getUserInfo, clearUserInfo } from '@/utils/auth.js'

export default {
  data() {
    return {
      userInfo: null
    }
  },
  
  onShow() {
    // 获取用户信息
    this.userInfo = getUserInfo()
  },
  
  methods: {
    goToLogin() {
      uni.navigateTo({
        url: '/pages/login/login'
      })
    },
    
    logout() {
      uni.showModal({
        title: '提示',
        content: '确定要退出登录吗？',
        success: (res) => {
          if (res.confirm) {
            // 清除用户信息
            clearUserInfo()
            
            // 跳转到登录页
            uni.redirectTo({
              url: '/pages/login/login'
            })
          }
        }
      })
    }
  }
}
</script>
```

## 📊 最佳实践

### 🎯 1. 白名单管理
```javascript
// 建议将白名单配置单独提取出来
export const WHITE_LIST = [
  '/pages/login/login',
  '/pages/register/register',
  '/pages/index/index',
  '/pages/about/about',
  '/pages/privacy/privacy', // 隐私政策
  '/pages/terms/terms',     // 用户协议
]

// 支持通配符的白名单检查
export function isInWhiteList(path) {
  return WHITE_LIST.some(pattern => {
    if (pattern.includes('*')) {
      const regex = new RegExp(pattern.replace(/\*/g, '.*'))
      return regex.test(path)
    }
    return pattern === path
  })
}
```

### 🔒 2. Token 管理
```javascript
// 建议封装 Token 操作
const TOKEN_KEY = 'user_token'
const TOKEN_EXPIRE = 7 * 24 * 60 * 60 * 1000 // 7天有效期

export function setToken(token) {
  const expireTime = Date.now() + TOKEN_EXPIRE
  uni.setStorageSync(TOKEN_KEY, token)
  uni.setStorageSync('token_expire', expireTime)
}

export function getToken() {
  const token = uni.getStorageSync(TOKEN_KEY)
  const expireTime = uni.getStorageSync('token_expire')
  
  if (!token || !expireTime) {
    return null
  }
  
  // 检查是否过期
  if (Date.now() > expireTime) {
    removeToken()
    return null
  }
  
  return token
}

export function removeToken() {
  uni.removeStorageSync(TOKEN_KEY)
  uni.removeStorageSync('token_expire')
}
```

### 🛡️ 3. 错误处理
```javascript
// 增强的错误处理
export function checkAuthWithError(pagePath) {
  try {
    const result = checkAuth(pagePath)
    
    if (!result) {
      // 记录日志
      console.warn(`鉴权失败 - 页面: ${pagePath}, 时间: ${new Date().toISOString()}`)
      
      // 可以在这里添加埋点统计
      // trackEvent('auth_failed', { page: pagePath })
    }
    
    return result
  } catch (error) {
    console.error('鉴权检查异常:', error)
    
    // 出现异常时，默认允许访问（降级处理）
    return true
  }
}
```

## 📋 常见问题

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| 鉴权不生效 | mixin 未正确注册 | 检查 main.js 中的 mixin 配置 |
| 页面路径获取失败 | 平台差异 | 使用平台检测工具兼容处理 |
| Token 丢失 | 存储异常 | 添加异常处理和降级方案 |
| 跳转失败 | 路由配置错误 | 检查 pages.json 配置 |

## 🔗 相关资源

- [Uni-app 官方文档](https://uniapp.dcloud.net.cn/)
- [Uni-app 路由文档](https://uniapp.dcloud.net.cn/tutorial/page.html)
- [Uni-app 存储 API](https://uniapp.dcloud.net.cn/api/storage/storage.html)
### 📋 配置说明

| 配置项 | 说明 | 示例 |
|--------|------|------|
| `whiteList` | 白名单页面数组 | `['/pages/login/login']` |
| `checkAuth` | 鉴权检查函数 | 返回 `boolean` |
| `getUserInfo` | 获取用户信息 | 返回用户信息对象 |
| `setUserInfo` | 保存用户信息 | 接收用户信息对象 |

## 🔧 全局注册鉴权

### 📱 2.1 在 main.js 中注册全局 mixin

```js title="main.js"
import { createSSRApp } from 'vue'
import App from './App.vue'
import { checkAuth } from '@/utils/auth.js'

export function createApp() {
  const app = createSSRApp(App)

  // 🛡️ 全局页面鉴权 mixin
  app.mixin({
    onShow() {
      try {
        // 获取当前页面信息
        const pages = getCurrentPages()
        if (!pages || pages.length === 0) {
          console.warn('无法获取页面信息')
          return
        }
        
        const currentPage = pages[pages.length - 1]
        const path = '/' + currentPage.route
        
        console.log('当前页面路径:', path)
        
        // 执行鉴权检查
        checkAuth(path)
      } catch (error) {
        console.error('页面鉴权失败:', error)
      }
    }
  })

  return { app }
}
```

### 🎯 多端兼容性处理

Uni-app 支持多个平台，我们需要确保代码在各端都能正常运行：

```javascript title="utils/platform.js"
/**
 * 平台检测工具
 */
export function getPlatform() {
  // #ifdef H5
  return 'h5'
  // #endif
  
  // #ifdef MP-WEIXIN
  return 'weixin'
  // #endif
  
  // #ifdef MP-ALIPAY
  return 'alipay'
  // #endif
  
  // #ifdef APP-PLUS
  return 'app'
  // #endif
  
  // #ifdef MP-BAIDU
  return 'baidu'
  // #endif
  
  return 'unknown'
}

/**
 * 是否支持 getCurrentPages
 */
export function supportGetCurrentPages() {
  try {
    const pages = getCurrentPages()
    return Array.isArray(pages)
  } catch (error) {
    return false
  }
}
```