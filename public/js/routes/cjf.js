NBME.Router.map(function() {
    this.resource('cjf', function() {
        this.route('new', {path: '/new'});
        this.route('view', {path: '/view/:cjf_id'});
        this.route('edit', {path: '/:cjf_id'});
    });
});

NBME.CjfIndexRoute = Ember.Route.extend({
    model: function() {
       return this.store.find('cjf');
    }
});

NBME.CjfViewRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        controller.set('content', model);
    }
});

NBME.CjfEditRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        controller.set('content', model);
    }
});

NBME.CjfNewRoute = Ember.Route.extend({
    setupController: function() {
        var cjf = this.store.createRecord('cjf');
        this.controllerFor('cjf.edit').set('content', cjf);
    },
    renderTemplate: function() {
        this.render('cjf.edit', {into: 'application'});
    }
});
