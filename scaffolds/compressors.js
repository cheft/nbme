var fs = require('fs');
var _ = require('underscore');
var kompressor = require('htmlKompressor');
var UglifyJS = require('uglify-js');
var CleanCSS = require('clean-css');
var config = require('../devcfg.js');

exports.Compressor = {
    preHtml: function() {
        var views_path = __dirname + '/../views';
        var htmls = [];
        readHtml(views_path, views_path, htmls);
        fs.writeFile(__dirname + '/../public/hbs.js', 'window.hbs = ' + JSON.stringify(htmls), function() {
            console.log('hbs compress finished');
        });
    },
    html: function(req, res) {
        fs.readFile('D:/hbs.js', function(err, data) {
            var htmls = JSON.parse(data.toString());
            res.json(htmls);
        });
    },
    preJs: function() {
        var jses = '';
        jses = readJsList(__dirname + '/../public', config.jsList, jses);
        jses = readJs(__dirname + '/../public/js', jses);
        fs.writeFile(__dirname + '/../public/all.js', jses, function() {
            console.log('js compress finished');
        });
    },
    js: function(req, res) {
        res.download('D:/all.js', 'all.js');
    },
    preCss: function() {
        var csses = '';
        csses = readCssList(__dirname + '/../public', config.cssList, csses);
        csses = readCss(__dirname + '/../public/css', csses);
        fs.writeFile(__dirname + '/../public/all.css', csses, function() {
            console.log('css compress finished');
        });
    },
    css: function(req, res) {
        res.download('D:/all.css', 'all.css');
    },
    preImg: function() {
        console.log('img compress finished');
    }
};

var readHtml = function(basePath, path, htmls) {
    fs.readdirSync(path).forEach(function(file) {
        var suffix = file.substr(file.lastIndexOf('.', file.length));
        var stats = fs.statSync(path + '/' + file);
        if (stats.isFile()) {
            if ('.html' === suffix) {
                var tmp = fs.readFileSync(path + '/' + file);
                var value = kompressor(tmp.toString(), true);
                var name = (path + '/' + file).toString()
                    .replace(basePath + '/', '').replace('.html', '');
                htmls.push({name: name,value: value});
            }
        } else {
            readHtml(basePath, path + '/' + file, htmls);
        }
    });
};

var readCss = function(path, csses) {
    var css = new CleanCSS({keepSpecialComments: 0});
    fs.readdirSync(path).forEach(function(file) {
        var suffix = file.substr(file.lastIndexOf('.', file.length));
        var stats = fs.statSync(path + '/' + file);
        if (stats.isFile()) {
            if ('.css' === suffix) {
                var tmp = fs.readFileSync(path + '/' + file);
                var value = css.minify(tmp.toString());
                csses = csses + value;
            }
        } else {
            csses = readCss(path + '/' + file, csses);
        }
    });
    return csses;
};

var readCssList = function(path, cssList, csses) {
    var css = new CleanCSS({keepSpecialComments: 0});
    _.each(cssList, function(item) {
        var tmp = fs.readFileSync(path + '/' + item);
        var value = css.minify(tmp.toString());
        csses = csses + value;
    });
    return csses;
};

var readJs = function(path, jses) {
    fs.readdirSync(path).forEach(function(file) {
        var suffix = file.substr(file.lastIndexOf('.', file.length));
        var stats = fs.statSync(path + '/' + file);
        if (stats.isFile()) {
            if ('.js' === suffix) {
                var tmp = fs.readFileSync(path + '/' + file);
                var value = UglifyJS.minify(tmp.toString(), {fromString: true});
                jses = jses + value.code;
            }
        } else {
            jses = readJs(path + '/' + file, jses);
        }
    });
    return jses;
};

var readJsList = function(path, jsList, jses) {
    _.each(jsList, function(item) {
        var tmp = fs.readFileSync(path + '/' + item);
        var value = UglifyJS.minify(tmp.toString(), {fromString: true});
        jses = jses + value.code;
    });
    return jses;
};
