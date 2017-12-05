var expect = require('chai').expect;
var fs = require("fs");
var tab = require('./../tab');

var societyInformationsData = fs.readFileSync("./test/module/society/society_informations.json");
var societyInformationsData = JSON.parse(societyInformationsData);

module.exports = function(nightmare, cb) {
	describe('Societé', function() {
		it('Open society', function(done) {
			open_society(nightmare, done);
		});

		// it('Go to tab information', function(done) {
		// 	tab.goToInformations(nightmare, done);
		// });
    //
		// it('Society: Form information', function(done) {
		// 	form_information(nightmare, done);
		// });
    //
		// it('Go to tab registre at bénins', function(done) {
		// 	tab.goToRegistreATBenins(nightmare, done);
		// });
    //
		// it('Society: Registre AT Benin (no-data)', function(done) {
		// 	generate_registre_at_benin(nightmare, done);
		// });

		it('Go to tab légla display', function(done) {
			tab.goToLegalDisplay(nightmare, done);
		});

		it('Society: Legal display', function(done) {
			generate_legal_display(nightmare, done);
			cb(nightmare);
		});
	});
};

function open_society(nightmare, done) {
	nightmare
		.click( '.navigation-container .society-header' )
		.wait(function() {
			if (window.currentResponse) {
				return true;
			}
		})
		.evaluate(function() {
			var response = window.currentResponse;
			delete window.currentResponse;
			var title = document.querySelector( '.main-header .title input[name="title"]' );
			if ( 'Evarisk' == title.value ) {
				return response;
			}

			return false;
		})
		.then(function(response) {
			if ( ! response ) {
				done(false);
			} else {
				expect(response.data.callback_success).to.equal( 'loadedSocietySuccess' );
				expect(response.success).to.equal(true);

				done();
			}
		})
		.catch((error) => {
			console.error( 'Open Society', error );
		})
}

function form_information(nightmare, done) {
	nightmare
		.type( '.society-informations input[name="society[title]"]', '' )
		.type( '.society-informations input[name="society[siret_id]"]', '' )
		.type( '.society-informations input[name="society[number_of_employees]"]', '' )
		.type( '.society-informations input[name="address[address]"]', '' )
		.type( '.society-informations input[name="address[additional_address]"]', '' )
		.type( '.society-informations input[name="society[date]"]', '' )
		.type( '.society-informations input[name="address[postcode]"]', '' )
		.type( '.society-informations input[name="address[town]"]', '' )
		.type( '.society-informations input[name="society[contact][phone][]"]', '' )
		.type( '.society-informations input[name="society[contact][email]"]', '' )
		.type( '.society-informations textarea[name="society[content]"]', '' )

		.type( '.society-informations input[name="society[title]"]', 'Evarisk' )
		.type( '.society-informations input[name="society[siret_id]"]', '123456789' )
		.type( '.society-informations input[name="society[number_of_employees]"]', '10' )
		.type( '.society-informations input[name="address[address]"]', 'Ma superbe adresse' )
		.type( '.society-informations input[name="address[additional_address]"]', 'Mon complément dadresse' )
		.type( '.society-informations input[name="society[date]"]', '2017-12-04 12:00:00' )
		.type( '.society-informations input[name="address[postcode]"]', '12345' )
		.type( '.society-informations input[name="address[town]"]', 'Ma ville' )
		.type( '.society-informations input[name="society[contact][phone][]"]', '0467676767' )
		.type( '.society-informations input[name="society[contact][email]"]', 'email@demo.com' )
		.type( '.society-informations textarea[name="society[content]"]', 'Ma superbe entreprise' )
		.wait(1000)

		.click( '.society-informations .action-input' )
		.wait(function() {
			if (window.currentResponse) {
				return true;
			}
		})
		.evaluate(function() {
			var response = window.currentResponse;
			delete window.currentResponse;

			var success = true;
			var errors = [];

			var title               = document.querySelector( '.main-header .title input[name="title"]' );
			var siret_id            = document.querySelector( '.society-informations input[name="society[siret_id]"]' );
			var number_of_employees = document.querySelector( '.society-informations input[name="society[number_of_employees]"]' );
			var address             = document.querySelector( '.society-informations input[name="address[address]"]' );
			var additional_address  = document.querySelector( '.society-informations input[name="address[additional_address]"]' );
			var postcode            = document.querySelector( '.society-informations input[name="address[postcode]"]' );
			var town                = document.querySelector( '.society-informations input[name="address[town]"]' );
			var phone               = document.querySelector( '.society-informations input[name="society[contact][phone][]"]' );
			var email               = document.querySelector( '.society-informations input[name="society[contact][email]"]' );
			var content             = document.querySelector( '.society-informations textarea[name="society[content]"]' );

			if ( 'Evarisk' != title.value ) {
				errors.push( 'title.value "Evarisk" est différent de ' + title.value );
				success = false;
			}

			if ( '123456789' != siret_id.value ) {
				errors.push( 'siret_id.value "123456789" est différent de ' + siret_id.value );
				success = false;
			}

			if ( '10' != number_of_employees.value ) {
				errors.push( 'number_of_employees.value "10" est différent de ' + number_of_employees.value );
				success = false;
			}

			if ( 'Ma superbe adresse' != address.value ) {
				errors.push( 'address.value "Ma superbe adresse" est différent de ' + address.value );
				success = false;
			}

			if ( 'Mon complément dadresse' != additional_address.value ) {
				errors.push( 'additional_address.value "Mon complément dadresse" est différent de ' + additional_address.value );
				success = false;
			}

			if ( '12345' != postcode.value ) {
				errors.push( 'postcode.value "12345" est différent de ' + postcode.value );
				success = false;
			}

			if ( 'Ma ville' != town.value ) {
				errors.push( 'town.value "Ma ville" est différent de ' + town.value );
				success = false;
			}

			if ( '0467676767' != phone.value ) {
				errors.push( 'phone.value "0467676767" est différent de ' + phone.value );
				success = false;
			}

			if ( 'email@demo.com' != email.value ) {
				errors.push( 'email.value "email@demo.com" est différent de ' + email.value );
				success = false;
			}

			if ( 'Ma superbe entreprise' != content.value ) {
				errors.push( 'content.value "Ma superbe entreprise" est différent de ' + content.value );
				success = false;
			}

			if ( success ) {
				return response;
			}

			response.success = false;
			response.data.errors = errors;

			return response;
		})
		.then(function(response) {
			expect(response.success).to.equal(true);

			if ( response.success ) {
				expect(response.data.callback_success).to.equal('savedSocietyConfiguration');
			}

			done();
		})
		.catch((error) => {
			console.error( 'Form information', error );
		})
}

