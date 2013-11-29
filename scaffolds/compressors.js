var fs = require('fs');
var _ = require('underscore');
var kompressor = require('htmlKompressor');
var UglifyJS = require('uglify-js');
var CleanCSS = require('clean-css');
var smushit = require('node-smushit');
var config = require('../config');

module.exports = {
    html: function(req, res) {
        var views_path = __dirname + '/../views';
        var htmls = [];
        readHtml(views_path, views_path, htmls);
        res.attachment('hbs.js');
        res.send('window.hbs = ' + JSON.stringify(htmls));
    },
    js: function(req, res) {
        var jses = '';
        jses = readJsList(__dirname + '/../public', config.js, jses);
        jses = readJs(__dirname + '/../public/js', jses);
        res.attachment('all.js');
        res.send(jses);
    },
    css: function(req, res) {
        var csses = '';
        csses = readCssList(__dirname + '/../public', config.css, csses);
        csses = readCss(__dirname + '/../public/css', csses);
        res.attachment('all.css');
        res.send(csses);
    },
    img: function(req, res) {
       smushit.smushit(__dirname + '/../public/img', {
            onComplete: function(reports) {
                res.send(reports);
            },
            recursive: true
        });
    }
};

var readHtml = function(basePath, path, htmls) {
    fs.readdirSync(path).forEach(function(file) {
        var stats = fs.statSync(path + '/' + file);
        if (stats.isFile()) {
            var suffix = file.substr(file.lastIndexOf('.', file.length));
            if ('.html' === suffix) {
                var name = (path + '/' + file).toString()
                    .replace(basePath + '/', '').replace('.html', '');
                var tmp = fs.readFileSync(path + '/' + file);
                if(config.dev) {
                    htmls.push({name: name,value: tmp.toString()});
                }else {
                    var value = kompressor(tmp.toString(), true);
                    htmls.push({name: name,value: value});
                }
            }
        } else {
            readHtml(basePath, path + '/' + file, htmls);
        }
    });
};

var readCss = function(path, csses) {
    var css = new CleanCSS({keepSpecialComments: 0});
    fs.readdirSync(path).forEach(function(file) {
        var stats = fs.statSync(path + '/' + file);
        if (stats.isFile()) {
            var suffix = file.substr(file.lastIndexOf('.', file.length));
            if ('.css' === suffix) {
                var tmp = fs.readFileSync(path + '/' + file);
                if(config.dev) {
                    csses = csses + tmp.toString();
                }else {
                    var value = css.minify(tmp.toString());
                    csses = csses + value;
                }
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
        if(config.dev) {
            csses = csses + tmp.toString();
        }else {
            var value = css.minify(tmp.toString());
            csses = csses + value;
        }
    });
    return csses;
};

var readJs = function(path, jses) {
    fs.readdirSync(path).forEach(function(file) {
        var stats = fs.statSync(path + '/' + file);
        if (stats.isFile()) {
            var suffix = file.substr(file.lastIndexOf('.', file.length));
            if ('.js' === suffix) {
                var tmp = fs.readFileSync(path + '/' + file);
                if(config.dev) {
                    jses = jses + tmp.toString();
                }else {
                    var value = UglifyJS.minify(tmp.toString(), {fromString: true});
                    jses = jses + value.code;
                }
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
        if(config.dev) {
            jses = jses + tmp.toString();
        }else {
            var value = UglifyJS.minify(tmp.toString(), {fromString: true});
            jses = jses + value.code;
        }
    });
    return jses;
};
