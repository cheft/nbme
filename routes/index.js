exports.createRoute = function(app) {

	app.get('/', function(req, res){
		res.render('index', { title: 'Express' , test: 'Hello'});
	});

}