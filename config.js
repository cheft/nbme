module.exports = {
    cookieSecret: 'nbme',
    connectionUrl: 'mongodb://localhost/nbme',

    dev: true,
    jsList: [
        'lib/jquery/jquery-1.9.1.js',
        'lib/underscore/underscore.js',
        'lib/handlebars/handlebars.js',
        'lib/ember/ember.js',
        'lib/ember-data/ember-data.js',
        'lib/ember-mongo-adapter/mongo-adapter.js',
        'lib/bootstrap/js/bootstrap.js',
        'app.js'
    ],
    cssList: [
        'lib/bootstrap/css/bootstrap.min.css',
        'lib/bootstrap/css/bootstrap-theme.min.css'
    ]
};
