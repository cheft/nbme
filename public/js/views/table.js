NBME.TableView = Ember.View.extend({
    templateName: '_view/table',
    didInsertElement: function() {
        var col = {
            name: {label: '名称'},
            title: {label: '标题'}
        };
        console.log(this);
        //console.log(Ember.Handlebars.compile(window.hbs['_view/table']));
    }
});
