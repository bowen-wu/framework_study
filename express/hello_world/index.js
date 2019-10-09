const routes = require('./routes');
const express = require('express');
const app = express();
const port = 3000;
const http = require('http');


// 会在浏览器中打开当前目录的public子目录（严格来说，是打开public目录的index.html文件）
// app.use(express.static(__dirname + '/public'));

// const routing = routes(app);

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

// app.listen(port, () => console.log(`Example app listening on port ${port}!`));
