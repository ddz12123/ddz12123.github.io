# createContext

使用 `createContext` 创建组件能够提供与读取的上下文 `content`

```tsx
const SomeContext = createContext(defaultValue)
```

> 从 React 19 开始，你可以将 `<SomeContext>` 作为渲染的上下文 provider。
>
> 较旧版本的 React 需要使用 `<SomeContext.Provider>`。

用法：

```tsx
import { createContext } from 'react';

const ThemeContext = createContext('light');

function App() {
  const [theme, setTheme] = useState('light');
  // ……
  return (
    <ThemeContext value={theme}>
      <Page />
    </ThemeContext>
  );
}

function MyComponent() {
    const themeContext = useContext(ThemeContext); // 使用上下文
    return (<div>{themeContext.theme}</div>);
}
```



