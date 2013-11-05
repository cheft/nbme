exports.createRoute = function(app, service) {
	app.get('/cats/cat', function(req, res) {
		res.send('cat');
		console.log(service);
	});

	app.get('/cats/:id', function(req, res) {
		res.send(req.params.id);
	});
};