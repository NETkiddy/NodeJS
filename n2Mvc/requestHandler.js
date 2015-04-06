var router = require('./router.js');
var path = require("path");
var config = require('./config.js');
var url = require("url"),
    fs = require("fs"),
    querystring = require("querystring");
require('./refLib/shotenjin');


function handler(request, response){
	console.log('start handle request');
	var actionInfo = router.getActionInfo(request.url, request.method);
	console.log('actionInfo: ' + actionInfo);
	if(actionInfo.action){// action == blog
		console.log('actionInfo.action: ' + actionInfo.action);
		console.log('actionInfo.controller: ' + actionInfo.controller);
		var controller = require('./controllers/' + actionInfo.controller);//./controllers目录下找到blog.js
		if(controller[actionInfo.action]){
			console.log('controller[actionInfo.action]: ' + controller[actionInfo.action]);//得到index操作
			var ct = new controllerContext(request, response);
			//通过apply将controller的上下文对象传递给action??????
			controller[actionInfo.action].apply(ct, actionInfo.args);//args＝
			console.log('actionInfo.args: ' + actionInfo.args);
		}else{
			handler500(request, response, 'Error: controller ' + actionInfo.controller + ' without action ' + actionInfo.action)
		}
	}else{
		staticFileServer(request, response);
	}
}

function controllerContext(request, response){
	console.log('function controllerContext');
	this.request = request;
	this.response = response;
	this.handler404 = handler404;
	this.handler500 = handler500;
};

controllerContext.prototype.render = function(viewName, context){
			console.log('controllerContext.prototype.render');
	viewEngine.render(this.request, this.response, viewName, context);
};

controllerContext.prototype.renderJson = function(json){
			console.log('controllerContext.prototype.renderJson');
	viewEngine.renderJson(this.request, this.response, json);
}

var handler404 = function(request, response){
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end('Page Not Found');
};

var handler500 = function(request, response, error){
    response.writeHead(500, {'Content-Type': 'text/plain'});
    response.end(error);
};

var viewEngine = {
	render: function(request, response, viewName, context){
			console.log('viewEngine.render');
			console.log('viewEngine.viewName' + viewName);
			console.log('viewEngine.__dirname' + __dirname);

		var filename = path.join(__dirname, 'views', viewName);
		console.log('filename: ' + filename);
		try{
			var output = Shotenjin.renderView(filename, context);
		}catch(error){
			handler500(request, response, error);
			return;
		}
		response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(output);
	},
	renderJson: function(response, json){
			console.log('viewEngine.renderJson');
		//TODO
	}
}


var staticFileServer = function(req, res, filePath){
	console.log('staticFileServer');
    if(!filePath){
			console.log('__dirname: ' + __dirname);

        filePath = path.join(__dirname, config.staticFileDir, url.parse(req.url).pathname);
    }
    path.exists(filePath, function(exists) {  
        if(!exists) {  
            handler404(req, res);  
            return;  
        }  
        fs.readFile(filePath, "binary", function(err, file) {  
            if(err) {  
                handler500(req, res, err);
                return;  
            }
            var ext = path.extname(filePath);
            ext = ext ? ext.slice(1) : 'html';
            res.writeHead(200, {'Content-Type': contentTypes[ext] || 'text/html'});
            res.write(file, "binary");
            res.end();
        });  
    });
};
var contentTypes = {
  "aiff": "audio/x-aiff",
  "arj": "application/x-arj-compressed"
  //省略
}



exports.handler = handler;



