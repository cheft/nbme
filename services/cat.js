exports.createService = function(manager) {
	var service = {
		get: function(id, callback) {
			console.log('cat...............');
			manager.get(id, callback);
		}
	};
	return service;
};