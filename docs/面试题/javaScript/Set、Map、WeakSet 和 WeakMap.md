# Set、Map、WeakSet 和 WeakMap
## 1. Set（集合）

**用途**：存储唯一值的集合，自动去重

**键值特性**：

- 只有值（value），没有键（key）
- 值可以是任意类型（原始值或对象引用）

## 2. Map（映射）

**用途**：键值对集合，键可以是任意类型

**键值特性**：

- 键（key）可以是任意类型（原始值或对象）
- 值（value）可以是任意类型

## 3. WeakSet（弱集合）

**用途**：存储对象引用的集合，不影响垃圾回收

**键值特性**：

- 只有值（value），没有键（key）
- 值必须是对象类型（不能是原始值）

## 4. WeakMap（弱映射）

**用途**：键必须是对象的键值对集合，键是弱引用

**键值特性**：

- 键（key）必须是对象类型
- 值（value）可以是任意类型


| 特性          | Set                  | Map                  | WeakSet              | WeakMap              |
|---------------|----------------------|----------------------|----------------------|----------------------|
| **键类型**    | 无键                 | 任意类型             | 无键                 | 必须是对象           |
| **值类型**    | 任意类型             | 任意类型             | 必须是对象           | 任意类型             |
| **可迭代**    | 是                   | 是                   | 否                   | 否                   |
| **大小属性**  | 有(size)             | 有(size)             | 无                   | 无                   |
| **弱引用**    | 否                   | 否                   | 是                   | 是(仅对键)           |
| **垃圾回收**  | 不影响               | 不影响               | 不影响键对象回收     | 不影响键对象回收     |
| **主要用途**  | 存储唯一值           | 键值对映射           | 临时对象集合         | 对象关联数据         |

## 对垃圾回收的影响

### 普通 Set/Map 会影响垃圾回收

```javascript
// 例子1：Set 阻止垃圾回收
function exampleSet() {
    let obj = { data: 'important data' };
    const set = new Set();
    
    set.add(obj);
    
    // 即使 obj 超出作用域，由于 Set 仍然引用它，不会被垃圾回收
    obj = null; 
    
    console.log(set.size); // 1，对象仍然存在
    // { data: 'important data' } 不会被回收
}

exampleSet();
```

### WeakMap 不影响垃圾回收
```javascript
// 例子4：WeakMap 不影响垃圾回收
function exampleWeakMap() {
    let keyObj = { id: 'weak key' };
    let valueObj = { data: 'weak value' };
    const weakMap = new WeakMap();
    
    weakMap.set(keyObj, valueObj);
    
    console.log(weakMap.has(keyObj)); // true
    console.log(weakMap.get(keyObj)); // { data: 'weak value' }
    
    // 当 keyObj 被设置为 null
    keyObj = null;
    valueObj = null;
    
    // 键对象会被垃圾回收，对应的值对象也会被回收
    // 因为 WeakMap 的键是弱引用
}

exampleWeakMap();
```