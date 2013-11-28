var App = Ember.Application.create({
    LOG_TRANSITIONS: true,
    ready: function() {
        this.initViews();
    },
    initViews: function() {
        _.each(window.hbs, function(i) {
            Ember.TEMPLATES[i.name] = Ember.Handlebars.compile(i.value);
        });
    }
});

App.Router.map(function() {
    this.route('index', {
        path: '/'
    });
    this.route('about', {
        path: '/about'
    });
    this.resource('location', function() {
        this.route('new', {
            path: '/new'
        });
        this.route('edit', {
            path: '/:location_id'
        });
    });
    this.resource('user', function() {
        this.route('new', {
            path: '/new'
        });
        this.route('edit', {
            path: '/:user_id'
        });
    });
    this.resource('post', function() {
        this.route('new', {
            path: '/new'
        });
        this.route('view', {
            path: '/view/:post_id'
        });
        this.route('edit', {
            path: '/:post_id'
        });
    });
});

App.ApplicationSerializer = DS.RESTSerializer.extend({
    primaryKey: '_id'
});

App.store = DS.Store.create({
    revision: 11,
    adapter: DS.RESTAdapter.create({
        bulkCommit: false
    })
});

App.EmbeddedSerializer = DS.RESTSerializer.extend({
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


App.EmbeddedAdapter = DS.RESTAdapter.extend({
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
