var mongoose = require('mongoose');
var config = require('../config');
var fs = require('fs');
var _ = require('underscore');
mongoose.connect(config.connectionUrl);

var db = mongoose.connection;

db.on('error', function(err) {
    console.error('connect to %s error: ', config.connectionUrl, err.message);
    process.exit(1);
});

db.once('open', function() {
    console.log('%s has been connected.', config.connectionUrl);
});

exports.scan = function(app) {
    var models_path = __dirname + '/../models';
    var scaffold_route = __dirname + '/../scaffolds/routes';
    fs.readdirSync(models_path).forEach(function(file) {
        var suffix = file.substr(file.lastIndexOf('.', file.length));
        if ('.js' === suffix) {
            var modelName = file.replace('.js', '');
            var exp = require(models_path + '/' + file);
            var model = _.isFunction(exp.Model) ? exp.Model() : exp.Model;
            var m = mongoose.model(modelName, model);
            exports[modelName] = m;
            require(scaffold_route).Route(app, m);
        }
    });
};