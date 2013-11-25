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
            var profile = user.get('profile');
            profile.set('about', profile.get('card'));
            profile.save().then(function() {
                user.save().then(function() {
                    profile.set('user', user);
                    profile.save();
                });
            });
            this.get('target').transitionTo('user');
        },
        addEmptyAddress: function(user) {
            console.log(user);
            var address = this.store.createRecord('address', {city: null, street: null});
            console.log(user.get('addresses').length);
            //user.get('addresses').pushObject(address);
        }
    }
});
