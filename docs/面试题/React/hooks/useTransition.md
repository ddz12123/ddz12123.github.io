# useTransition

`useTransition` 是一个让你可以在后台渲染部分 UI 的 React Hook。 是 React 18 中引入的一个 Hook，用于管理 UI 中的过渡状态，特别是在处理长时间运行的状态更新时。它允许你将某些更新标记为“过渡”状态，这样 React 可以优先处理更重要的更新，比如用户输入，同时延迟处理过渡更新。

```tsx
const [isPending, startTransition] = useTransition()
```
`useTransition` 返回的 `startTransition` 函数允许你将更新标记为 Transition

```tsx
import { useTransition } from 'react';

function TabContainer() {
  const [isPending, startTransition] = useTransition();
}
```

