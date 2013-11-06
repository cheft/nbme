exports.Manager = function(model) {
	var mgr = {
		create: function(doc, callback) {
			model.create(doc, function (err) {
		        if(err) return callback(err);
		        return callback(doc);
		    });
		},
		del: function(query, callback) {
			model.remove(query, function(err) {
		        if(err) return callback(err);
		        return callback(true);
			});
		},
		update: function(conditions, update, options, callback) {
		    model.update(conditions, update, options, function (err) {
		        if(err) return callback(err);
		        return callback(true);
		    });
		},
		get: function(id, callback) {
			model.findOne({_id:id}, function(err, model){
		        if(err) return callback(err, null);
		        return callback(null, model);
		    });
		},
		count: function(query, callback) {
			model.count(query, function(err, model){
				if(error) return callback(error, null);
				return callback(null, model);
			});
		},
		query: function(query, fileds, opt, callback) {
			model.find(query, fileds, opt, function(err, model) {
				if(err) return callback(err, null);
				return  callback(null, model);
			});
		},
		list: function(callback) {
			model.find({}, function(err, model) {
				if(err) return callback(err, null);
				return callback(null, model);
			});
		}
	};
	return mgr;
};