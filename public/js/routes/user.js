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
        var user = this.store.createRecord('user', {username: 'test'});
        user.save().then(function(data) {
            var address = {city: '111', street: '2222', user: data};
            user.addAddress(address, function() {
                user.getAddresses(function(data) {
                    console.log(data);
                });

            });

        });
        this.controllerFor('user.edit').set('content', user);
    },
    renderTemplate: function() {
        this.render('user.edit', {into: 'application'});
    }
});