function generate_registre_at_benin(nightmare, done) {
	nightmare
		.click( '.document-accident-benins .action-input' )
		.wait(function() {
			if (window.currentResponse) {
				return true;
			}
		})
		.evaluate(function() {
			var response = window.currentResponse;
			delete window.currentResponse;

			if ( ! document.body.contains( document.querySelector( '.document-accident-benins tr[data-id="' + response.data.result.creation_response.id + '"]' ) ) ) {
				response.success = false;
			}

			return response;
		})
		.then(function(response) {
			expect(response.success).to.equal(true);
			expect(response.data.result.success).to.equal(true);
			expect(response.data.callback_success).to.equal('generatedRegistreAccidentBenin');

			done();
		})
		.catch((error) => {
			console.error( 'Registre AT Benins', error );
		})
}

function generate_legal_display(nightmare, done) {
	for( var key in societyInformationsData ) {
		nightmare.type( '.main-content .form input[name="' + key + '"]', '' );
		nightmare.type( '.main-content .form input[name="' + key + '"]', societyInformationsData[key] );
	}

	nightmare
		.wait(1000)
		.click( '.main-content .form .action-input' )
		.wait(function() {
			if (window.currentResponse) {
				return true;
			}
		})
		.evaluate(function() {
			var response = window.currentResponse;
			delete window.currentResponse;

			for( var key in window.societyInformationsData ) {
				if ( window.societyInformationsData[key] !== document.querySelector( '.main-content .form input[name="' + key + '"]' ).value ) {
					errors.push( key + '.value "' + window.societyInformationsData[key] + '" est différent de ' + document.querySelector( '.main-content .form input[name="' + key + '"]' ).value );
					success = false;
				}
			}

			var success = true;
			var errors = [];

			if ( response.errors ) {
				response.success = false;
			}
			response.data.errors = errors;

			return response;
		})
		.then(function(response) {
			console.log(response);
			expect(response.success).to.equal(true);
			// expect(response.data.result.success).to.equal(true);
			expect(response.data.callback_success).to.equal('generatedSuccess');

			done();
		})
		.catch((error) => {
			console.error( 'Affichage légal', error );
		})
}
