# JavaScript 事件机制详解

## 1. 事件流三个阶段

JavaScript 事件流包含三个主要阶段：

```
事件捕获阶段 (Capturing Phase)
    ↓
目标阶段 (Target Phase)
    ↓
事件冒泡阶段 (Bubbling Phase)
```

### 伪代码示例：
```javascript
// 事件监听器默认在冒泡阶段执行
element.addEventListener('click', handler); // 冒泡阶段

// 设置为在捕获阶段执行
element.addEventListener('click', handler, true);
// 或者
element.addEventListener('click', handler, {capture: true});
```

## 2. 事件冒泡 (Event Bubbling)

事件从最具体的元素（目标元素）开始，逐级向上传播到最不具体的元素（document）

### 伪代码示例：
```html
<!-- HTML 结构 -->
<div id="grandparent">
    <div id="parent">
        <button id="child">点击我</button>
    </div>
</div>
```

```javascript
// 事件冒泡示例
grandparent.addEventListener('click', () => {
    console.log('爷爷元素被点击');
});

parent.addEventListener('click', () => {
    console.log('父元素被点击');
});

child.addEventListener('click', () => {
    console.log('子元素被点击');
});

// 点击按钮后的输出顺序：
// 1. "子元素被点击"
// 2. "父元素被点击"
// 3. "爷爷元素被点击"
```

## 3. 事件捕获 (Event Capturing)

事件从最不具体的元素开始，逐级向下传播到最具体的元素

### 伪代码示例：
```javascript
grandparent.addEventListener('click', () => {
    console.log('爷爷元素捕获阶段');
}, true);

parent.addEventListener('click', () => {
    console.log('父元素捕获阶段');
}, true);

child.addEventListener('click', () => {
    console.log('子元素目标阶段');
});

// 点击按钮后的输出顺序：
// 1. "爷爷元素捕获阶段"
// 2. "父元素捕获阶段"
// 3. "子元素目标阶段"
```

## 4. 事件委托/代理 (Event Delegation)

利用事件冒泡机制，在父元素上设置事件监听器来处理子元素的事件

### 伪代码示例：
```html
<!-- 动态列表 -->
<ul id="itemList">
    <li data-id="1">项目 1</li>
    <li data-id="2">项目 2</li>
    <li data-id="3">项目 3</li>
</ul>
```

```javascript
// 传统方式 - 为每个子元素单独绑定事件
const items = document.querySelectorAll('#itemList li');
items.forEach(item => {
    item.addEventListener('click', function() {
        console.log('点击了项目:', this.dataset.id);
    });
});

// 问题：新增的 li 元素没有事件监听器

// 事件委托方式 - 只在父元素上绑定一个事件
itemList.addEventListener('click', function(event) {
    // 检查点击的是否是 li 元素
    if (event.target.tagName === 'LI') {
        console.log('点击了项目:', event.target.dataset.id);
    }
});

// 现在新增的 li 元素也会自动有点击事件
const newItem = document.createElement('li');
newItem.textContent = '项目 4';
newItem.dataset.id = '4';
itemList.appendChild(newItem);
```

## 5. 事件对象的重要属性和方法

```javascript
element.addEventListener('click', function(event) {
    // 事件目标
    console.log('event.target:', event.target); // 实际触发事件的元素
    console.log('event.currentTarget:', event.currentTarget); // 绑定事件的元素
    
    // 阻止默认行为
    event.preventDefault();
    
    // 停止事件传播
    event.stopPropagation(); // 阻止冒泡
    event.stopImmediatePropagation(); // 阻止其他监听器执行
    
    // 事件阶段
    console.log('event.eventPhase:', event.eventPhase);
    // 1: 捕获阶段, 2: 目标阶段, 3: 冒泡阶段
});
```

## 6. 实际应用场景

### 场景1：动态内容的事件处理
```javascript
// 处理动态生成的按钮
document.getElementById('container').addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn')) {
        deleteItem(e.target.dataset.id);
    } else if (e.target.classList.contains('edit-btn')) {
        editItem(e.target.dataset.id);
    }
});
```

### 场景2：表单验证委托
```javascript
// 统一处理表单输入验证
document.getElementById('form').addEventListener('input', function(e) {
    if (e.target.tagName === 'INPUT') {
        validateField(e.target);
    }
});
```

### 场景3：性能优化
```javascript
// 大量列表项的性能优化
const list = document.getElementById('huge-list');

// 不好的做法 - 绑定大量事件监听器
// items.forEach(item => item.addEventListener('click', handler));

// 好的做法 - 只绑定一个事件监听器
list.addEventListener('click', function(e) {
    const item = e.target.closest('.list-item');
    if (item) {
        handleItemClick(item);
    }
});
```

## 7. 事件委托的优势

1. **内存效率**：减少事件监听器数量
2. **动态元素**：自动处理新增元素的事件
3. **代码简洁**：统一的事件处理逻辑
4. **性能更好**：减少内存占用和初始化时间

## 8. 注意事项

```javascript
// 1. 精确的目标匹配
parent.addEventListener('click', function(e) {
    // 使用 closest 确保匹配正确的元素
    const button = e.target.closest('.action-btn');
    if (button) {
        // 处理按钮点击
    }
});

// 2. 阻止不需要的委托
parent.addEventListener('click', function(e) {
    if (e.target.tagName !== 'BUTTON') return;
    // 只处理按钮点击
});

// 3. 结合事件阶段
// 需要在其他事件之前处理时使用捕获阶段
document.addEventListener('click', handler, true);
```

