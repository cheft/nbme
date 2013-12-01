NBME.<%= M %>IndexController = Ember.ArrayController.extend({
    actions: {
        removeItem: function(<%= m %>) {
            <%= m %>.deleteRecord();
            <%= m %>.save();
        }
    }
});

NBME.<%= M %>EditController = Ember.ObjectController.extend({
    actions: {
        updateItem: function(<%= m %>) {
            <%= m %>.save();
            this.get('target').transitionTo('<%= m %>');
        }
    }
});

NBME.<%= M %>ViewController = Ember.ObjectController.extend({
    actions: {
        
    }
});
