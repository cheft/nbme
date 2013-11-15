App.User = DS.Model.extend({
    username: DS.attr('string'),
    hashpwd: DS.attr('string'),
    sex: DS.attr('string'),
    email: DS.attr('string'),
    phone: DS.attr('string'),
    address: DS.hasMany('person')
});

App.Person = DS.Model.extend({
	city: DS.attr('string'),
    street: DS.attr('string'),
    user: DS.belongsTo('user')
});
