var expect = require('chai').expect;

module.exports = function(nightmare, cb) {
	describe('Groupment duer', function() {
		it('Load tab', function(done) {
			load_tab(nightmare, done);
		});

		it('Write DUER', function(done) {
			write_data_duer(nightmare, done);
			cb();
		})
	});
}

function load_tab(nightmare, done) {
	nightmare
		.click('.wp-digi-global-sheet-tab li[data-action="digi-generate-sheet"]')
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

function write_data_duer(nightmare, done) {
	nightmare
	.click('.wp-digi-content button')
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

		expect(response.data.duer.document_meta.identifiantElement).to.contains('GP');

		done();
	})
	.catch(function(error) {
		console.error('Search failed:', error);
		done('Error');
	})
}
