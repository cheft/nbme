NBME.MenuView = Ember.View.extend({
    tagName: 'li',
    classNameBindings: ['active'],

    didInsertElement: function() {
        this._super();
        this.notifyPropertyChange('active');
        var _this = this;
        this.get('parentView').on('click', function(e) {
            window.setTimeout(function() {
                _this.notifyPropertyChange('active');
            }, 100);
        });
    },

    active: function() {
        return this.get('childViews.firstObject.active');
    }.property()
});
