var expect = require('chai').expect;
var tab = require('./../tab');
console.log(tab);

module.exports = function(nightmare, cb) {
	describe('Societé', function() {
		it('Open society', function(done) {
			open_society(nightmare, done);
			tab.go_to(nightmare, {
				'slug': 'digi-legal_display',
				'text': 'Les affichages légales Evarisk'
			}, done)
			cb(nightmare);
		});

		// it('Create new workunit', function(done) {
		// 	create_workunit(nightmare, done);
		// 	cb(nightmare);
		// });
	});
};

function open_society(nightmare, done) {
	nightmare
		.click( '.navigation-container .society-header' )
		.evaluate(function() {
			var response = window.currentResponse;
			delete window.currentResponse;
			var title = document.querySelector( '.main-header input[name="title"]' );

			if ( 'Evarisk' === title.value ) {
				return response;
			}

			return false;
		})
		.then(function(response) {
			expect(response.data.callback_success).to.equal( 'loadedSocietySuccess' );
			expect(response.success).to.equal(true);

			done();
		})
		.catch((error) => {
			console.error( 'Open Society', error );
		})
}

// function create_workunit(nightmare, done) {
// 	nightmare
// 		.click( '.navigation-container .workunit-list .unit[data-id="' + gpID + '"] .button[data-type="Workunit_Class"]' )
// 		.wait( '.unit.new.active' )
// 		.type( '.unit.new.active input', 'Ma SUPER UT sous mon SUPER GP' )
// 		.click( '.unit.new.active .add' )
// 		.wait(function() {
// 			if (window.currentResponse) {
// 				return true;
// 			}
// 		})
// 		.evaluate(() => {
// 			var response = window.currentResponse;
// 			delete window.currentResponse;
// 			var title = document.querySelector( '.unit.active .title .name' );
//
// 			if ( 'Ma SUPER UT sous mon SUPER GP' === title.innerHTML ) {
// 				return response;
// 			}
//
// 			return false;
// 		})
// 		.then((response) => {
// 			expect(response.data.society_id).not.to.be.NaN;
// 			expect(response.success).to.equal(true);
// 			done();
// 		})
// 		.catch((error) => {
// 			console.error( 'Create UT:', error );
// 		})
// }
