App.LocationIndexRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('location');
    }
});

App.LocationEditRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        controller.set('isNew', false).set('content', model);
    }
});

App.LocationNewRoute = Ember.Route.extend({
    setupController: function() {
        this.controllerFor('location.edit').set('isNew', true)
        .set('content', this.store.createRecord('location'));
    },
    renderTemplate: function() {
        this.render('location.edit', {into: 'application'});
    }
});
