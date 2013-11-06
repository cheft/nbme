exports.Service = function(manager) {
	var svc = {
		get: function(id, callback) {
			console.log('cat...............');
			manager.get(id, callback);
		}
	};
	return svc;
};