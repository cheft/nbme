NBME.Router.map(function() {
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

NBME.PostIndexRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('post');
    }
});

NBME.PostViewRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        controller.set('content', model);
    }
});

NBME.PostEditRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        controller.set('content', model);
    }
});

NBME.PostNewRoute = Ember.Route.extend({
    setupController: function() {
        var post = this.store.createRecord('post');
        this.controllerFor('post.edit').set('content', post);
    },
    renderTemplate: function() {
        this.render('post.edit', {
            into: 'application'
        });
    }
});
