## use method

**注： 借鉴阮一峰老师的 [JavaScript 标准参考教程](https://javascript.ruanyifeng.com/nodejs/express.html#toc3)**

` app.use([path,] callback [, callback ...]) ` 方法中的 ` path ` 默认是 ` / `。

` use ` 是 ` express ` 注册中间件的方法，它返回一个函数。将 ` index.js ` 文件改写为

```
const express = require('express');
const app = express();
const port = 3000;
const http = require('http');

app.use((req, res, next) => {
    console.log('req.method -> ', req.method);
    console.log('req.url -> ', req.url);
    next();
});

app.use((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('hello world!');
})

http.createServer(app).listen(port);
```

之后运行 ` node index.js `，打开 ` localhost:3000 ` 即可看到效果。

上面代码使用 ` app.use ` 方法，注册了两个中间件。收到 ` HTTP ` 请求后，先调用第一个中间件，在控制台输出信息，然后通过 ` next ` 方法，将执行权传给第二个中间件，输出 ` HTTP ` 回应。由于第二个中间件没有调用 ` next ` 方法，所以 ` request ` 对象就不再向后传递了。

` use ` 方法内部可以对访问路径进行判断，据此就能实现简单的路由，根据不同的请求地址，返回不同的网页内容。将 ` index.js ` 文件改写为

```
const express = require('express');
const app = express();
const port = 3000;
const http = require('http');

app.use((req, res, next) => {
    if(req.url === '/') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Welcome to the homepage!');
    } else {
        next();
    }
});

app.use((req, res, next) => {
    if(req.url === '/about') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('About Page!');
    } else {
        next();
    }
});

app.use((req, res) => {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('404 Error!');
});

http.createServer(app).listen(port);
```

上面代码通过 ` request.url ` 属性判断请求的网址，从而返回不同的内容。注意，` app.use ` 方法一共登记了三个中间件，只要请求的路径匹配，就不会将执行权交给下一个中间件。因此，最后一个中间件会返回 404 错误，即前面的中间件都没匹配请求路径，找不到所要请求的资源。

除了在回调函数内部判断请求的网址，` use ` 方法也允许将请求网址写在第一个参数。这代表，只有请求路径匹配这个参数，后面的中间件才会生效。无疑，这样写更加清晰和方便。

```
app.use('/path', someMiddleware);
```

上面代码表示，只对根目录的请求，调用某个中间件。因此，可将 ` index.js ` 文件改写为

```
const express = require('express');
const app = express();
const port = 3000;
const http = require('http');

app.use('/home', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Welcome to the homepage!');
});

app.use('/about', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('About Page!');
});

app.use((req, res) => {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('404 Error!');
});

http.createServer(app).listen(port, () => console.log(`Example app listening on port ${port}!`));
```

