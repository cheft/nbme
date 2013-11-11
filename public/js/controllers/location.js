define(function(require) {

    var App = require('../app').App;
    var Ember = require('../app').Ember;

    App.LocationsEditController = Ember.ObjectController.extend({
        updateItem: function(location) {
            location.transaction.commit();
            this.get('target').transitionTo('locations');
        },
        isNew: function() {
            return this.get('content').get('id');
        }
    });

    App.LocationsIndexController = Ember.ArrayController.extend({

        editCounter: function() {
            return this.filterProperty('selected', true).get('length');
        }.property('@each.selected'),

        itemsSelected: function() {
            return this.get('editCounter') > 0;
        }.property('editCounter'),

        removeItem: function(location) {
            location.on('didDelete', this, function() {
                console.log('record deleted');
            });

            location.deleteRecord();
            location.transaction.commit();
        },

        removeSelectedLocations: function() {
            arr = this.filterProperty('selected', true);
            if (arr.length === 0) {
                output = 'nothing selected';
            } else {
                output = '';
                for (i = 0; i < arr.length; i++) {
                    arr[i].deleteRecord();
                    arr[i].store.commit();
                }
            }
        },
        locationsPresent: function() {
            var itemsPresent = this.get('content').content.length > 0;
            return itemsPresent;
        }.property('content.@each')
    });
});