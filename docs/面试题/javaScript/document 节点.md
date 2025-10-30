# document节点



在 HTML 文档中，`document` 节点是整个文档树的根节点（根元素），它代表了整个 HTML 文档本身，是 DOM（文档对象模型）的核心对象之一。 可以从以下几个角度理解 `document` 节点：

## 层级地位



它是 DOM 树的顶层节点，所有其他节点（如 `<html>` 元素、文本节点、注释节点等）都是它的子节点或后代节点。例如，`<html>` 元素是 `document` 的直接子节点，而 `<body>`、`<div>` 等元素则是其间接后代。 

## 功能作用

`document` 节点提供了一系列方法和属性，用于操作和访问文档中的内容。比如：    - 通过 `getElementById()`、`querySelector()` 等方法获取页面元素；    - 通过 `createElement()` 创建新元素；    - 通过 `title` 属性修改页面标题；    - 通过 `body` 属性直接访问 `<body>` 元素等。 

## 类型属性

在 DOM 中，`document` 节点的节点类型（`nodeType`）为 `9`，节点名称（`nodeName`）为 `"#document"`。