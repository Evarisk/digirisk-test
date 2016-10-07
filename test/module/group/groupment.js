var expect = require('chai').expect;

var picture = require('../picture');

var group_id = [];
var unique_identifier = new Array();

module.exports = function(nightmare, cb) {
	describe('Groupment', function() {
		it('Create new group', function(done) {
			create_group(nightmare, done);
		});

		// it('Add picture to group', function(done) {
		// 	picture.add_picture_to_element(nightmare, 'obligationPieds', done);
		// });
		//
		// it('Add picture gallery to group', function(done) {
		// 	picture.add_gallery_picture_to_element(nightmare, 'interdictionGenerale', done);
		// });

		// it('Delete group', function(done) {
		// 	delete_group(nightmare, done);
		// });

		it('Save group', function(done) {
			save_group(nightmare, done);
			cb();
		});

		//
		// describe('Move group', function(done) {
		// 	it('Create new group', function(done) {
		// 		create_group(nightmare, done);
		// 	});
		//
		// 	it('Create new group', function(done) {
		// 		create_group(nightmare, done);
		// 	});
		//
		// 	it('Move group', function(done) {
		// 		move_group(nightmare, done);
		// 	});
		// });
	});
};

function create_group(nightmare, done) {
	nightmare
		.click('.wp-digi-develop-list .active .wp-digi-new-group-action a')
		.wait(function() {
			if (window.currentResponse) {
				return true;
			}
		})
		.evaluate(function() {
			var response = window.currentResponse;
			delete window.currentResponse;
			return response;
		})
		.then(function(response) {
			expect(response.data.society.unique_identifier).to.contain('GP')
			expect(response.data.society.id).not.to.be.NaN;
			expect(response.data.society.id).to.be.at.least(1);
			expect(response.success).to.equal(true);
			unique_identifier.push(response.data.society.unique_identifier);
			group_id.push(response.data.society.id);
			done();
		})
		.catch(function(error) {
			console.error('Search failed:', error);
			done('Error');
		})
}

function delete_group(nightmare, done) {
	nightmare
		.click('.wp-digi-delete-action .dashicons-trash')
		.wait(function() {
			if (window.__responses[window.currentAction])
				return true;
		})
		.evaluate(function() {
			var response = window.currentResponse;
			delete window.currentResponse;
			return response;
		})
		.then(function(response) {
			expect(response.success).to.equal(true);
			done();
		})
		.catch(function(error) {
			console.error('Search failed:', error);
			done('Error');
		})
}

function save_group(nightmare, done) {
	nightmare
		.evaluate(function() {
			document.querySelector('.wp-digi-global-sheet-header input[name="establishment_name"]').value = '';
		})
		.type('.wp-digi-global-sheet-header input[name="establishment_name"]', 'Mon super group')
		.click('.wp-digi-group-action-container button')
		.wait(function() {
			if (window.currentResponse) {
				return true;
			}
		})
		.evaluate(function() {
			var response = window.currentResponse;
			delete window.currentResponse;
			return response;
		})
		.then(function(response) {
			expect(response.success).to.equal(true);
			done();
		})
		.catch(function(error) {
			console.error('Search failed:', error);
			done('Error');
		})
}

function move_group(nightmare, done) {
	nightmare
		.type('.wp-digi-global-sheet-header label.wp-list-search input', 'GP1')
		.wait(function() {
			if (window.__responses[window.currentAction] && document.querySelector('.ui-widget-content').display == 'block')
				return true;
		})
		.click('.ui-autocomplete li:first-child')
		.click('.wp-digi-group-action-container button')
		.wait(function() {
			if (window.__responses[window.currentAction])
				return true;
		})
		.evaluate(function() {
			var response = window.currentResponse;
			delete window.currentResponse;
			return response;
		})
		.then(function(response) {
			expect(response.success).to.equal(true);
			done();
		})
		.catch(function(error) {
			console.error('Search failed:', error);
			done('Error');
		})
}
