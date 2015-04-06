var router = require('./router.js');

router.map({
	method:'get',
	url:/^\/blog\/?$/i,
	controller:'blog',
	action:'index'
});

router.map({
	method:'get',
	url:/\/tweets\/?$/i,
	controller:'blog',
	action:'tweets'
});


exports.staticFileDir = 'static';