var expect = require('chai').expect;
var Nightmare = require('nightmare');

module.exports = function(nightmare, cb) {
	describe('Login', function() {
		it('It shoud login & go to digirisk main page', function(done) {
			nightmare
				.goto('http://127.0.0.1/wordpress/wp-admin')
				.wait('#login')
				.type('input[name="log"]', 'a')
				.type('input[name="pwd"]', 'a')
				.click('input[type="submit"]')
				.wait('#adminmenu')
				.goto('http://127.0.0.1/wordpress/wp-admin/admin.php?page=digirisk-simple-risk-evaluation')
				.wait('.digirisk-wrap')
				.evaluate(function() {
					return;
				})
				.then(function() {
					done();
					cb(nightmare);
				})
				.catch(function(error) {
					console.error('Search failed:', error);
					done(error);
					cb(nightmare);
				})
		});
	});
};
