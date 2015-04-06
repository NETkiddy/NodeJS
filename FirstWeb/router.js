function route(handle, pathname, response, request){
	console.log("Ready to route request: " + pathname)

	if(typeof handle[pathname] === 'function'){
		return handle[pathname](response, request);
	}else{
		console.log('No request handler found for '+ pathname);
		return "404 Not found";//为什么必须要有return 否则直接报错
		response.writeHead(404,{"Content-Type":"text/plain"});
	    response.write("404 Not found");
	    response.end();
	}
}

exports.route = route;