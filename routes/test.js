exports.createRoute = function(app) {

	app.get('/tests/:id', function(req, res){
		res.send('hello test and id is ' + req.params.id);
	});

}