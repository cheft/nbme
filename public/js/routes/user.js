App.UserIndexRoute = Ember.Route.extend({
    setupController: function(controller) {
        var users = App.User.find();
        controller.set('content', users);
    }
});

App.UserEditRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        this.controllerFor('user.edit').setProperties({
            content: model
        });
    }
});

App.UserNewRoute = Ember.Route.extend({
    setupController: function() {
        this.controllerFor('user.edit').setProperties({
            isNew: true,
            content: App.User.createRecord()
        });
    },
    renderTemplate: function() {
        this.render('user.edit', {into: 'application'});
    }
});