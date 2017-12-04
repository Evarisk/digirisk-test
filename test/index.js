var Nightmare = require('nightmare');
var path = require('path');

var nightmare = Nightmare({
	typeInterval: 1,
	width: 1000,
	height: 900,
	webPreferences: {
		preload: path.resolve("xhr.js")
	}
});

require('./core/login')(nightmare, function() {
	require('./module/navigation')(nightmare, function() {
		require('./module/society/society')(nightmare, function() {
			nightmare.end();
		// require('./module/group/groupment-configuration')(nightmare, function() {
		// 	require('./module/group/groupment-legal-display')(nightmare, function() {
		// 		require('./module/group/duer')(nightmare, function() {
		// 		});
		// 	});
		// });
		});
	});
});
