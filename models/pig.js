exports.createModel = function() {
	var model = require('mongoose').Schema({
	    name: String,
	    sex: String,
	    weight: Number
	});
	return model;
};