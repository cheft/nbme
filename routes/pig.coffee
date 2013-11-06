exports.Route = (app) ->
	app.get '/pigs/:id', (req, res) ->
		res.send req.params.id