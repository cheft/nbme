exports.Route = function(app, service) {
    app.get('/cats/cat', function(req, res) {
        console.log(res);
        res.sendfile('public/index.html');
        console.log(service);
    });
};
