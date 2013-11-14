App.LocationEditController = Ember.ObjectController.extend({
    actions: {
        updateItem: function(location) {
            location.save();
            this.get('target').transitionTo('location');
        }
    },
    isNew: function() {
        return this.get('content').get('id');
    }
});

App.LocationIndexController = Ember.ArrayController.extend({
    actions: {
        removeItem: function(location) {
            location.deleteRecord();
            location.save();
        },
        removeSelectedLocations: function() {
            arr = this.filterProperty('selected', true);
            if (arr.length === 0) {
                output = 'nothing selected';
            } else {
                output = '';
                for (i = 0; i < arr.length; i++) {
                    arr[i].deleteRecord();
                    arr[i].save();
                }
            }
        }
    },
    editCounter: function() {
        return this.filterProperty('selected', true).get('length');
    }.property('@each.selected'),

    itemsSelected: function() {
        return this.get('editCounter') > 0;
    }.property('editCounter'),
    locationsPresent: function() {
        var itemsPresent = this.get('content').content.length > 0;
        return itemsPresent;
    }.property('content.@each')
});
