```
mkdir hello_world
cd hello_world

yarn init
yarn add express

touch index.js
```

编辑 ` index.js ` 文件

```
const express = require('express')
const app = express();
const port = 3000;

// 第一种 => 会在浏览器中打开当前目录的public子目录（严格来说，是打开public目录的index.html文件）
app.use(express.static(__dirname + '/public'));

// 第二种 => 动态网页
// app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
```

如果采用上述第一种方式，需要创建 ` public ` 目录

```
mkdir public
cd public
touch index.html
```

编辑 ` index.html ` 即可。
如果采用第二种动态网页的方式，则不需要做其他的。之后需要启服务

```
node index.js
```

访问 ` http://localhost:3000 ` 即可
