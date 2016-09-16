var expect = require('chai').expect;

var add_picture_to_element = function(nightmare, media_name, done) {
	nightmare
		.click('.wp-digi-element-thumbnail.wpeo-upload-media')
		.wait(5000)
		.click('.media-modal-content:last-child .attachments-browser li[aria-label="'+media_name+'"] button')
		.click('.media-modal-content:last-child .media-frame-toolbar .media-toolbar-primary.search-form button.media-button-select')
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
};

module.exports.add_picture_to_element = add_picture_to_element;

var add_gallery_picture_to_element = function(nightmare, media_name, done) {
	nightmare
		.click('.wp-digi-element-thumbnail.wpeo-upload-media')
		.click('.wpeo-gallery .wpeo-upload-media')
		.wait(5000)
		.click('.media-modal-content:last-child .attachments-browser li[aria-label="'+media_name+'"] button')
		.click('.media-modal-content:last-child .media-frame-toolbar .media-toolbar-primary.search-form button.media-button-select')
		.wait(5000)
		.evaluate(function() {
			console.log(window.currentAction);
			return window.__responses[window.currentAction];
		})
		.then(function(response) {
			console.log(response);
			expect(response.success).to.equal(true);
			done();
		})
		.catch(function(error) {
			console.error('Search failed:', error);
			done('Error');
		})
};

module.exports.add_gallery_picture_to_element = add_gallery_picture_to_element;
