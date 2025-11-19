# type 和 interface

## 定义类型范围

`type`：可以为任何类型创建别名，包括基本类型（string、number）、联合类型、交叉类型、元组等。

`interface`：只能用于描述对象类型（包括对象、函数对象等），不能用于基本类型或联合类型。

## 扩展方式

`interface`：支持声明合并（自动合并同名接口）和继承（通过 extends）

- 声明合并
```ts
interface User { name: string }
interface User { age: number } // 合并为 { name: string; age: number }
```
- 继承
```ts
interface Person { name: string }
interface User extends Person { age: number } // User 包含 name 和 age
```

## 声明
interface 支持重复定义（声明合并）,interface 允许重复定义同名接口，TypeScript 会自动将它们合并为一个接口，合并后的接口包含所有定义中的属性和方法。

```ts
// 第一次定义
interface User {
  name: string;
}

// 重复定义（合并）
interface User {
  age: number;
}

// 合并后等效于：
// interface User {
//   name: string;
//   age: number;
// }

const user: User = {
  name: "Alice",
  age: 20 // 必须包含合并后的所有属性
};
```

type 不支持重复定义,type（类型别名）不允许重复定义同名类型，重复定义会直接报错（提示 “标识符已被声明”）。