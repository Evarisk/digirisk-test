var user = require('../module/user/user');

module.exports = function() {
	return function (nightmare) {
		nightmare
			.goto('http://localhost/wordpress/wp-admin/admin.php?page=digi-setup')
			.wait()
			.evaluate(function() {
				if ( document.querySelector('#error-page') ) {
					return true;
				}

				return false;
			})
	};
};
