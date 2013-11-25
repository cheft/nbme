App.User = DS.Model.extend({
    username: DS.attr('string'),
    hashpwd: DS.attr('string'),
    sex: DS.attr('string'),
    email: DS.attr('string'),
    phone: DS.attr('string'),
    profile: DS.belongsTo('profile'),
    addresses: DS.hasMany('address', { async: true })
});

App.Address = DS.Model.extend({
    city: DS.attr('string'),
    street: DS.attr('string'),
    user: DS.belongsTo('user')
});

App.Profile = DS.Model.extend({
    about: DS.attr('string'),
    card: DS.attr('string'),
    user: DS.belongsTo('user')
});
