App = Ember.Application.createWithMixins(Bootstrap.Register);

App.Router.map(function() {
    this.resource('index', {
        path: '/'
    });
    this.route('about', {
        path: '/about'
    });
    this.route('favorites', {
        path: '/favs'
    });
});
