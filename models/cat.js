exports.createModel = function() {
	var model = require('mongoose').Schema({
	    name: String,
	    color: String,
	    weight: Number
	});
	return model;
};