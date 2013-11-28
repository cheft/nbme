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
        var about = this.store.createRecord('about');
        var address = this.store.createRecord('address');
        var user = this.store.createRecord('user', {about: about});
        user.get('addresses').pushObject(address);
        this.controllerFor('user.edit').set('content', user);
    },
    renderTemplate: function() {
        this.render('user.edit', {into: 'application'});
    }
});
