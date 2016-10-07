var expect = require('chai').expect;

module.exports = function(nightmare, cb) {
	describe('Groupment configuration', function() {
		it('Load tab', function(done) {
			load_tab_group_configuration(nightmare, done);
		});

		it('Write data in configuration', function(done) {
			write_data_group_configuration(nightmare, done);
			cb();
		});
	});
}

function load_tab_group_configuration(nightmare, done) {
	nightmare
		.click('.wp-digi-global-sheet-tab li[data-action="digi-configuration"]')
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

function write_data_group_configuration(nightmare, done) {
	nightmare
	.evaluate(function() {
		document.querySelector('.wp-digi-content input[name="groupment[title]"]').value = '';
		document.querySelector('.wp-digi-content input[name="address[address]"]').value = '';
		document.querySelector('.wp-digi-content input[name="address[additional_address]"]').value = '';
		document.querySelector('.wp-digi-content input[name="address[postcode]"]').value = '';
		document.querySelector('.wp-digi-content input[name="address[town]"]').value = '';
		document.querySelector('.wp-digi-content input[name="groupment[identity][siren]"]').value = '';
		document.querySelector('.wp-digi-content input[name="groupment[identity][siret]"]').value = '';
		document.querySelector('.wp-digi-content input[name="groupment[contact][phone][]"]').value = '';
		document.querySelector('.wp-digi-content textarea[name="groupment[content]"]').value = '';
		// document.querySelector('.wp-digi-content input[name="groupment[date]"]').value = '';
	})
	.type('.wp-digi-content input[name="groupment[title]"]', 'Mon groupement')
	.type('.wp-digi-content input[name="address[address]"]', 'Ma superbe addresse')
	.type('.wp-digi-content input[name="address[additional_address]"]', 'Mon adresse additional')
	// .type('.wp-digi-content input[name="groupment[date]"]', '01/10/2018')
	.type('.wp-digi-content input[name="address[postcode]"]', '34130')
	.type('.wp-digi-content input[name="groupment[identity][siren]"]', 'SIREN')
	.type('.wp-digi-content input[name="groupment[identity][siret]"]', 'SIRET')
	.type('.wp-digi-content input[name="address[town]"]', 'Mon super village')
	.type('.wp-digi-content input[name="groupment[contact][phone][]"]', '06 67 16 16 16')
	.type('.wp-digi-content textarea[name="groupment[content]"]', 'Ma superbe description')
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
		expect(response.data.group.title).to.contain('Mon groupement');
		expect(response.data.address.address).to.contain('Ma superbe addresse');
		expect(response.data.address.additional_address).to.contain('Mon adresse additional');
		expect(response.data.address.postcode).to.contain('34130');
		expect(response.data.group.identity.siren).to.contain('SIREN');
		expect(response.data.group.identity.siret).to.contain('SIRET');
		expect(response.data.address.town).to.contain('Mon super village');
		expect(response.data.group.contact.phone[0]).to.contain('06 67 16 16 16');
		expect(response.data.group.id).to.be.at.least(1);
		expect(response.data.address.id).to.be.at.least(1);
		expect(response.success).to.equal(true);
		done();
	})
	.catch(function(error) {
		console.error('Search failed:', error);
		done('Error');
	})
}
