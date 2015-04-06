function index(){
	this.render('blog/index.html', {msg:'Hello Zhou'});
}


var http = require('http');
var events = require('events');
var tsina_client = http.createClient(80, 'api.t.sina.com.cn');
var tweets_emitter = new events.EventEmitter();

//action: tweets
function tweets(blogType){
	var _t = this;
	var listener = tweets_emitter.once('tweets', function(tweets){
		_t.render('blog/tweets.html', {tweets: tweets});
	});
	get_tweets();
}
function get_tweets(){
	var request = tsina_client.request('GET', '/statuses/public_timeline.json?source=1739161097', {'host': 'api.t.sina.com.cn'});
	request.addListener('response', function(response){
		var body = '';
		response.addListener('data', function(chunk){
			body += chunk;
		});
		response.addListener('end', function(){
			var tweets = JSON.parse(body);
			if(tweets.length > 0){
				console.log('get tweets \n');
				tweets_emitter.emit('tweets', tweets);
			}
		});
	});
	request.end();
}




exports.index = index;
exports.tweets = tweets;