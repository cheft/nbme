var service = require('../services/cat').createService();
var model = require('../models').cat;

exports.createRoute = function(app) {

	app.get('/cats', function(req, res) {
		service.list(function(err, data) {
			res.json(data);
		});
	});

	app.get('/cats/:id', function(req, res) {
		service.get(req.params.id, function(err, data) {
			res.json(data);
		});
	});

	app.post('/cats', function(req, res) {
		var cat = new model(req.body);
		service.create(cat, function(data) {
			res.send('已增加');
		});
	});

	app.put('/cats/:id', function(req, res) {
		service.update(req.params.id, req.body, function(data) {
			res.send('已修改');
		});
	});


	app.del('/cats/:id', function(req, res) {
		service.del(req.params.id, function(data) {
			res.send('已删除');
		});
	});

}