# useLayoutEffect

`useLayoutEffect` 是 `useEffect` 的一个版本，在浏览器重新绘制屏幕之前触发。

`useLayoutEffect` 返回 `undefined`

```tsx
useLayoutEffect(setup, dependencies?)
```



```tsx
const ref = useRef(null);

useLayoutEffect(() => {
    const { height } = ref.current.getBoundingClientRect();
    setTooltipHeight(height); 
}, []);
```

