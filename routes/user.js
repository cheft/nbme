var service = require('../services/user').createService();
var model = require('../models').user;

exports.createRoute = function(app) {

	app.get('/users', function(req, res) {
		service.list(function(err, data) {
			res.json(data);
		});
	});

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
		var username = req.body.username;
		var password = req.body.password;
		var password2 = req.body.password2;
		var user = new model(req.body);
		service.create(user, function(data) {
        	res.json(user);
		});
	});

	app.get('/users/open', function(req, res){
		var result = service.open();
		res.send("respond with a resource result: " + result);
	});

}