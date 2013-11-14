module.exports = {
    cookieSecret: 'nbme',
    connectionUrl: 'mongodb://localhost/nbme',

    dev: true,
    jsList: [
        'lib/jquery/jquery-1.9.1.js',
        'lib/underscore/underscore.js',
        'lib/handlebars/handlebars.js',
        'lib/ember/ember-1.0.0-rc.7.js',
        'lib/ember-data/ember-data-0.14.js',
        'lib/bootstrap/js/bootstrap.js',
        'app.js'
    ],
    cssList: [
        'lib/bootstrap/css/bootstrap.min.css',
        'lib/bootstrap/css/bootstrap-theme.min.css'
    ]
};
