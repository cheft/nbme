var App = Ember.Application.create({
    LOG_TRANSITIONS: true,
    /*
    ready: function() {
        this.initView('index');
        this.initView('about');
        this.initView('location/index');
        this.initView('location/edit');
        this.initView('location/_location_form');
    },
    initView: function(name) {
        $.ajax({
            url: '/html/' + name + '.html',
            type: 'get',
            async: true,
            success: function(data) {
                Ember.TEMPLATES[name] = Ember.Handlebars.compile(data);
            },
            fail: function(err) {
                console.log(err);
            }
        });
    }
    */
    ready: function() {
        this.initView();
    },
    initView: function() {
        $.ajax({
            url: '/html',
            type: 'get',
            async: true,
            success: function(data) {
                _.each(data, function(i) {
                    Ember.TEMPLATES[i.name] = Ember.Handlebars.compile(i.value);
                });
            },
            fail: function(err) {
                console.log(err);
            }
        });
    }
});

App.Adapter = DS.RESTAdapter.extend({
    serializer: DS.RESTSerializer.extend({
        primaryKey: function() {
            return '_id';
        }
    })
});

App.Store = DS.Store.extend({
    revision: 12,
    adapter: 'App.Adapter'
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
});
