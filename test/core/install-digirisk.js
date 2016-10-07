var user = require('../module/user/user');

module.exports = function() {
	return function (nightmare) {
		nightmare
			.goto('http://127.0.0.1/wordpress/wp-admin/admin.php?page=digi-setup')
			.wait()
			.evaluate(function() {
				if ( document.querySelector('#error-page') ) {
					return true;
				}

				return false;
			})
	};
};
