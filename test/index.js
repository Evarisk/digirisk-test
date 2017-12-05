var Nightmare = require('nightmare');
var path = require('path');

var nightmare = Nightmare({
	show: false,
	typeInterval: 1,
	width: 1000,
	height: 900,
	waitTimeout: 15000,
	executionTimeout: 15000,
	gotoTimeout: 15000,
	webPreferences: {
		preload: path.resolve("xhr.js")
	}
});

require('./core/login')(nightmare, function() {
	require('./module/navigation')(nightmare, function() {
		require('./module/society/society')(nightmare, function() {
			nightmare.end();
		});
	});
});
