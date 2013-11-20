App.User = DS.Model.extend({
    username: DS.attr('string'),
    hashpwd: DS.attr('string'),
    sex: DS.attr('string'),
    email: DS.attr('string'),
    phone: DS.attr('string'),
    addresses: DS.hasMany('address'),
    addAddress: function(address, callback) {
        var self = this;
        addr = this.get('store').createRecord('address', address);
        addr.save().then(function() {
            self.get('addresses').pushObject(addr);
            self.save().then(callback);
        });
    },
    getAddresses: function(callback) {
        $.get('/addresses/users/' + this.get('id'), callback);
    }
});

App.Address = DS.Model.extend({
    city: DS.attr('string'),
    street: DS.attr('string'),
    user: DS.belongsTo('user')
});

App.UserAdapter = DS.RESTAdapter.extend({
    findAllaa: function() {
        $.get('/users', function(data) {
            console.log(data);
            return data.users;
        });
    }
});
