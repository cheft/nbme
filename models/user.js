exports.Model = function() {
	var m = require('mongoose').Schema({
	    username: String,
	    password: String,
	    sex: Number,
	    email: String,
	    phone: String,
	    address: {city: String, street: String}
	});

	/*
	model.virtual("password").set(function (password) {
	    this.password = encryptPassword(password);
	});

	model.method("authenticate", function (plainText) {
	    return encryptPassword(plainText) === this.password;
	});
	
	function encryptPassword(password) {
	    return crypto.createHash("md5").update(password).digest("base64");
	}
	*/

	return m;
};
