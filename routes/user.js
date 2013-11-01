var service = require('../services/user').createService();

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
		var username = req.body.username;
		var password = req.body.password;
		var password2 = req.body.password2;
		res.send("respond with a resource " + username + password2);
	});

	app.get('/users/open', function(req, res){
		var result = service.open();
		res.send("respond with a resource result: " + result);
	});

}