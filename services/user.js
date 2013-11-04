var model = require('../models').user;
var manager = require('../managers').createManager(model);

exports.createService = function() {

	var service = {
		create: function(user, callback) {
			manager.create(user, callback);
		},
		
		del: function(id, callback) {
			manager.del({_id: id}, callback);
		},

		update: function(id, user, callback) {
			console.log({$set: user});
			manager.update({_id: id}, {$set: user}, null, callback);
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
