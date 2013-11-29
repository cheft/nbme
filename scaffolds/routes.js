var fs = require('fs');
var _ = require('underscore');
var pluralize = require('pluralize');

exports.Route = function(app, modelName) {
    var path = pluralize(modelName);
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
    app.del('/' + path, route.batchDel);
    app.post('/' + path + '/query', route.query);
};

var BaseRoute = function(model, service) {
    var route = {
        create: function(req, res) {
            var doc = new model(req.body[model.modelName]);
            service.create(doc, function(data) {
                var d = {};
                d[model.modelName] = data;
                res.json(d);
            });
        },
        del: function(req, res) {
            service.del(req.params.id, function(data) {
                res.json(data);
            });
        },
        batchDel: function(req, res) {
            var doc = {};
            if(req.body.ids && req.body.ids.length > 0) {
                doc._id = {$in: req.body.ids};
            }
            service.batchDel(doc, function(data) {
                res.json(data);
            });
        },
        update: function(req, res) {
            var doc = req.body[model.modelName];
            if(doc._id) {
                delete doc._id;
            }
            service.update(req.params.id, doc, function(data) {
                var d = {};
                d[model.modelName] = data;
                res.json(d);
            });
        },
        get: function(req, res) {
            service.get(req.params.id, function(data) {
                var d = {};
                d[model.modelName] = data;
                res.json(d);
            });
        },
        list: function(req, res) {
            var doc = {};
            if(req.query.ids && req.query.ids.length > 0) {
                doc._id = {$in: req.query.ids};
            }
            service.list(doc, function(data) {
                var d = {};
                d[pluralize(model.modelName)] = data;
                res.json(d);
            });
        },
        query: function(req, res) {
            var doc = req.body[model.modelName];
            service.query(doc, function(data) {
                var d = {};
                d[pluralize(model.modelName)] = data;
                res.json(d);
            });
        }
    };
    return route;
};
