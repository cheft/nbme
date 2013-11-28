exports.Service = function(manager) {
    var svc = {
        get: function(id, callback) {
            manager.get(id, callback);
        }
    };
    return svc;
};
