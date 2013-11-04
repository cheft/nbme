var model = require('../models').user;
var manager = require('../managers').createManager(model);

exports.createService = function() {

	var service = {
		create: function(user, callback) {
			manager.create(user, callback);
		},
		list: function(callback) {
			manager.list(callback);
		}
	};
	return service;
}