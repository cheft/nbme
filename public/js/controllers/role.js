NBME.RoleIndexController = Ember.ArrayController.extend({
    actions: {
        removeItem: function(role) {
            role.deleteRecord();
            role.save();
        }
    }
});

NBME.RoleEditController = Ember.ObjectController.extend({
    actions: {
        updateItem: function(role) {
            role.save();
            this.get('target').transitionTo('role');
        }
    }
});

NBME.RoleViewController = Ember.ObjectController.extend({
    actions: {
        
    }
});
