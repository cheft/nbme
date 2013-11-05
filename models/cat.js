var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.createModel = function() {
	var model = new Schema({
	    name: String,
	    color: String,
	    weight: Number
	});
	return model;
};