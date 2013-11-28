App.Post = DS.Model.extend({
    title: DS.attr('string'),
    body: DS.attr('string'),
    comments: DS.hasMany('comment', {
        async: true
    })
});

App.Comment = DS.Model.extend({
    body: DS.attr('string'),
    date: DS.attr('date'),
    post: DS.belongsTo('post'),
});
