# createPortal

`createPortal` 允许你将 JSX 作为 children 渲染至 DOM 的指定位置。类似vue的Teleport。

```tsx
<div>
  <SomeComponent />
  {createPortal(children, domNode, key?)}
</div>
```

```tsx
import { createPortal } from 'react-dom';

export default function MyComponent() {
  return (
    <div style={{ border: '2px solid black' }}>
      <p>这个子节点被放置在父节点 div 中。</p>
      {createPortal(
        <p>这个子节点被放置在 document body 中。</p>,
        document.body
      )}
    </div>
  );
}
```

