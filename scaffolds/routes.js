var fs = require('fs');
var _ = require('underscore');
var config = require('../config');

exports.Route = function(app, modelName) {
    var path = modelName + 's';
    var model = require('../scaffolds/models')[modelName];
    var service = require('../scaffolds/services').Service(model);
    var baseRoute = new BaseRoute(model, service);
    var route_path = __dirname + '/../routes/' + modelName + '.js';
    var f = fs.existsSync(route_path);
    var route = {};
    if (f) {
        route = require(route_path).Route(app, service);
    }
    route = _.extend(baseRoute, route);
    app.get('/' + path, route.list);
    app.get('/' + path + '/:id', route.get);
    app.post('/' + path, route.create);
    app.put('/' + path + '/:id', route.update);
    app.del('/' + path + '/:id', route.del);
    
    var view = require('../scaffolds/views').View;
    app.get('/html', view.html);
};

var BaseRoute = function(model, service) {
    var route = {
        create: function(req, res) {
            var doc = {};
            if(config.jsonRoot) {
                doc = new model(req.body[model.modelName]);
            } else{
                doc = new model(req.body);
            }
            service.create(doc, function(data) {
                var d = {};
                if(config.jsonRoot) {
                    d[model.modelName] = data;
                } else{
                    d = data;
                }
                res.json(d);
            });
        },
        del: function(req, res) {
            service.del(req.params.id, function(data) {
                res.send(data);
            });
        },
        update: function(req, res) {
            var doc = {};
            if(config.jsonRoot) {
                doc = req.body[model.modelName];
            } else{
                doc = req.body;
            }
            if(doc._id) {
                delete doc._id;
            }
            service.update(req.params.id, doc, function(data) {
                res.send(data);
            });
        },
        get: function(req, res) {
            service.get(req.params.id, function(err, data) {
                var d = {};
                if(config.jsonRoot) {
                    d[model.modelName] = data;
                } else{
                    d = data;
                }
                res.json(d);
            });
        },
        list: function(req, res) {
            service.list(function(err, data) {
                var d = {};
                if(config.jsonRoot) {
                    d[model.modelName + 's'] = data;
                } else{
                    d = data;
                }
                res.json(d);
            });
        }
    };
    return route;
};
