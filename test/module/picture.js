var expect = require('chai').expect;

var add_picture_to_element = function(nightmare, media_name, done) {
	nightmare
		.click('.wp-digi-element-thumbnail.wpeo-upload-media')
		.type('#media-search-input', media_name)
		.wait(function() {
			if (window.__responses[window.currentAction] && document.querySelector( '.media-modal-content ul.attachments li:first-child button' ) ) {
				return true;
			}
		})
		.click('.media-modal-content ul.attachments li:first-child button')
		.click('.media-modal-content .media-frame-toolbar .media-toolbar-primary.search-form button.media-button-insert')
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
};

module.exports.add_picture_to_element = add_picture_to_element;

var add_gallery_picture_to_element = function(nightmare, media_name, done) {
	nightmare
		.click('.wp-digi-element-thumbnail.wpeo-upload-media')
		.click('.wpeo-gallery .wpeo-upload-media')
		.click('.media-modal-content .media-router a:last-child')
		.evaluate(function() {
			document.querySelector('.media-modal-content #media-search-input').value = '';
		})
		.type('.media-modal-content #media-search-input', media_name)
		.wait(function() {
			if (window.__responses[window.currentAction] && document.querySelector( '.media-modal-content ul.attachments li:first-child button' ) ) {
				return true;
			}
		})
		.click('.media-modal-content ul.attachments li:first-child button')
		.click('.media-modal-content .media-frame-toolbar .media-toolbar-primary.search-form button.media-button-insert')
		.wait(function() {
			if (window.currentAction == 'eo_associate_file')
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
};

module.exports.add_gallery_picture_to_element = add_gallery_picture_to_element;
