# useActionState

`useActionState` 是一个可以根据某个表单动作的结果更新 state 的 Hook

用法：

```tsx
const [state, formAction, isPending] = useActionState(fn, initialState, permalink?);
```

#### 参数 

- `fn`：当按钮被按下或者表单被提交时触发的函数。当函数被调用时，该函数会接收到表单的上一个 state（初始值为传入的 `initialState` 参数，否则为上一次执行完该函数的结果）作为函数的第一个参数，余下参数为普通表单动作接到的参数。

- `initialState`：state 的初始值。任何可序列化的值都可接收。当 action 被调用一次后该参数会被忽略。

- **可选的** `permalink`：一个包含了在特定情况下（后述）表单提交后将跳转到的独立 URL 的字符串。此参数用于渐进式地增强应用了动态内容的页面（例如 feeds）：如果 `fn` 是一个 服务器函数，并且表单在 JavaScript 包加载之前提交，则浏览器将导航到指定的 `permalink` URL，而不是当前页面的 URL。确保在目标页面上渲染相同的表单组件（包括相同的 `fn` 和 `permalink` ），以便 React 知道应如何同步状态。一旦表单被激活，此参数将不再起作用。

  

```tsx
import { useActionState, useState } from "react";
import { addToCart } from "./actions.js";

function AddToCartForm({itemID, itemTitle}) {
  const [message, formAction, isPending] = useActionState(addToCart, null);
  return (
    <form action={formAction}>
      <h2>{itemTitle}</h2>
      <input type="hidden" name="itemID" value={itemID} />
      <button type="submit">加入购物车</button>
      {isPending ? "加载中……" : message}
    </form>
  );
}

export default function App() {
  return (
    <>
      <AddToCartForm itemID="1" itemTitle="JavaScript：权威指南" />
      <AddToCartForm itemID="2" itemTitle="JavaScript：优点荟萃" />
    </>
  )
}
```

