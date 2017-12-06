var Nightmare = require('nightmare');
var path = require('path');

var nightmare = Nightmare({
	show: true,
	typeInterval: 10,
	width: 1000,
	height: 900,
	waitTimeout: 100 * 1000,
	webPreferences: {
		preload: path.resolve("xhr.js")
	}
});

var login = require('./core/login');

login.goToLogin(nightmare, function() {
	// require('./module/user/user')(nightmare, function() {
		login.goToApp(nightmare, function() {
			require('./module/navigation').navigation(nightmare, function() {
				require('./module/society/society')(nightmare, function() {
					require('./module/establishment/establishment')(nightmare, function() {
					// nightmare.end();
					});
				});
			});
		})
	// });
});
