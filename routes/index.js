exports.Route = function(app) {
    app.get('/', function(req, res) {
        res.sendfile('public/index.html');
    });
};
