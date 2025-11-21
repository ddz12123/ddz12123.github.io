# uniapp 自定义 tabbar

## 一、自定义 tabbar 配置

```json title="pages.json"  {6}
  "tabBar": {
    "color": "#d1d3d6",
    "selectedColor": "#60abf5",
    "backgroundColor": "#ffffff",
    "borderStyle": "black",
    "custom": true,
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页"
      },
      {
        "pagePath": "pages/me/me",
        "text": "我的"
      }
    ]
  },
```

## 二、自定义 tabbar 跳转

```js
// Tab点击事件处理
const handleTabClick = (index) => {
  uni.switchTab({
    url: tabBarList[index].pagePath,
  });
};
```

## 三、自定义 tabbar 组件

```js
<template>
  <view class="app-tabbar">
    <view
      v-for="(item, index) in tabBarList"
      :key="index"
      class="tabbar-item"
      :class="{ active: activeIndex === index }"
      @click="handleTabClick(index)"
    >
      <image
        class="tabbar-item__icon"
        :src="activeIndex === index ? item.selectedIconPath : item.iconPath"
      ></image>
      <text class="tabbar-item__text">{{ item.text }}</text>
    </view>
  </view>
</template>

<script setup>
import { getStaticUrl } from "@/utils/static-resource.js";

// 定义组件属性：当前激活的索引
const props = defineProps({
  activeIndex: {
    type: Number,
    default: 0,
  },
});

// TabBar菜单配置（与pages.json中的tabBar.list一致）
const tabBarList = [
  {
    pagePath: "/pages/index/index",
    iconPath: getStaticUrl("/static/images/tabbar/home.png"),
    selectedIconPath: getStaticUrl("/static/images/tabbar/home-active.png"),
    text: "首页",
  },
  {
    pagePath: "/pages/check/check",
    iconPath: getStaticUrl("/static/images/tabbar/check.png"),
    selectedIconPath: getStaticUrl("/static/images/tabbar/check-active.png"),
    text: "检测",
  },
  {
    pagePath: "/pages/report/report",
    iconPath: getStaticUrl("/static/images/tabbar/report.png"),
    selectedIconPath: getStaticUrl("/static/images/tabbar/report-active.png"),
    text: "报告",
  },
  {
    pagePath: "/pages/me/me",
    iconPath: getStaticUrl("/static/images/tabbar/me.png"),
    selectedIconPath: getStaticUrl("/static/images/tabbar/me-active.png"),
    text: "我的",
  },
];

// Tab点击事件处理
const handleTabClick = (index) => {
  uni.switchTab({
    url: tabBarList[index].pagePath,
  });
};
</script>

<style lang="scss" scoped>
// TabBar样式
.app-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 58px;
  background-color: #ffffff;
  border-top: 1px solid #d1d3d6;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  z-index: 100;
}

// TabBar项样式
.tabbar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 25%;
  height: 100%;
  color: #d1d3d6;
  font-size: 14px;
  -webkit-tap-highlight-color: transparent; // 移除点击高亮
  cursor: pointer;

  // 激活状态样式
  &.active {
    color: #60abf5;
  }
}

// TabBar图标样式
.tabbar-item__icon {
  width: 26px;
  height: 26px;
  margin-bottom: 4px;
}

// TabBar文字样式
.tabbar-item__text {
  font-size: 14px;
}
</style>
```
