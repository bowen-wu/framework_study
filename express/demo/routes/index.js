const apiFile = require('./api');

module.exports = function (app) {

    app.all('*', (req, res, next) => {
        console.log('this is necessary middleware');
        next();
    });

    app.get('/', function (req, res) {
        res.send('Hello world');
    });
    app.get('/customer', function(req, res){
        res.send('customer page');
    });
    app.get('/admin', function(req, res){
        res.send('admin page');
    });

    app.get('/api', (req, res) => {
        console.log('__dirname -> ', __dirname);
        console.log('app.get views -> ', app.get('views'));
        res.send({name: '张三', age: 18});
    });

    app.get('/api_file', apiFile.index);

    app.get('/index', (req, res) => {
        res.sendFile(`${app.get('views')}/index.html`);
    });

    app.get('/about', (req, res) => {
        res.sendFile(`${app.get('views')}/about.html`);
    });

    app.get('/article', (req, res) => {
        res.sendFile(`${app.get('views')}/article.html`);
    });

    app.get('*', (req, res) => {
        res.send('404 Error!');
    });

};
