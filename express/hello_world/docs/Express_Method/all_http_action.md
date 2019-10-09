## all 方法和 HTTP 动词方法

**注： 来自阮一峰老师的 [JavaScript 标准参考教程](https://javascript.ruanyifeng.com/nodejs/express.html#toc6)**

针对不同的请求，Express 提供了 ` use ` 方法的一些别名。通过别名更改 ` index.js ` 文件

```
const express = require('express');
const app = express();
const port = 1337;
const http = require('http');

app.all('*', (req, res, next) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    console.log('this is necessary middleware');
    next();
});

app.get('/', (req, res) => {
    res.end('Welcome to the homepage!');
});

app.get('/about', (req, res) => {
    res.end('About Page!');
});

app.get('*', (req, res) => {
    res.end('404 Error!');
});

http.createServer(app).listen(port, () => console.log(`Example app listening on port ${port}!`));
```

` all ` 方法表示，所有请求都必须通过该中间件，参数中的 ` * ` 表示对所有路径有效

` get ` 方法表示只有 ` GET ` 动词的 ` HTTP ` 请求通过该中间件，它的第一个参数是请求的路径。由于 ` get ` 方法的回调函数没有调用 ` next ` 方法，所以只要有一个中间件被调用了，后面的中间件就不会再被调用了

除了 ` get ` 方法以外，` Express ` 还提供了 ` post `、` put `、` delete ` 方法，即 ` HTTP ` 动词都是 ` Express ` 的方法

这些方法的第一个参数，都是请求的路径。除了绝对匹配之外，` Express ` 允许模式匹配。[更多匹配规则](https://expressjs.com/en/4x/api.html#app.get.method)
