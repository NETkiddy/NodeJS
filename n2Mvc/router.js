var parseUrl = require('url').parse;

var routes = {get:[], post:[], head:[], put:[], delete:[]};

function map(dict){
	console.log('map start');
	console.log('dict.url: ' + dict.url);
	console.log('dict.controller: ' + dict.controller);
	console.log('dict.action: ' + dict.action);

	if(dict && dict.url && dict.controller){
		var method = dict.method ? dict.method.toLowerCase(): 'get';
		console.log('map method: ' + method);
		routes[method].push({
			u: dict.url,
			c: dict.controller,
			a: dict.action || index
		});
	}
}

function getActionInfo(url, method){
	console.log('getActionInfo start');
	var r = {controller:null, action:null, args:null};
	console.log('getActionInfo method: ' + method);
	var	method = method ? method.toLowerCase(): 'get';
	console.log('getActionInfo url: ' + url);
	var pathname = parseUrl(url).pathname;
	console.log('getActionInfo pathname: ' + pathname);
	var m_routes = routes[method];
	for(var i in m_routes){
		console.log('getActionInfo m_routes[i].u: ' + m_routes[i].u);
		r.args = m_routes[i].u.exec(pathname);
		if(r.args){
			r.controller = m_routes[i].c;
			r.action = m_routes[i].a;
			r.args.shift();
			break;
		}
	}
	return r;
}

exports.map = map;
exports.getActionInfo = getActionInfo;
