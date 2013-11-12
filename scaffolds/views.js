var fs = require('fs');
var kompressor = require('htmlKompressor');

exports.View = {
	html: function(req, res) {
		var views_path = __dirname + '/../views';
		var htmls = [];
		commonReadDir(views_path, views_path, htmls);
	    res.json(htmls);
	}
};

var commonReadDir = function(basePath, path, htmls) {
	fs.readdirSync(path).forEach(function(file) {
		var suffix = file.substr(file.lastIndexOf('.', file.length));
		var stats = fs.statSync(path + '/' + file);
		if(stats.isFile()) {
	        if ('.html' === suffix) {
	            var tmp = fs.readFileSync(path + '/' + file);
	            var value = kompressor(tmp.toString(), true);
	            var name = (path + '/' + file).toString()
	            .replace(basePath + '/', '').replace('.html', '');
	            htmls.push({name: name, value: value});
	        }
	    }else {
			commonReadDir(basePath, path + '/' + file, htmls);
	    }
    });
};