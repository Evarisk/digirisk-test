var expect = require('chai').expect;

var exportGoToInformations = function (nightmare, done) {
	goToInformations(nightmare, done);
}

var exportGoToRegistreATBenins = function (nightmare, done) {
	goToRegistreATBenins(nightmare, done);
}

var exportGoToLegalDisplay = function (nightmare, done) {
	goToLegalDisplay(nightmare, done);
}

function goToInformations( nightmare, done ) {
	nightmare
		.click( '.main-container .tab-element[data-action="digi-informations"]' )
		.wait(function() {
			if (window.currentResponse) {
				return true;
			}
		})
		.evaluate(function() {
			var response = window.currentResponse;
			delete window.currentResponse;
			var title = document.querySelector( '.main-content h1' );

			if ( 'Informations Evarisk' === title.innerHTML ) {
				return response;
			}

			return false;
		})
		.then(function(result) {
			var response = {};

			if ( ! result ) {
				response.success = result;
			} else {
				response = result;
			}

			expect(response.success).to.equal(true);

			done();
		})
		.catch((error) => {
			console.error( 'Load TAB:', error );
		})
}

function goToRegistreATBenins( nightmare, done ) {
	nightmare
		.click( '.main-container .tab-element[data-action="digi-registre-accident"]' )
		.wait(function() {
			if (window.currentResponse) {
				return true;
			}
		})
		.evaluate(function() {
			var response = window.currentResponse;
			delete window.currentResponse;
			var title = document.querySelector( '.main-content h1' );

			if ( 'Les registres des AT bénins Evarisk' === title.innerHTML ) {
				return response;
			}

			return false;
		})
		.then(function(result) {
			var response = {};

			if ( ! result ) {
				response.success = result;
			} else {
				response = result;
			}

			expect(response.success).to.equal(true);

			done();
		})
		.catch((error) => {
			console.error( 'Load TAB REGISTRE AT BENINS:', error );
		})
}

function goToLegalDisplay( nightmare, done ) {
	nightmare
		.click( '.main-container .tab-element[data-action="digi-legal_display"]' )
		.wait(function() {
			if (window.currentResponse) {
				return true;
			}
		})
		.evaluate(function() {
			var response = window.currentResponse;
			delete window.currentResponse;
			var title = document.querySelector( '.main-content h1' );

			if ( 'Les affichages légales Evarisk' === title.innerHTML ) {
				return response;
			}

			return false;
		})
		.then(function(result) {
			var response = {};

			if ( ! result ) {
				response.success = result;
			} else {
				response = result;
			}

			expect(response.success).to.equal(true);

			done();
		})
		.catch((error) => {
			console.error( 'Load TAB LEGAL DISPLAY:', error );
		})
}

module.exports.goToInformations     = exportGoToInformations;
module.exports.goToRegistreATBenins = exportGoToRegistreATBenins;
module.exports.goToLegalDisplay     = exportGoToLegalDisplay;
