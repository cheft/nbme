exports.Manager = function(model) {
    var mgr = {
        create: function(doc, callback) {
            model.create(doc, function(err, doc) {
                if (err) return callback(err);
                return callback(doc);
            });
        },
        del: function(query, callback) {
            model.remove(query, function(err, doc) {
                if (err) return callback(err);
                return callback(doc);
            });
        },
        update: function(conditions, update, options, callback) {
            model.findOneAndUpdate(conditions, update, options, function(err, doc) {
                if (err) return callback(err);
                return callback(doc);
            });
        },
        get: function(id, callback) {
            model.findOne({
                _id: id
            }, function(err, doc) {
                if (err) return callback(err);
                return callback(doc);
            });
        },
        count: function(query, callback) {
            model.count(query, function(err, doc) {
                if (error) return callback(error);
                return callback(doc);
            });
        },
        query: function(query, fileds, opt, callback) {
            model.find(query, fileds, opt, function(err, doc) {
                if (err) return callback(err);
                return callback(doc);
            });
        },
        list: function(doc, callback) {
            model.find(doc, function(err, doc) {
                if (err) return callback(err);
                return callback(doc);
            });
        }
    };
    return mgr;
};
