define(function(require) {

    var App = require('../app').App;
    var Ember = require('../app').Ember;


    App.LocationsIndexRoute = Ember.Route.extend({
        setupController: function(controller) {
            var locations = App.Location.find();
            locations.on('didLoad', function() {
                console.log(' +++ Locations loaded!');
            });
            controller.set('content', locations);
        },
        renderTemplate: function() {
            this.render('locations.index', {
                into: 'application'
            });
        }
    });

    App.LocationsEditRoute = Ember.Route.extend({
        setupController: function(controller, model) {
            this.controllerFor('locations.edit').setProperties({
                isNew: false,
                content: model
            });
        },

        renderTemplate: function() {
            this.render('locations.edit', {
                into: 'application'
            });
        }
    });

    App.LocationsNewRoute = Ember.Route.extend({
        setupController: function() {
            this.controllerFor('locations.edit').setProperties({
                isNew: true,
                content: App.Location.createRecord()
            });
        },
        renderTemplate: function() {
            this.render('locations.edit', {
                into: 'application'
            });
        }
    });
});