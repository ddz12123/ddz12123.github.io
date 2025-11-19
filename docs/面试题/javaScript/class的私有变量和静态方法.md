# class的私有变量和静态方法

在 ES6 的 `class` 语法中，私有变量和静态方法是两个重要特性，用于实现封装和工具方法的定义。以下分别详解：


### 一、Class 的私有变量（Private Fields）
ES2022 正式引入了**私有变量**特性，用于限制类内部变量的访问范围（仅类内部可访问，外部无法读写），实现真正的封装。

#### 1. 定义方式
私有变量通过 **`#` 前缀**声明，必须在类内部定义，且无法在类外部访问。

```javascript
class Person {
  // 私有变量（必须用 # 开头）
  #name; 
  #age;

  constructor(name, age) {
    this.#name = name; // 类内部赋值
    this.#age = age;
  }

  // 类内部方法访问私有变量
  getInfo() {
    return `Name: ${this.#name}, Age: ${this.#age}`;
  }

  // 私有方法（同样用 # 开头）
  #formatName() {
    return this.#name.toUpperCase();
  }

  getUpperName() {
    return this.#formatName(); // 类内部调用私有方法
  }
}
```

#### 2. 核心特性
- **访问限制**：外部直接访问私有变量会报错，即使通过 `this` 或实例也无法访问。
  ```javascript
  const p = new Person("Alice", 20);
  console.log(p.#name); // 报错：Private field '#name' must be declared in an enclosing class
  console.log(p.getInfo()); // 正常输出："Name: Alice, Age: 20"（通过内部方法访问）
  ```

- **必须声明**：私有变量必须在类的顶层声明（不能在构造函数或方法中动态添加），否则报错。
  ```javascript
  class Test {
    constructor() {
      this.#x = 1; // 报错：Private field '#x' must be declared in an enclosing class
    }
  }
  ```

- **私有方法**：同理，私有方法也用 `#` 前缀定义，仅类内部可调用。


#### 3. 与“模拟私有变量”的区别
ES6 之前常用下划线 `_` 约定私有变量（如 `_name`），但这只是命名规范，外部仍可访问；而 `#` 声明的私有变量是**语言层面的强制限制**，真正实现了封装。


### 二、Class 的静态方法（Static Methods）
静态方法是定义在类本身的方法，**不属于实例**，通常用于工具函数或与类相关的全局操作。

#### 1. 定义方式
通过 `static` 关键字声明，直接通过**类名**调用，而非实例。

```javascript
class MathUtil {
  // 静态方法
  static add(a, b) {
    return a + b;
  }

  static multiply(a, b) {
    return a * b;
  }

  // 静态方法内部可调用其他静态方法
  static calculate(a, b) {
    return this.multiply(a, b) + this.add(a, b); // this 指向类本身
  }
}
```

#### 2. 调用方式
静态方法通过 `类名.方法名` 调用，实例无法访问静态方法。

```javascript
console.log(MathUtil.add(2, 3)); // 5（直接通过类调用）
console.log(MathUtil.calculate(2, 3)); // 2*3 + 2+3 = 6+5=11

const util = new MathUtil();
console.log(util.add(2, 3)); // 报错：util.add is not a function（实例无法调用）
```

#### 3. 核心特性
- **this 指向**：静态方法中的 `this` 指向**类本身**（而非实例），因此可通过 `this` 调用其他静态方法。
- **不能访问实例属性**：静态方法属于类，不依赖实例，因此无法访问实例的 `this` 或实例属性（包括私有变量）。
  ```javascript
  class Person {
    #name;
    constructor(name) {
      this.#name = name;
    }
    static getName() {
      return this.#name; // 报错：无法访问实例的私有变量
    }
  }
  ```

- **继承中的静态方法**：子类会继承父类的静态方法，子类调用时 `this` 指向子类。
  ```javascript
  class Parent {
    static hello() {
      return "Hello from Parent";
    }
  }

  class Child extends Parent {}
  console.log(Child.hello()); // "Hello from Parent"（继承父类静态方法）
  ```


### 三、总结
| 特性         | 私有变量（#xxx）                          | 静态方法（static）                          |
|--------------|------------------------------------------|--------------------------------------------|
| 定义方式     | 用 `#` 前缀声明（如 `#name`）             | 用 `static` 关键字声明（如 `static add(){}`） |
| 访问范围     | 仅类内部可访问（外部/实例均不可见）        | 仅类本身可调用（实例不可访问）              |
| 用途         | 封装类的内部状态，避免外部修改            | 定义与类相关的工具函数、工厂方法等          |
| 继承行为     | 子类无法直接访问父类的私有变量            | 子类会继承父类的静态方法                    |

