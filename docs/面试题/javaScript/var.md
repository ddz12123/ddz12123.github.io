# var变量提升

## 1、var变量提升代码题
```javascript
var x=1;
function fn(){
    x=10;
    function x(){
        
    }
}
fn();
console.log(x); // 1
```
输出是 `1` ,函数x提升到fn函数作用域的顶部，并且变成了一个局部变量。x=10,修改的是局部的x变量。

## 2、函数内部变量提升

```javascript
var name="123";
(function(){
    console.log(name);
    var name="456";
})()

```
输出`undefined`,函数内部变量提升到单前函数作用域的顶部，但是赋值操作保留在原地。

## 3、函数和变量同时存在
```javascript
fn();
var fn;
function fn(){
    console.log(1);
}
fn=function (){
    console.log(2);
}
```
输出`1`，函数声明和变量声明都会被提升，函数会优先提升。