var mongoose = require('mongoose');

exports.createManager = function() {
	mongoose.connect('mongodb://localhost/blog');
	var db = mongoose.connection;
	var manager = {
		open: function() {
			console.log(db);
			return 'open';
		},
		get: function() {

		},
		list: function() {

		},
		create: function() {

		},
		update: function() {

		},
		delete: function() {

		}
	};
	return manager;
}