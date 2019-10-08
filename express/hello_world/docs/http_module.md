## http module http模块

**注： 来自阮一峰老师的 [JavaScript 标准参考教程](https://javascript.ruanyifeng.com/nodejs/express.html#toc2)**

Express 框架建立在 ` node.js ` 内置的 ` http ` 模块上。` http ` 模块生成服务器的原始代码如下

```
const http = request('http');

const app = http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end('Hello World');
});

app.listen(3000, 'localhost');
```

上面代码的关键是 ` http ` 模块的 ` createServer ` 方法，表示生成一个 ` HTTP ` 服务器实例。该方法接受一个回调函数，该回调函数的参数，分别代表 ` HTTP ` 请求和 ` HTTP ` 回应的 ` request ` 对象和 ` response ` 对象。
` Express ` 框架的核心是对 ` http ` 模块的再包装。上面的代码用 ` Express ` 改写如下。

```
const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('Hello world!');
});

app.listen(3000);
```

比较两段代码，可以看到他们的非常接近。原来是用 ` http.createServer ` 方法新建一个 ` app ` 实例，现在则是用 ` Express ` 的构造方法，生成一个 ` Express ` 实例。两者的回调函数都是相同的。` Express ` 框架等于是在 ` http ` 模块之上，加了一个中间件。
