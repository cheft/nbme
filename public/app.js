var NBME = Ember.Application.create({
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

NBME.Router.map(function() {
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
});

NBME.ApplicationSerializer = Ember.PartSerializer;
NBME.ApplicationAdapter = Ember.PartAdapter;
