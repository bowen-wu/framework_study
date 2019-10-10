## Express.Router

**注： 来自阮一峰老师的 [JavaScript 标准参考教程](https://javascript.ruanyifeng.com/nodejs/express.html#toc21)**

#### 基本用法

首先，` Express.Router ` 是一个构造函数，调用后返回一个路由器实例。然后使用该实例的 ` HTTP ` 动词方法，为不同的访问路径指定回调函数，最后挂载到某一路径。更改 ` app.js ` 文件如下

```
const express = require('express');

const app = express();
const router = express.Router();

app.set('port', 1337);

router.get('/', (req, res) => {
    res.send('this is home page!');
});

router.get('/about', (req, res) => {
    res.send('this is about page!');
});

app.use('/', router);

app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});
```

上面代码先定义了两个访问路径，然后将它们挂载到根目录。如果将

```
app.use('/', router);
```

改为

```
app.use('/app', router);
```

则相当于为 ` /app ` 和 ` /app/about ` 这两个路径指定了回调函数。这种路由器可以自由挂载的做法，为程序带来了更大的活性，既可以定义多个路由器实例，也可以将同一个路由器实例挂载到多个路径。

#### router.route 方法

```
router.route(path)
```

返回单个实例的路由，可以使用该实例处理带有可选中间件的 ` HTTP ` 动词，使用 ` router.route() ` 避免重复的路由命名。改写 ` app.js ` 为

```
const express = require('express');

const app = express();
const router = express.Router();

app.set('port', 1337);

router.get('/', (req, res) => {
    res.send('this is home page!');
});

router.get('/about', (req, res) => {
    res.send('this is about page!');
});

router.route('/api')
    .all((req, res, next) => {
        console.log('all middleware');
        next()
    })
    .put((req, res, next) => {
        console.log('put /api');
        res.end('put /api');
    })
    .get((req, res, next) => {
        console.log('get /api');
        res.end('get /api');
    })
    .post((req, res, next) => {
        next(new Error('not implemented'))
    })
    .delete((req, res, next) => {
        next(new Error('not implemented'))
    });

app.use('/', router);

app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});
```

之后运行 ` node app.js ` 可以看到 ` get /api ` 的 ` log ` 和页面

#### ` router ` 中间件

` use ` 方法为 ` router ` 对象指定中间件，即在数据正式发给用户之前，对数据进行处理。下面就是一个中间件的例子

```
router.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});
```

上面代码中，回调函数的 ` next ` 参数，表示接受其他中间件的调用。函数体中的 ` next() `，表示将数据传递给下一个中间件。

**注意： 中间件的防止位置很重要，等同于执行顺序。并且，中间件必须放在 ` HTTP ` 动词方法之前，否则不会执行。**将 ` app.js ` 改写为

```
const express = require('express');

const app = express();
const router = express.Router();

app.set('port', 1337);

router.get('/', (req, res) => {
    res.send('this is home page!');
});

router.get('/about', (req, res) => {
    res.send('this is about page!');
});

router.use((req, res, next) => {
    console.log('first req.method -> ', req.method);
    console.log('first req.url -> ', req.url);
    next();
});

router.route('/api')
    .all((req, res, next) => {
        // runs for all HTTP verbs first
        // think of it as route specific middleware!
        console.log('all middleware');
        next()
    })
    .put((req, res, next) => {
        console.log('put /api');
        res.end('put /api');
    })
    .get((req, res, next) => {
        console.log('get /api');
        res.end('get /api');
    })
    .post((req, res, next) => {
        next(new Error('not implemented'))
    })
    .delete((req, res, next) => {
        next(new Error('not implemented'))
    });

router.use((req, res, next) => {
    console.log('second req.method -> ', req.method);
    console.log('second req.url -> ', req.url);
    next();
});

app.use('/', router);

app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});
```

可以看到 ` first log ` 打印出来，而 ` second log ` 没有出来。

#### 对路径参数的处理

` router ` 对象的 ` param ` 方法用于路径参数的处理。改写 ` app.js ` 为

```
const express = require('express');

const app = express();
const router = express.Router();

app.set('port', 1337);

router.get('/', (req, res) => {
    res.send('this is home page!');
});

router.get('/about', (req, res) => {
    res.send('this is about page!');
});

router.use((req, res, next) => {
    console.log('first req.method -> ', req.method);
    console.log('first req.url -> ', req.url);
    next();
});

router.param('name', (req, res, next, name) => {
    // 对 name 进行验证或其他处理
    console.log('name -> ', name);
    console.log('req.name -> ', req.name);
    req.name = name;
    next();
});

router.route('/hello/:name')
    .get((req, res) => {
        res.send(`hello, ${req.name}!`);
    });

router.route('/api')
    .all((req, res, next) => {
        console.log('all middleware');
        next()
    })
    .put((req, res, next) => {
        console.log('put /api');
        res.end('put /api');
    })
    .get((req, res, next) => {
        console.log('get /api');
        res.end('get /api');
    })
    .post((req, res, next) => {
        next(new Error('not implemented'))
    })
    .delete((req, res, next) => {
        next(new Error('not implemented'))
    });

app.use('/', router);

app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});

```

上面代码中，` get ` 方法为访问路径指定了 ` name ` 参数，` param ` 方法则是对 ` name ` 参数进行了处理。**注意：` param ` 方法必须放在 ` HTTP ` 动词方法之前。**

#### ` app.route `

假定 ` app ` 是 ` Express ` 的实例对象，` Express ` 4.0 为该对象提供了一个 ` route ` 属性。` app.route ` 实际上是 ` express.Router() ` 的缩写形式，除了直接挂载到根路径。因此，对同一路径指定 ` get ` 和 ` post ` 方法的回调函数，可以写成链式形式。

```
app.route('/login')
    .get((req, res) => {
        res.send('this is the login form');
    })
    .post((req, res) => {
        console.log('processing');
        res.send('processing the login form);
    });
```
