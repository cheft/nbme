var fs = require('fs');
var _ = require('underscore');

exports.createRoute = function(app, modelName) {
	var path = modelName + 's';
	var model = require('../models')[modelName];
	var service = require('../services').createService(model);
	var baseRoute = new BaseRoute(model, service);
	var route_path = __dirname + '/../routes/' + modelName + '.js';
	var f = fs.existsSync(route_path);
	var route = {};
	if(f) {
		route = require(route_path).createRoute(app, service);
	}
	route = _.extend(baseRoute, route);
	app.get('/' + path, route.list);
	app.get('/' + path + '/:id', route.get);
	app.post('/' + path, route.create);
	app.put('/' + path + '/:id', route.update);
	app.del('/' + path + '/:id', route.del);
};

var BaseRoute = function(model, service) {
	var route = {
		create: function(req, res) {
			var doc = new model(req.body);
			service.create(doc, function(data) {
				res.send(data);
			});
		},
		
		del: function(req, res) {
			service.del(req.params.id, function(data) {
				res.send(data);
			});
		},

		update: function(req, res) {
			service.update(req.params.id, req.body, function(data) {
				res.send(data);
			});
		},

		get: function(req, res) {
			service.get(req.params.id, function(err, data) {
				res.json(data);
			});
		},

		list: function(req, res) {
			service.list(function(err, data) {
				res.json(data);
			});
		}
	};
	return route;
};