var NBME = Ember.Application.create({
    LOG_TRANSITIONS: true,
    ready: function() {
        this.initViews();
    },
    initViews: function() {
        for(var p in window.hbs) {
            Ember.TEMPLATES[p] = Ember.Handlebars.compile(window.hbs[p]);
        };
    }
});

NBME.Router.map(function() {
    this.route('index', {
        path: '/'
    });
    this.route('about', {
        path: '/about'
    });
});

NBME.ApplicationSerializer = Ember.PartSerializer;
NBME.ApplicationAdapter = Ember.PartAdapter;

//  auth
/*
Ember.Application.initializer({
    name: 'authentication',
    initialize: function(container, application) {
        Ember.SimpleAuth.setup(container, application);
    }
});

NBME.Router.map(function() {
    this.route('login');
    this.route('protected');
});

NBME.ApplicationRoute = Ember.Route.extend(Ember.SimpleAuth.ApplicationRouteMixin, {
    actions: {
        login: function() {
            window.open('');
        }
    }
});

NBME.ProtectedRoute = Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin);
NBME.LoginController = Ember.Controller.extend(Ember.SimpleAuth.LoginControllerMixin);*/
