## routing 路由

启动脚本 ` index.js ` 的 ` app.get ` 方法，用于指定不同的访问路径所对应的回调函数，这叫做 **路由**（` routing `）。当有很多路由时

```
// index.js

const express = require('express')
const app = express();
const port = 3000;

// 会在浏览器中打开当前目录的public子目录（严格来说，是打开public目录的index.html文件）
// app.use(express.static(__dirname + '/public'));

// 动态网页
app.get('/', function (req, res) {
    res.send('Hello world!');
});
app.get('/customer', function(req, res){
    res.send('customer page');
});
app.get('/admin', function(req, res){
    res.send('admin page');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

```

这时需要路由文件

```
mkdir routes
cd routes

touch index.js
```

更改 ` routes/index.js ` 和 ` index.js ` 文件

```
// routes/index.js

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.send('routes -> Hello world');
    });
    app.get('/customer', function(req, res){
        res.send('routes -> customer page');
    });
    app.get('/admin', function(req, res){
        res.send('routes -> admin page');
    });
};
```

```
const routes = require('./routes');
const express = require('express');
const app = express();
const port = 3000;

// 会在浏览器中打开当前目录的public子目录（严格来说，是打开public目录的index.html文件）
// app.use(express.static(__dirname + '/public'));

const routing = routes(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

```

如果需要指定 ` HTTP ` 头信息，回调函数就必须换一种写法，需要使用 ` setHeader ` 方法与 ` end ` 方法

```
app.get('/', (req, res) => {
   const body = 'hello world';
   res.setHeader('Content-Type', 'text/plain');
   res.setHeader('Content-Length', body.length);
   res.end(body); 
});
```
