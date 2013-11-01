var manager = require('../managers').createManager();

exports.createService = function() {

	var service = {
		open: function() {
			return manager.open();
		}
	};
	return service;
}