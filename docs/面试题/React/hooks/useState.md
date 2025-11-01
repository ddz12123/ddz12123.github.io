# useState

useState可以接受一个函数，可以在函数里面编写逻辑，初始化值，注意这个只会执行一次，更新的时候就不会执行了。

```jsx
const [obj,setObj]=useState(()=>{
    return {
        name:""
    }
})
```

