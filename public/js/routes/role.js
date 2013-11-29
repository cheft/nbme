App.Router.map(function() {
    this.resource('role', function() {
        this.route('new', {path: '/new'});
        this.route('view', {path: '/view/:role_id'});
        this.route('edit', {path: '/:role_id'});
    });
});

App.RoleIndexRoute = Ember.Route.extend({
    model: function() {
       return this.store.find('role');
    }
});

App.RoleViewRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        controller.set('content', model);
    }
});

App.RoleEditRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        controller.set('content', model);
    }
});

App.RoleNewRoute = Ember.Route.extend({
    setupController: function() {
        var role = this.store.createRecord('role');
        this.controllerFor('role.edit').set('content', role);
    },
    renderTemplate: function() {
        this.render('role.edit', {into: 'application'});
    }
});
