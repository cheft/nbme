var mongoose = require('mongoose');
var config = require('../config');
var fs = require('fs');

mongoose.connect(config.connectionUrl);

var db = mongoose.connection;

db.on('error', function(err){
    console.error('connect to %s error: ', config.connectionUrl, err.message);
    process.exit(1);
});

db.once('open', function () {
    console.log('%s has been connected.', config.connectionUrl);
});

exports.scan = function(app) {
	var models_path = __dirname + '/../models';
	var routes_path = __dirname + '/../routes';
	fs.readdirSync(models_path).forEach(function (file) {
		if('index.js' != file) {
			var modelName = file.replace('.js', '');
			var model = require(models_path + '/' + file).createModel();
		    exports[modelName] = mongoose.model(modelName, model);
		    require(routes_path).createRoute(app, modelName);
		}
	});
};