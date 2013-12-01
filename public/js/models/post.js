NBME.Post = DS.Model.extend({
    title: DS.attr('string'),
    body: DS.attr('string'),
    comments: DS.hasMany('comment', {
        async: true
    }),
    removeComments: function() {
        this.get('comments').then(function(c) {
        	var adapter = NBME.ApplicationAdapter.create();
            var ids = c.mapProperty('id');
            return adapter.ajax(adapter.buildURL(NBME.Comment.typeKey), 
            	'DELETE', { data: { ids: ids } });
        });
    }
});

NBME.Comment = DS.Model.extend({
    body: DS.attr('string'),
    date: DS.attr('date', {defaultValue: new Date()})
});
