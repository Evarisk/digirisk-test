var expect     = require('chai').expect;
var fs         = require("fs");
var tab        = require('./../tab');
var navigation = require('./../navigation');
var risk       = require('./risk');

var establishmentData = fs.readFileSync("./test/module/establishment/data/establishment.json");
var establishmentData = JSON.parse(establishmentData);


module.exports = function(nightmare, cb) {
	describe('Establishment', function() {
		it('Open GP', function(done) {
			navigation.openEstablishment(nightmare, done);
		});

		it('Change GP Name', function(done) {
			changeName(nightmare, done);
		})

		it('Delete GP', function(done) {
			deleteEstablishment(nightmare, done);
		})

		it('Create Risk Simple Cotation', function(done) {
			risk.createRiskSimpleCotation(nightmare, done);
		});

		it('Create Risk Complex Cotation', function(done) {
			risk.createRiskComplexCotation(nightmare, done);
		});

		it('Load Simple risk', function(done) {
			risk.loadRiskSimple(nightmare, done);
		});

		it('Edit Simple risk', function(done) {
			risk.editRiskSimple(nightmare, done);
		});

		it('Load Complex risk', function(done) {
			risk.loadRiskComplex(nightmare, done);
		});

		it('Edit Complex risk', function(done) {
			risk.editRiskComplex(nightmare, done);
		});

		it('Delete risk', function(done) {
			risk.deleteRisk(nightmare, done);
		});

		it('Load Complex risk', function(done) {
			risk.loadRiskComplex(nightmare, done);
		});

		it('Add Comment On Risk', function(done) {
			risk.addComment(nightmare, done);
		});

		it('Delete Comment On Risk', function(done) {
			risk.deleteComment(nightmare, done);
		});

		it( 'Switch to evaluator', function(done) {
			tab.goToEvaluator(nightmare, done);
		});

		it( 'Affect evaluator', function(done) {
			evaluator.affect(nightmare, done);
		})
	});
};

function changeName(nightmare, done) {
	nightmare
		.click( '.main-header .button.edit' )
		.type( '.main-header .title input[name="title"]', establishmentData.changeName.title )
		.click( '.main-header .button.action-input' )
		.wait(function() {
			if (window.currentResponse['savedSocietySuccess']) {
				return true;
			}
		})
		.evaluate(() => {
			var response = window.currentResponse['savedSocietySuccess'];
			delete window.currentResponse['savedSocietySuccess'];

			var success = true;
			var errors = [];

			var title = document.querySelector( '.main-header .title input[name="title"]' );

			if ( window.establishmentData.changeName.title !== title.value ) {
				errors.push( 'title.value "' + window.establishmentData.changeName.title + '" est différent de ' + title.value );
			}

			response.data.errors = errors;

			if ( response.data.errors.length ) {
				response.success = false;
			}

			return response;
		})
		.then((response) => {
			expect(response.data.callback_success).to.equal('savedSocietySuccess');
			expect(response.data.society.title).to.equal(establishmentData.changeName.title);
			expect(response.success).to.equal(true);
		})
		.then(done, done);
}

function deleteEstablishment(nightmare, done) {
	nightmare
		.click( '.tab-element.action-delete' )
		.wait(function() {
			if (window.currentResponse) {
				return true;
			}
		})
		.evaluate(() => {
			var response = window.currentResponse['deletedSocietySuccess'];
			delete window.currentResponse['deletedSocietySuccess'];

			var success = true;
			var errors = [];

			response.data.errors = errors;

			if ( response.data.errors.length ) {
				response.success = false;
			}

			return response;
		})
		.then((response) => {
			expect(response.data.callback_success).to.equal('deletedSocietySuccess');
			expect(response.success).to.equal(true);
		})
		.then(done, done);
}
