const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const serveStatic = require('serve-static');
const errorHandler = require('errorhandler');
const path = require('path');
const app = express();
const routes = require('./routes/index');

// 设定 port 变量，意为访问端口
app.set('port', process.env.PORT || 1337);

// 设定 views 变量，意为视图存放的目录
app.set('views', path.join(__dirname, 'views'));

// 设定 view engine 变量，意为网页模板引擎
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(methodOverride());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// parse application/json
app.use(bodyParser.json());

// 设定静态文件目录，比如本地文件
// 目录为 demo/public/images, 访问
// 网址则显示为 http://localhost:1337/images
app.use(serveStatic(path.join(__dirname, 'public')));

routes(app);

if(app.get('env') === 'development') {
    app.use(errorHandler());
}

app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});




