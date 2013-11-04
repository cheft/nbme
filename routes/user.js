var service = require('../services/user').createService();
var model = require('../models').user;

exports.createRoute = function(app) {

	app.get('/users/toLogin', function(req, res) {
		res.render('login');
	});

	app.get('/users/toReg', function(req, res){
		res.render('reg');
	});

	app.post('/users/login', function(req, res){
		var username = req.body.username;
		var password = req.body.password;
		res.send("respond with a resource " + username  + password);
	});

	app.post('/users/reg', function(req, res){
		var user = new model(req.body);
		service.create(user, function(data) {
        	res.json(user);
		});
	});


	app.get('/users', function(req, res) {
		service.list(function(err, data) {
			res.json(data);
		});
	});

	app.get('/users/:id', function(req, res) {
		service.get(req.params.id, function(err, data) {
			res.json(data);
		});
	});

	app.post('/users', function(req, res) {
		var user = new model(req.body);
		service.create(user, function(data) {
			res.send('已增加');
		});
	});

	app.put('/users/:id', function(req, res) {
		service.update(req.params.id, req.body, function(data) {
			res.send('已修改');
		});
	});


	app.del('/users/:id', function(req, res){
		service.del(req.params.id, function(data) {
			res.send('已删除');
		});
	});

}
