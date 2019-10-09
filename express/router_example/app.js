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
})
