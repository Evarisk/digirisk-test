var expect = require('chai').expect;

var gpID = 0;

module.exports = function(nightmare, cb) {
	describe('Navigation', function() {
		it('Create new group', function(done) {
			create_group(nightmare, done);
		});

		it('Create new workunit', function(done) {
			create_workunit(nightmare, done);
			cb(nightmare);
		});
	});
};

function create_group(nightmare, done) {
	nightmare
		.click( '.navigation-container .button[data-type="Group_Class"]' )
		.wait( '.unit.new.active' )
		.type( '.unit.new.active input', 'Mon SUPER GP' )
		.click( '.unit.new.active .add' )
		.wait( '.unit.active .title' )
		.evaluate(function() {
			var response = window.currentResponse;
			delete window.currentResponse;
			var title = document.querySelector( '.unit.active .title .name' );

			if ( 'Mon SUPER GP' === title.innerHTML ) {
				return response;
			}

			return false;
		})
		.then(function(response) {
			expect(response.data.society_id).not.to.be.NaN;
			expect(response.success).to.equal(true);
			gpID = response.data.society_id;

			done();
		})
		.catch((error) => {
			console.error( 'Create GP:', error );
		})
}

function create_workunit(nightmare, done) {
	nightmare
		.click( '.navigation-container .workunit-list .unit[data-id="' + gpID + '"] .button[data-type="Workunit_Class"]' )
		.wait( '.unit.new.active' )
		.type( '.unit.new.active input', 'Ma SUPER UT sous mon SUPER GP' )
		.click( '.unit.new.active .add' )
		.wait(function() {
			if (window.currentResponse) {
				return true;
			}
		})
		.evaluate(() => {
			var response = window.currentResponse;
			delete window.currentResponse;
			var title = document.querySelector( '.unit.active .title .name' );

			if ( 'Ma SUPER UT sous mon SUPER GP' === title.innerHTML ) {
				return response;
			}

			return false;
		})
		.then((response) => {
			expect(response.data.society_id).not.to.be.NaN;
			expect(response.success).to.equal(true);
			done();
		})
		.catch((error) => {
			console.error( 'Create UT:', error );
		})
}
