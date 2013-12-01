var fs = require('fs');
var ejs = require('ejs');
var _ = require('underscore');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var types = {
    string: String,
    date: Date,
    array: Array,
    number: Number,
    boolean: Boolean
};

var paths = {
    generates_path: __dirname + '/../generates',
    scaffold_route: __dirname + '/../scaffolds/routes',
    templates_path: __dirname + '/../templates',
    view_path: __dirname + '/../views',
    model_path: __dirname + '/../public/js/models',
    route_path: __dirname + '/../public/js/routes',
    controller_path: __dirname + '/../public/js/controllers'
}

exports.Generator = function(app) {
    fs.readdirSync(paths.generates_path).forEach(function(file) {
        var suffix = file.substr(file.lastIndexOf('.', file.length));
        if ('.js' === suffix) {
            var modelName = file.replace('.js', '');
            var info = require(paths.generates_path + '/' + file);
            gen(app, info, modelName);
        }
    });
};

var gen = function(app, info, modelName) {
    var model = {};
    for (var i in info) {
        model[i] = types[info[i].type];
    }
    try {
        fs.mkdirSync(paths.view_path + '/' + modelName);
    } catch (e) {
        // console.log(e);
    }
    ejsRender(paths.templates_path + '/index.html',
        paths.view_path + '/' + modelName + '/index.html', modelName, info);
    ejsRender(paths.templates_path + '/_form.html',
        paths.view_path + '/' + modelName + '/_form.html', modelName, info);
    ejsRender(paths.templates_path + '/view.html',
        paths.view_path + '/' + modelName + '/view.html', modelName, info);
    ejsRender(paths.templates_path + '/edit.html',
        paths.view_path + '/' + modelName + '/edit.html', modelName, info);

    ejsRender(paths.templates_path + '/model.js',
        paths.model_path + '/' + modelName + '.js', modelName, info);

    ejsRender(paths.templates_path + '/route.js',
        paths.route_path + '/' + modelName + '.js', modelName, info);

    ejsRender(paths.templates_path + '/controller.js',
        paths.controller_path + '/' + modelName + '.js', modelName, info);

    var m = mongoose.model(modelName, new Schema(model));
    exports[modelName] = m;
    require(paths.scaffold_route).Route(app, m);
}

var ejsRender = function(tpl, out, modelName, info) {
    var M = modelName.charAt(0).toUpperCase() + modelName.substr(1, modelName.length);
    var index_tpl = fs.readFileSync(tpl).toString();
    var index_cmp = ejs.render(index_tpl, {
        M: M,
        m: modelName,
        i: info
    });
    fs.writeFileSync(out, index_cmp);
}
