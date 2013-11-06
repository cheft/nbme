exports.Route = function(app) {
    app.get('/', function(req, res) {
        res.sendfile('public/index.html');
    });

    app.get('/tests/:id', function(req, res) {
        res.send('hello test and id is ' + req.params.id);
    });
};
