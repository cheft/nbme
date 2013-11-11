define(function(require) {

    var App = require('../app').App;
    var DS = require('../app').DS;

	App.Location = DS.Model.extend({
	    accuracy: DS.attr('string'),
	    longitude: DS.attr('string'),
	    latitude: DS.attr('string')
	});
});