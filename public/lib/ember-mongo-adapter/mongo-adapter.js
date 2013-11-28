Ember.PartSerializer = DS.RESTSerializer.extend({
    primaryKey: '_id'
});

Ember.PartAdapter = DS.RESTAdapter.extend({
    updateRecord: function(store, type, record) {
        var d = {}, data = {};
        var id = record.get('id');
        var fields = Ember.get(type, 'fields');
        fields.forEach(function(field, kind) {
            if (kind === 'belongsTo') {
                d[field] = record.get(field).id;
            } else if (kind === 'hasMany') {
                d[field] = [];
                var hasManys = record.get(field).toArray();
                for (var i = 0; i < hasManys.length; i++) {
                    if (hasManys[i].id) {
                        d[field].push(hasManys[i].id);
                    }
                }
            } else {
                d[field] = record.get(field);
            }
        });
        data[type.typeKey] = d;
        return this.ajax(this.buildURL(type.typeKey, id), 'PUT', {
            data: data
        });
    },
});

Ember.FullSerializer = DS.RESTSerializer.extend({
    extractArray: function(store, type, payload) {
        var partials = Ember.String.pluralize(type.typeKey);
        var fields = Ember.get(type, 'fields');
        fields.forEach(function(field, kind) {
            if (kind === 'belongsTo') {
                var belongsTo = [];
                payload[partials].forEach(function(i) {
                    if (i[field]) {
                        var belongsToId = i[field]._id;
                        belongsTo = belongsTo.concat(i[field]);
                        i[field] = belongsToId;
                    }
                });
                payload[field] = belongsTo;
            } else if (kind === 'hasMany') {
                var hasMany = [];
                payload[partials].forEach(function(i) {
                    if (i[field] && i[field].length > 0) {
                        var hasManyIds = i[field].mapProperty('_id');
                        hasMany = hasMany.concat(i[field]);
                        i[field] = hasManyIds;
                    }
                });
                payload[field] = hasMany;
            }
        });
        return this._super.apply(this, arguments);
    },
    extractSingle: function(store, type, payload) {
        var partials = type.typeKey;
        var fields = Ember.get(type, 'fields');
        fields.forEach(function(field, kind) {
            if (kind === 'belongsTo') {
                var belongsTo = payload[partials][field];
                if (belongsTo) {
                    var belongsToId = payload[partials][field]._id;
                    payload[field] = [belongsTo];
                    payload[partials][field] = belongsToId;
                }
            } else if (kind === 'hasMany') {
                var hasMany = payload[partials][field];
                if (hasMany && hasMany.length > 0) {
                    hasManyIds = hasMany.mapProperty('_id');
                    payload[field] = hasMany;
                    payload[partials][field] = hasManyIds;
                }
            }
        });
        return this._super.apply(this, arguments);
    },
    normalize: function(type, hash, property) {
        var json = {
            id: hash._id
        };
        delete hash._id;
        for (var prop in hash) {
            json[prop.camelize()] = hash[prop];
        }
        return this._super(type, json, property);
    }
});


Ember.FullAdapter = DS.RESTAdapter.extend({
    createRecord: function(store, type, record) {
        var d = {}, data = {};
        var fields = Ember.get(type, 'fields');
        fields.forEach(function(field, kind) {
            if (kind === 'belongsTo') {
                var belongsTo = record.get(field).toJSON();
                d[field] = belongsTo;
            } else if (kind === 'hasMany') {
                d[field] = [];
                var hasMany = record.get(field).toArray();
                for (var i = 0; i < hasMany.length; i++) {
                    d[field].push(hasMany[i].toJSON());
                }
            } else {
                d[field] = record.get(field);
            }
        });
        data[type.typeKey] = d;
        return this.ajax(this.buildURL(type.typeKey), 'POST', {
            data: data
        });
    },
    updateRecord: function(store, type, record) {
        var d = {}, data = {};
        var id = record.get('id');
        var fields = Ember.get(type, 'fields');
        fields.forEach(function(field, kind) {
            if (kind === 'belongsTo') {
                var belongsTo = record.get(field).toJSON();
                if (record.get(field).id) {
                    belongsTo._id = record.get(field).id;
                }
                d[field] = belongsTo;
            } else if (kind === 'hasMany') {
                d[field] = [];
                var hasManys = record.get(field).toArray();
                for (var i = 0; i < hasManys.length; i++) {
                    var hasMany = hasManys[i].toJSON();
                    if (hasManys[i].id) {
                        hasMany._id = hasManys[i].id;
                    }
                    d[field].push(hasMany);
                }
            } else {
                d[field] = record.get(field);
            }
        });
        data[type.typeKey] = d;
        return this.ajax(this.buildURL(type.typeKey, id), 'PUT', {
            data: data
        });
    },
});

