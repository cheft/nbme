var fs = require('fs');

exports.each = function(path, callback) {
    fs.readdir(path, function(files) {
        files.forEach(function(file) {
            callback.call(this, file);
        });
    });
};

exports.eachSync = function(path, callback) {
    fs.readdirSync(path).forEach(function(file) {
        callback.call(this, file);
    });
};
