exports.Route = function(app) {
    app.get('/', function(req, res) {
        res.sendfile('public/index.html');
    });

    app.post('/register', function(req, res) {

    });

    app.post('/login', function(req, res) {
        res.send('test');
    });

    app.get('/logout', function(req, res) {

    });
};
