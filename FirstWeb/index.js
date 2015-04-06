var server = require('./server.js');
var router = require('./router.js');
var requestHandler = require('./requestHandler.js');

var handle = {};
for (var propertyName in requestHandler)
	handle['/' + propertyName] = requestHandler[propertyName]
	exports[''] = requestHandler.start
// handle['/'] = requestHandler.start;
// handle['/start'] = requestHandler.start;
// handle['/upload'] = requestHandler.upload;
// handle['/show'] = requestHandler.show;
// handle['/help'] = requestHandler.help;

server.start(router.route, handle);