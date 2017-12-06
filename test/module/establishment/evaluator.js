var expect = require('chai').expect;
var fs = require("fs");

var evaluatorData = fs.readFileSync("./test/module/establishment/data/evaluator.json");
var evaluatorData = JSON.parse(evaluatorData);

module.exports.affect = function(nightmare, done) {
	nightmare
		.wait(function() {
			if (window.currentResponse['affectedEvaluatorSuccess']) {
				return true;
			}
		})
		.evaluate(() => {
			var response = window.currentResponse['affectedEvaluatorSuccess'];
			delete window.currentResponse['affectedEvaluatorSuccess'];

			var success = true;
			var errors = [];

			response.data.errors = errors;

			if ( response.data.errors.length ) {
				response.success = false;
			}

			return response;
		})
		.then((response) => {
			expect(response.data.callback_success).to.equal('affectedEvaluatorSuccess');
			expect(response.success).to.equal(true);
		})
		.then(done, done);
}
