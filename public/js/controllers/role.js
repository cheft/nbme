App.RoleIndexController = Ember.ArrayController.extend({
    actions: {
        removeItem: function(role) {
            role.deleteRecord();
            role.save();
        }
    }
});

App.RoleEditController = Ember.ObjectController.extend({
    actions: {
        updateItem: function(role) {
            role.save();
            this.get('target').transitionTo('role');
        }
    }
});

App.RoleViewController = Ember.ObjectController.extend({
    actions: {
        
    }
});
