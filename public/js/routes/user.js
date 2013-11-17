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
        //console.log(Ember.String.pluralize('person'));
        var user = this.store.createRecord('user', {username: 'test'});
        var address = this.store.createRecord('address', {city: '111', street: '2222', user: user});
        user.get('address').addObject(address);
        console.log(JSON.stringify(user.toJSON()));
        this.controllerFor('user.edit').set('content', user);
    },
    renderTemplate: function() {
        this.render('user.edit', {into: 'application'});
    }
});
