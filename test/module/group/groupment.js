var expect = require('chai').expect;

var picture = require('../picture');

var group_id = [];
var unique_identifier = new Array();

module.exports = function(nightmare) {
	describe('Groupment', function() {
		it('Create new group', function(done) {
			create_group(nightmare, done);
		});

		it('Add picture to group', function(done) {
			picture.add_picture_to_element(nightmare, 'obligationPieds_s-2', done);
		});

		it('Add picture gallery to group', function(done) {
			console.log(group_id);
			picture.add_gallery_picture_to_element(nightmare, group_id[group_id.length - 1], 'interdictionGenerale_s-5', done);
		});

		it('Delete group', function(done) {
			delete_group(nightmare, done);
		});

		it('Save group', function(done) {
			save_group(nightmare, done);
		});



		describe('Move group', function(done) {
			it('Create new group', function(done) {
				create_group(nightmare, done);
			});

			it('Create new group', function(done) {
				create_group(nightmare, done);
			});

			it('Move group', function(done) {
				move_group(nightmare, done);
			});
		});
	});

};

function create_group(nightmare, done) {
	nightmare
		.click('.wp-digi-develop-list .active .wp-digi-new-group-action a')
		.wait(5000)
		.evaluate(function() {
			return window.__responses[window.currentAction];
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
		.wait(5000)
		.evaluate(function() {
			return window.__responses[window.currentAction];
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
		.wait(5000)
		.evaluate(function() {
			return window.__responses[window.currentAction];
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
		.type('.wp-digi-global-sheet-header label.wp-list-search input', unique_identifier[1])
		.wait(5000)
		.click('.ui-autocomplete li')
		.click('.wp-digi-group-action-container button')
		.wait(5000)
		.evaluate(function() {
			return window.__responses[window.currentAction];
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