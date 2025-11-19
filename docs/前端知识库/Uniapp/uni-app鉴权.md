# uni-app 鉴权

## auth.js
```javascript
// utils/auth.js
const whiteList = [
  '/pages/login/login',
  '/pages/about/about',
]

export function checkAuth(pagePath) {
  const token = uni.getStorageSync('token')
  if (!token && !whiteList.includes(pagePath)) {
    // 未登录且不在白名单
    uni.redirectTo({
      url: '/pages/login/login'
    })
    return false
  }
  return true
}

```

## 在 main.js 里注册全局 mixin

```js
// main.js
import { createSSRApp } from 'vue'
import App from './App.vue'
import { checkAuth } from '@/utils/auth.js'

export function createApp() {
  const app = createSSRApp(App)

  // 全局页面鉴权 mixin
  app.mixin({
    onShow() {
      // #ifdef H5
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1]
      const path = '/' + currentPage.route
      checkAuth(path)
      // #endif

      // #ifndef H5
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1]
      const path = '/' + currentPage.route
      checkAuth(path)
      // #endif
    }
  })

  return { app }
}

```