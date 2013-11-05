exports.createRoute = function(app) {

	app.get('/', function(req, res){
		res.render('index', { title: 'Express' , test: 'Hello'});
	});

	app.get('/tests/:id', function(req, res){
		res.send('hello test and id is ' + req.params.id);
	});

};