## middleware 中间件

**注： 来自阮一峰老师的 [JavaScript 标准参考教程](https://javascript.ruanyifeng.com/nodejs/express.html#toc3)**

中间件（middleware）就是处理 ` HTTP ` 请求的函数。它最大的特点就是，一个中间件处理完，在传递给下一个中间件。` App ` 实例在运行过程中，会调用一系列的中间件。

每个中间件可以从 ` App ` 实例，接收三个参数，一次为 ` request ` 对象（代表 ` HTTP ` 请求）、` response ` 对象（代表 ` HTTP ` 回应），` next ` 回调函数（代表下一个中间件）。每个中间件都可以对 ` HTTP ` 请求（ ` request ` 对象 ）进行加工，并且决定是否调用 ` next ` 方法，将 ` request ` 对象再传递给下一个中间件。

一个不进行任何操作、只传递 ` request ` 对象的中间件，就是下面这样

```
function uselessMiddleware(req, res, next) {
    next();
}
``` 

上面代码的 ` next ` 就是下一个中间件。如果它带有参数，则代表抛出一个错误，参数为错误文本。

```
function uselessMiddleware(req, res, next) {
    next('出错了！');
}
```

抛出错误之后，后面的中间件将不再执行，知道发现一个错误处理函数为止。
