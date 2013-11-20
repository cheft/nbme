exports.Model = function() {
    var m = require('mongoose').Schema({
        username: String,
        hashpwd: String,
        sex: String,
        email: String,
        phone: String,
        addresses: [{
            city: String,
            street: String
        }]
    });

    /*
    m.virtual('password').set(function(password) {
        this.hashpwd = encryptPassword(password);
    });

    m.method('authenticate', function(plainText) {
        return encryptPassword(plainText) === this.hashpwd;
    });

    function encryptPassword(password) {
        return require('crypto').createHash('md5').update(password).digest('base64');
    }
    */
    return m;
};
