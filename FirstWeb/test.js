var fs = require('fs');
fs.readFile('./myModule.js', function(err, data) {
	if(err) throw err;
	console.log('success');
});
console.log('async');