exports.Route = function(app, service) {
    app.get('/cats/cat', function(req, res) {
        console.log(res);
        console.log(service);
        res.sendfile('public/index.html');
    });
};
