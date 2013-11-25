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
        var profile = this.store.createRecord('profile');
        var user = this.store.createRecord('user', {profile:　profile});
        this.controllerFor('user.edit').set('content', user);
    },
    renderTemplate: function() {
        this.render('user.edit', {into: 'application'});
    }
});
