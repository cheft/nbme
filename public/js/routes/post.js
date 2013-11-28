App.PostIndexRoute = Ember.Route.extend({
    model: function() {
       return this.store.find('post');
    }
});

App.PostViewRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        controller.set('content', model);
    }
});

App.PostEditRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        controller.set('content', model);
    }
});

App.PostNewRoute = Ember.Route.extend({
    setupController: function() {
        var post = this.store.createRecord('post');
        this.controllerFor('post.edit').set('content', post);
    },
    renderTemplate: function() {
        this.render('post.edit', {into: 'application'});
    }
});
