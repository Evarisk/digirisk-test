var expect = require('chai').expect;

var go_to = function (nightmare, tab, done) {
	describe('Navigation Tab', function() {
		it('Load TAB ' + tab, function(done) {
			go_to_func(nightmare, tab, done);
			cb(nightmare);
		});
	});
}

function go_to_func( nightmare, tab, done ) {
	nightmare
		.click( '.main-container .tab-element[data-action="' + tab.slug + '"]' )
		.evaluate(function() {
			var response = window.currentResponse;
			delete window.currentResponse;
			var title = document.querySelector( '.main-content h1' );

			if ( tab.text === title.innerHTML ) {
				return response;
			}

			return false;
		})
		.then(function(response) {
			expect(response.success).to.equal(true);

			done();
		})
		.catch((error) => {
			console.error( 'Load TAB:', error );
		})
}

module.exports = go_to;
