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
		res.send('respond with a resource ' + username  + password);
	});

	app.post('/users/reg', function(req, res){
		res.send('reg');
	});

};
