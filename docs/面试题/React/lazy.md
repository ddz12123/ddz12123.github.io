# lazy

`lazy` 能够让你在组件第一次被渲染之前延迟加载组件的代码。

```tsx
const SomeComponent = lazy(load)
```

在组件外部调用 `lazy`，以声明一个懒加载的 React 组件:

```tsx
import { lazy } from 'react';

const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));

```

  使用 Suspense 实现懒加载组件:

```tsx
<Suspense fallback={<Loading />}>
  <h2>Preview</h2>
  <MarkdownPreview />
</Suspense>
```

