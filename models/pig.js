exports.Model = function() {
	var m = require('mongoose').Schema({
	    name: String,
	    sex: String,
	    weight: Number
	});
	return m;
};