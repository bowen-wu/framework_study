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
