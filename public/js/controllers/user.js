App.UserIndexController = Ember.ArrayController.extend({
    removeItem: function(user) {
		user.deleteRecord();
        user.transaction.commit();
    }
});

App.UserEditController = Ember.Controller.extend({
    updateItem: function(user) {
        user.transaction.commit();
        this.get('target').transitionTo('user');
    }
});