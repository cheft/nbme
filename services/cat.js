var model = require('../models').cat;
var manager = require('../managers').createManager(model);

exports.createService = function() {
	var service = {
		create: function(cat, callback) {
			manager.create(cat, callback);
		},
		
		del: function(id, callback) {
			manager.del({_id: id}, callback);
		},

		update: function(id, cat, callback) {
			manager.update({_id: id}, {$set: cat}, null, callback);
		},

		get: function(id, callback) {
			manager.get(id, callback);
		},

		list: function(callback) {
			manager.list(callback);
		}
	};
	return service;
}