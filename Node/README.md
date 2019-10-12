## Node.js

**注： ` Node.js ` 模块采用 ` CommonJS ` 规范**

#### 异步操作

` Node.js ` 约定，如果某个函数需要回调函数作为参数，则回调函数是最后一个参数。另外，回调函数本身的第一个参数，约定为上一步传入的错误对象。

```
const callback = (error, value) => {
    if(error) {
        return console.log(error);
    }
    console.log(value)
}
```

上面代码中，` callback ` 的第一个参数是 ` Error ` 对象，第二个参数才是真正的数据参数。这是因为回调函数粗腰用于异步操作，当回调函数运行时，前期的操作早就结束了，错误的执行栈早就不存在了，传统的错误捕捉机制 ` try ... catch ` 对于异步操作行不通，所以只能把错误交给回调函数处理。

如果没有发生错误，回调函数的第一个参数就传入 ` null `。这种写法有一个很大的好处，就是说只要判断回调函数的第一个参数，就知道有没有出错，如果不是 ` null `，就肯定出错了。另外这样还可以层层传递错误。

```
if(err) {
    if(!err.noPermission) {
        return next(err);
    }
}
```

