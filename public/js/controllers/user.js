NBME.UserIndexController = Ember.ArrayController.extend({
    actions: {
        removeItem: function(user) {
            user.deleteRecord();
            user.save();
        }
    }
});

NBME.UserEditController = Ember.ObjectController.extend({
    actions: {
        updateItem: function(user) {
            user.save();
            this.get('target').transitionTo('user');

        },
        addEmptyAddress: function(user) {
            var address = this.store.createRecord('address');
            user.get('addresses').addObject(address);
        }
    }
});
