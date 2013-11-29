App.<%= M %>IndexController = Ember.ArrayController.extend({
    actions: {
        removeItem: function(<%= m %>) {
            <%= m %>.deleteRecord();
            <%= m %>.save();
        }
    }
});

App.<%= M %>EditController = Ember.ObjectController.extend({
    actions: {
        updateItem: function(<%= m %>) {
            <%= m %>.save();
            this.get('target').transitionTo('<%= m %>');
        }
    }
});

App.<%= M %>ViewController = Ember.ObjectController.extend({
    actions: {
        
    }
});
