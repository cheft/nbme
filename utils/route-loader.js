var fs = require('fs');

exports.autoLoad = function(app, routePath) {
	fs.readdir(routePath,  function(err, files) {
		if(err) {
			console.error('Please mkdir routes in the root directory...')
			return;
		}
		var _len = files.length;
		if(_len > 0) {
			var i = 0;
			for(i; i < _len; i++) {
				require(routePath + '/' + files[i]).createRoute(app);
			}
		}
	});
}