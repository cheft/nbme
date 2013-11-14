var compressor = require('../scaffolds/compressors').Compressor;

exports.Route = function(app) {
    app.get('/hbs', compressor.html);
    app.get('/js', compressor.js);
    app.get('/css', compressor.css);
    app.get('/img', compressor.img);

    app.get('/', function(req, res) {
        res.sendfile('public/index.html');
    });
};
