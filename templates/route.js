NBME.Router.map(function() {
    this.resource('<%= m %>', function() {
        this.route('new', {path: '/new'});
        this.route('view', {path: '/view/:<%= m %>_id'});
        this.route('edit', {path: '/:<%= m %>_id'});
    });
});

NBME.<%= M %>IndexRoute = Ember.Route.extend({
    model: function() {
       return this.store.find('<%= m %>');
    }
});

NBME.<%= M %>ViewRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        controller.set('content', model);
    }
});

NBME.<%= M %>EditRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        controller.set('content', model);
    }
});

NBME.<%= M %>NewRoute = Ember.Route.extend({
    setupController: function() {
        var <%= m %> = this.store.createRecord('<%= m %>');
        this.controllerFor('<%= m %>.edit').set('content', <%= m %>);
    },
    renderTemplate: function() {
        this.render('<%= m %>.edit', {into: 'application'});
    }
});
