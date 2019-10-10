const express = require('express');

const app = express();

// app.route === express.Router() 除了直接挂载到根路径
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
