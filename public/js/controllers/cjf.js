NBME.CjfIndexController = Ember.ArrayController.extend({
    actions: {
        removeItem: function(cjf) {
            cjf.deleteRecord();
            cjf.save();
        }
    }
});

NBME.CjfEditController = Ember.ObjectController.extend({
    actions: {
        updateItem: function(cjf) {
            cjf.save();
            this.get('target').transitionTo('cjf');
        }
    }
});

NBME.CjfViewController = Ember.ObjectController.extend({
    actions: {
        
    }
});
