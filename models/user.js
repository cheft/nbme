var Schema = require('mongoose').Schema,
    ObjectId = Schema.Types.ObjectId;
    
exports.Model = function() {
    var m = new Schema({
        username: String,
        hashpwd: String,
        sex: String,
        email: String,
        phone: String,
        profile: ObjectId,
        addresses: Array
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
