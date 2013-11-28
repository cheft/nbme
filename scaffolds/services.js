var fs = require('fs');
var _ = require('underscore');

exports.Service = function(model) {
    var manager = require('../scaffolds/managers').Manager(model);
    var baseSvc = new BaseSvc(manager);
    var service_path = __dirname + '/../services/' + model.modelName + '.js';
    var f = fs.existsSync(service_path);
    var service = {};
    if (f) {
        service = require(service_path).Service(manager);
    }
    service = _.extend(baseSvc, service);
    return service;
};

var BaseSvc = function(manager) {
    var svc = {
        create: function(doc, callback) {
            manager.create(doc, callback);
        },
        del: function(id, callback) {
            manager.del({
                _id: id
            }, callback);
        },
        update: function(id, doc, callback) {
            manager.update({
                _id: id
            }, {
                $set: doc
            }, null, callback);
        },
        get: function(id, callback) {
            manager.get(id, callback);
        },
        list: function(doc, callback) {
            manager.list(doc, callback);
        },
        query: function(doc, callback) {
            manager.query(doc, null, null, callback);
        },
        count: function(doc, callback) {
            manager.count(callback);
        }
    };
    return svc;
};
