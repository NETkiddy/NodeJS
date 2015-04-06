var http = require('http');
var url = require('url');

function start(route, handle) {

	http.createServer(onRequest).listen(1337);
	console.log('start server!');
}

exports.start = start;


	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log('Get request！！! ' + pathname);

		// var postData = '';
		// request.setEncoding("utf8");
		// request.addListener('data', function(chunk){
		// 	postData += chunk;
		// });
		// request.addListener('end', function(){
		// 	route(handle, pathname, response, postData);
		// });
		route(handle, pathname, response, request);
		
	}