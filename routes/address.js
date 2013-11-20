exports.Route = function(app, service) {
    app.get('/addresses/users/:userid', function(req, res) {
        service.query({user: req.params.userid}, function(err, data) {
            var result = {addresses: data};
            res.json(result);
        });
    });
};
