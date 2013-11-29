App.Router.map(function() {
    this.resource('<%= m %>', function() {
        this.route('new', {path: '/new'});
        this.route('view', {path: '/view/:<%= m %>_id'});
        this.route('edit', {path: '/:<%= m %>_id'});
    });
});

App.<%= M %>IndexRoute = Ember.Route.extend({
    model: function() {
       return this.store.find('<%= m %>');
    }
});

App.<%= M %>ViewRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        controller.set('content', model);
    }
});

App.<%= M %>EditRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        controller.set('content', model);
    }
});

App.<%= M %>NewRoute = Ember.Route.extend({
    setupController: function() {
        var <%= m %> = this.store.createRecord('<%= m %>');
        this.controllerFor('<%= m %>.edit').set('content', <%= m %>);
    },
    renderTemplate: function() {
        this.render('<%= m %>.edit', {into: 'application'});
    }
});
