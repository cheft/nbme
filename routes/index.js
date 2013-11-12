var compressor = require('../scaffolds/compressors').Compressor;

exports.Route = function(app) {
    
    compressor.preHtml();
    compressor.preJs();
    compressor.preCss();
    
    app.get('/html', compressor.html);
    app.get('/js', compressor.js);
    app.get('/css', compressor.css);

    app.get('/', function(req, res) {
        res.sendfile('public/index.html');
    });

    app.get('/tests/:id', function(req, res) {
        res.send('hello test and id is ' + req.params.id);
    });
};
