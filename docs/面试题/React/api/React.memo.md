# React.memo

`memo` 允许你的组件在 props 没有改变的情况下跳过重新渲染。



```tsx
import React, { memo } from 'react';
const MemoizedComponent = memo(SomeComponent, arePropsEqual?)
```

#### 参数 

`Component`：要进行记忆化的组件。`memo` 不会修改该组件，而是返回一个新的、记忆化的组件

**可选参数**`arePropsEqual`：一个函数，接受两个参数：组件的前一个 props 和新的 props。如果旧的和新的 props 相等，即组件使用新的 props 渲染的输出和表现与旧的 props 完全相同，则它应该返回 `true`。否则返回 `false`。通常情况下，你不需要指定此函数。