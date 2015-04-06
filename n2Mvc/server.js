var http = require('http')
var querystring = require("querystring");
var requestHandler = require('./requestHandler.js');


function start(port){
	port = port || 1338;
	http.createServer(function(request, response) {
		var postData = '';
		request.on('data', function(chunk){
			console.log('Get: ' + chunk);
			postData += chunk;
		});
		request.on('end', function(){
			console.log('Get All Data');
			request.post = querystring.parse(postData);
			console.log('Post Data: ' + request.post);
			requestHandler.handler(request, response);
		});
	}).listen(port);
	console.log('server start on port 1338');
}


exports.start = start;