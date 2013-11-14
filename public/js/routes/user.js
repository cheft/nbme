App.UserIndexRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('user');
    }
});

App.UserEditRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        controller.set('content', model);
    }
});

App.UserNewRoute = Ember.Route.extend({
    setupController: function() {
        this.controllerFor('user.edit').set('content', this.store.createRecord('user'));
    },
    renderTemplate: function() {
        this.render('user.edit', {into: 'application'});
    }
});
