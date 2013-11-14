App.UserIndexController = Ember.ArrayController.extend({
	actions: {
	    removeItem: function(user) {
	        user.deleteRecord();
	        user.save();
	    }
	}
});

App.UserEditController = Ember.ObjectController.extend({
    actions: {
        updateItem: function(user) {
            user.save();
            this.get('target').transitionTo('user');
        }
    }
});
