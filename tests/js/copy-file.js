var fs = require('fs');
var copyFile = function(source, dest) {
   var data = fs.readFileSync(source);
   fs.writeFileSync(dest, data);
};

for(var i = 0; i < 1000; i++) {
	copyFile('D:/Resource/Develop/git/nbme/models/cat.js',
		'D:/Resource/Develop/git/nbme/models/cat' + i + '.js');
}
