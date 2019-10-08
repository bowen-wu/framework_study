const routes = require('./routes');
const express = require('express');
const app = express();
const port = 3000;

// 会在浏览器中打开当前目录的public子目录（严格来说，是打开public目录的index.html文件）
// app.use(express.static(__dirname + '/public'));

const routing = routes(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
