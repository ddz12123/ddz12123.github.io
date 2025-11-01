# useCallback

`useCallback` 是一个允许你在多次渲染中缓存函数的 React Hook。

```tsx
const cachedFn = useCallback(fn, dependencies)
```

用法：

```tsx
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

