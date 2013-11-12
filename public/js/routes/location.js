App.AboutRoute = Ember.Route.extend({
    renderTemplate: function() {
        this.render('about', {
            into: 'application'
        });
    }
});

App.LocationIndexRoute = Ember.Route.extend({
    setupController: function(controller) {
        var locations = App.Location.find();
        locations.on('didLoad', function() {
            console.log(' +++ Locations loaded!');
        });
        controller.set('content', locations);
    },
    renderTemplate: function() {
        this.render('location.index', {
            into: 'application'
        });
    }
});

App.LocationEditRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        this.controllerFor('location.edit').setProperties({
            isNew: false,
            content: model
        });
    },

    renderTemplate: function() {
        this.render('location.edit', {
            into: 'application'
        });
    }
});

App.LocationNewRoute = Ember.Route.extend({
    setupController: function() {
        this.controllerFor('location.edit').setProperties({
            isNew: true,
            content: App.Location.createRecord()
        });
    },
    renderTemplate: function() {
        this.render('location.edit', {
            into: 'application'
        });
    }
});
