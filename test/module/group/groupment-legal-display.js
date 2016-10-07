var expect = require('chai').expect;

module.exports = function(nightmare, cb) {
	describe('Groupment legal display', function() {
		it('Load tab', function(done) {
			load_tab(nightmare, done);
		});

		it('Write data in legal display', function(done) {
			write_data_legal_display(nightmare, done);
			cb();
		});
	});
}

function load_tab(nightmare, done) {
	nightmare
		.click('.wp-digi-global-sheet-tab li[data-action="digi-legal_display"]')
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

function write_data_legal_display(nightmare, done) {
	nightmare
	.evaluate(function() {
		document.querySelector('.wp-digi-content input[name="detective_work[full_name]"]').value = '';
		document.querySelector('.wp-digi-content input[name="detective_work[address][address]"]').value = '';
		document.querySelector('.wp-digi-content input[name="detective_work[address][postcode]"]').value = '';
		document.querySelector('.wp-digi-content input[name="detective_work[address][town]"]').value = '';
		document.querySelector('.wp-digi-content input[name="detective_work[contact][phone]"]').value = '';
		document.querySelector('.wp-digi-content input[name="detective_work[opening_time]"]').value = '';

		document.querySelector('.wp-digi-content input[name="occupational_health_service[full_name]"]').value = '';
		document.querySelector('.wp-digi-content input[name="occupational_health_service[address][address]"]').value = '';
		document.querySelector('.wp-digi-content input[name="occupational_health_service[address][postcode]"]').value = '';
		document.querySelector('.wp-digi-content input[name="occupational_health_service[address][town]"]').value = '';
		document.querySelector('.wp-digi-content input[name="occupational_health_service[contact][phone]"]').value = '';
		document.querySelector('.wp-digi-content input[name="occupational_health_service[opening_time]"]').value = '';

		document.querySelector('.wp-digi-content input[name="emergency_service[samu]"]').value = '';
		document.querySelector('.wp-digi-content input[name="emergency_service[police]"]').value = '';
		document.querySelector('.wp-digi-content input[name="emergency_service[pompier]"]').value = '';
		document.querySelector('.wp-digi-content input[name="emergency_service[emergency]"]').value = '';
		document.querySelector('.wp-digi-content input[name="emergency_service[right_defender]"]').value = '';
		document.querySelector('.wp-digi-content input[name="emergency_service[poison_control_center]"]').value = '';

		document.querySelector('.wp-digi-content input[name="safety_rule[responsible_for_preventing]"]').value = '';
		document.querySelector('.wp-digi-content input[name="safety_rule[phone]"]').value = '';
		document.querySelector('.wp-digi-content input[name="safety_rule[location_of_detailed_instruction]"]').value = '';

		document.querySelector('.wp-digi-content input[name="working_hour[monday_morning]"]').value = '';
		document.querySelector('.wp-digi-content input[name="working_hour[tuesday_morning]"]').value = '';
		document.querySelector('.wp-digi-content input[name="working_hour[wednesday_morning]"]').value = '';
		document.querySelector('.wp-digi-content input[name="working_hour[thursday_morning]"]').value = '';
		document.querySelector('.wp-digi-content input[name="working_hour[friday_morning]"]').value = '';
		document.querySelector('.wp-digi-content input[name="working_hour[saturday_morning]"]').value = '';
		document.querySelector('.wp-digi-content input[name="working_hour[sunday_morning]"]').value = '';

		document.querySelector('.wp-digi-content input[name="working_hour[monday_afternoon]"]').value = '';
		document.querySelector('.wp-digi-content input[name="working_hour[tuesday_afternoon]"]').value = '';
		document.querySelector('.wp-digi-content input[name="working_hour[wednesday_afternoon]"]').value = '';
		document.querySelector('.wp-digi-content input[name="working_hour[thursday_afternoon]"]').value = '';
		document.querySelector('.wp-digi-content input[name="working_hour[friday_afternoon]"]').value = '';
		document.querySelector('.wp-digi-content input[name="working_hour[saturday_afternoon]"]').value = '';
		document.querySelector('.wp-digi-content input[name="working_hour[sunday_afternoon]"]').value = '';

		document.querySelector('.wp-digi-content input[name="derogation_schedule[permanent]"]').value = '';
		document.querySelector('.wp-digi-content input[name="derogation_schedule[occasional]"]').value = '';

		document.querySelector('.wp-digi-content input[name="collective_agreement[title_of_the_applicable_collective_agreement]"]').value = '';
		document.querySelector('.wp-digi-content input[name="collective_agreement[location_and_access_terms_of_the_agreement]"]').value = '';

		document.querySelector('.wp-digi-content input[name="rules[location]"]').value = '';

		document.querySelector('.wp-digi-content input[name="DUER[how_access_to_duer]"]').value = '';
	})
	.type('.wp-digi-content input[name="detective_work[full_name]"]', 'Nom détective')
	.type('.wp-digi-content input[name="detective_work[address][address]"]', 'Adresse detective')
	.type('.wp-digi-content input[name="detective_work[address][postcode]"]', '34280')
	.type('.wp-digi-content input[name="detective_work[address][town]"]', 'Village detective')
	.type('.wp-digi-content input[name="detective_work[contact][phone]"]', '04 67 16 16 16')
	.type('.wp-digi-content input[name="detective_work[opening_time]"]', '10h 12h 14h 18h')

	.type('.wp-digi-content input[name="occupational_health_service[full_name]"]', 'Nom occupant')
	.type('.wp-digi-content input[name="occupational_health_service[address][address]"]', 'Adresse occupant')
	.type('.wp-digi-content input[name="occupational_health_service[address][postcode]"]', '34130')
	.type('.wp-digi-content input[name="occupational_health_service[address][town]"]', 'Village occupant')
	.type('.wp-digi-content input[name="occupational_health_service[contact][phone]"]', '04 67 16 29 29')
	.type('.wp-digi-content input[name="occupational_health_service[opening_time]"]', '9h 12h 14h 18h')

	.type('.wp-digi-content input[name="emergency_service[samu]"]', '17')
	.type('.wp-digi-content input[name="emergency_service[police]"]', '18')
	.type('.wp-digi-content input[name="emergency_service[pompier]"]', '19')
	.type('.wp-digi-content input[name="emergency_service[emergency]"]', '20')
	.type('.wp-digi-content input[name="emergency_service[right_defender]"]', '21')
	.type('.wp-digi-content input[name="emergency_service[poison_control_center]"]', '22')

	.type('.wp-digi-content input[name="safety_rule[responsible_for_preventing]"]', 'Jimmy')
	.type('.wp-digi-content input[name="safety_rule[phone]"]', '04 04 04 04 40')
	.type('.wp-digi-content input[name="safety_rule[location_of_detailed_instruction]"]', 'Courir!')

	.type('.wp-digi-content input[name="working_hour[monday_morning]"]', '8')
	.type('.wp-digi-content input[name="working_hour[tuesday_morning]"]', '8')
	.type('.wp-digi-content input[name="working_hour[wednesday_morning]"]', '8')
	.type('.wp-digi-content input[name="working_hour[thursday_morning]"]', '8')
	.type('.wp-digi-content input[name="working_hour[friday_morning]"]', '8')
	.type('.wp-digi-content input[name="working_hour[saturday_morning]"]', '8')
	.type('.wp-digi-content input[name="working_hour[sunday_morning]"]', '8')

	.type('.wp-digi-content input[name="working_hour[monday_afternoon]"]', '20')
	.type('.wp-digi-content input[name="working_hour[tuesday_afternoon]"]', '20')
	.type('.wp-digi-content input[name="working_hour[wednesday_afternoon]"]', '20')
	.type('.wp-digi-content input[name="working_hour[thursday_afternoon]"]', '20')
	.type('.wp-digi-content input[name="working_hour[friday_afternoon]"]', '20')
	.type('.wp-digi-content input[name="working_hour[saturday_afternoon]"]', '20')
	.type('.wp-digi-content input[name="working_hour[sunday_afternoon]"]', '20')

	.type('.wp-digi-content input[name="derogation_schedule[permanent]"]', 'Permanent !')
	.type('.wp-digi-content input[name="derogation_schedule[occasional]"]', 'Occasionel!')

	.type('.wp-digi-content input[name="collective_agreement[title_of_the_applicable_collective_agreement]"]', 'ouais')
	.type('.wp-digi-content input[name="collective_agreement[location_and_access_terms_of_the_agreement]"]', 'non')

	.type('.wp-digi-content input[name="rules[location]"]', 'location')

	.type('.wp-digi-content input[name="DUER[how_access_to_duer]"]', 'access')
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
		expect(response.data.legal_display.detective_work[0].full_name).to.contain('Nom détective');
		expect(response.data.legal_display.detective_work[0].address[0].address).to.contain('Adresse detective');
		expect(response.data.legal_display.detective_work[0].address[0].postcode).to.contain('34280');
		expect(response.data.legal_display.detective_work[0].address[0].town).to.contain('Village detective');
		expect(response.data.legal_display.detective_work[0].address[0].phone).to.contain('04 67 16 16 16');
		expect(response.data.legal_display.detective_work[0].opening_time).to.contain('10h 12h 14h 18h');

		expect(response.data.legal_display.occupational_health_service[0].full_name).to.contain('Nom occupant');
		expect(response.data.legal_display.occupational_health_service[0].address[0].address).to.contain('Adresse occupant');
		expect(response.data.legal_display.occupational_health_service[0].address[0].postcode).to.contain('34130');
		expect(response.data.legal_display.occupational_health_service[0].address[0].town).to.contain('Village occupant');
		expect(response.data.legal_display.occupational_health_service[0].address[0].phone).to.contain('04 67 16 29 29');
		expect(response.data.legal_display.occupational_health_service[0].opening_time).to.contain('10h 12h 14h 18h');

		expect(response.data.legal_display.emergency_service.emergency).to.contain('20');
		expect(response.data.legal_display.emergency_service.poison_control_center).to.contain('22');
		expect(response.data.legal_display.emergency_service.police).to.contain('18');
		expect(response.data.legal_display.emergency_service.pompier).to.contain('19');
		expect(response.data.legal_display.emergency_service.right_defender).to.contain('21');
		expect(response.data.legal_display.emergency_service.samu).to.contain('17');

		expect(response.data.legal_display.safety_rule.location_of_detailed_instruction).to.contain('Courir!');
		expect(response.data.legal_display.safety_rule.phone).to.contain('04 04 04 04 40');
		expect(response.data.legal_display.safety_rule.responsible_for_preventing).to.contain('Jimmy');

		expect(response.data.legal_display.working_hour.monday_morning).to.contain('8');
		expect(response.data.legal_display.working_hour.friday_morning).to.contain('8');
		expect(response.data.legal_display.working_hour.saturday_morning).to.contain('8');
		expect(response.data.legal_display.working_hour.sunday_morning).to.contain('8');
		expect(response.data.legal_display.working_hour.thursday_morning).to.contain('8');
		expect(response.data.legal_display.working_hour.tuesday_morning).to.contain('8');
		expect(response.data.legal_display.working_hour.wednesday_morning).to.contain('8');

		expect(response.data.legal_display.working_hour.monday_afternoon).to.contain('20');
		expect(response.data.legal_display.working_hour.friday_afternoon).to.contain('20');
		expect(response.data.legal_display.working_hour.saturday_afternoon).to.contain('20');
		expect(response.data.legal_display.working_hour.sunday_afternoon).to.contain('20');
		expect(response.data.legal_display.working_hour.thursday_afternoon).to.contain('20');
		expect(response.data.legal_display.working_hour.tuesday_afternoon).to.contain('20');
		expect(response.data.legal_display.working_hour.wednesday_afternoon).to.contain('20');

		expect(response.data.legal_display.derogation_schedule.occasional).to.contain('Occasionel!');
		expect(response.data.legal_display.derogation_schedule.permanent).to.contain('Permanent !');


		expect(response.data.legal_display.collective_agreement.location_and_access_terms_of_the_agreement).to.contain('ouais');
		expect(response.data.legal_display.collective_agreement.title_of_the_applicable_collective_agreement).to.contain('non');

		expect(response.data.legal_display.rules.location).to.contain('location');

		expect(response.data.legal_display.DUER.how_access_to_duer).to.contain('access');


		expect(response.success).to.equal(true);
		done();
	})
	.catch(function(error) {
		console.error('Search failed:', error);
		done('Error');
	})
}
