NBME.LocationIndexRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('location');
    }
});

NBME.LocationEditRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        controller.set('isNew', false).set('content', model);
    }
});

NBME.LocationNewRoute = Ember.Route.extend({
    setupController: function() {
        this.controllerFor('location.edit').set('isNew', true)
        .set('content', this.store.createRecord('location'));
    },
    renderTemplate: function() {
        this.render('location.edit', {into: 'application'});
    }
});
