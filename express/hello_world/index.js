const routes = require('./routes');
const express = require('express');
const app = express();
const port = 1337;
const http = require('http');


// 会在浏览器中打开当前目录的public子目录（严格来说，是打开public目录的index.html文件）
// app.use(express.static(__dirname + '/public'));

// const routing = routes(app);

app.set('imgPath', '/static/img');

app.all('*', (req, res, next) => {
    console.log('this is necessary middleware');
    next();
});

app.get('/', (req, res) => {
    res.end(`Welcome to the homepage! img path is ${app.get('imgPath')}`);
});

app.get('/about', (req, res) => {
    res.end('About Page!');
});

app.get('/redirect', (req, res) => {
    res.redirect('http://google.com');
});

app.get('/redirect404', (req, res) => {
    res.redirect(404, '/about');
});

app.get('/render', (req, res) => {
   res.render('index', {message: 'this is render message!'});
});

app.get('*', (req, res) => {
    res.end('404 Error!');
});

http.createServer(app).listen(port, () => console.log(`Example app listening on port ${port}!`));

// app.listen(port, () => console.log(`Example app listening on port ${port}!`));
