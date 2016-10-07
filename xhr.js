
 window.__nightmare = {};
	__nightmare.ipc = require('electron').ipcRenderer;

window.confirm = function(message, defaultResponse){
  return true;
}

var open = window.XMLHttpRequest.prototype.open;
window.currentResponse = undefined;
window.currentAction = undefined;
window.XMLHttpRequest.prototype.open = function (method, url, async, user, pass) {
		this.addEventListener("readystatechange", function() {
			if (this.readyState === 4) {
				var responseJSON = { 'success': false };
				try {
					var responseJSON = JSON.parse(this.responseText);
					if ( responseJSON && responseJSON.data && responseJSON.data.template ) {
						delete responseJSON.data.template;
					}

					if ( responseJSON && responseJSON.data && responseJSON.data.template_left ) {
						delete responseJSON.data.template_left;
					}

					if ( responseJSON && responseJSON.data && responseJSON.data.template_right ) {
						delete responseJSON.data.template_right;
					}
				}
				catch(e) {

				}

				window.currentResponse = responseJSON;
			}
		}, false);
	open.apply(this, arguments);
};

window.XMLHttpRequest.prototype.realSend = XMLHttpRequest.prototype.send;
window.XMLHttpRequest.prototype.send = function(vData) {
	getAction(vData);
	this.realSend(vData);
};

function getAction(data) {
	var post = data.split('&');
	var action = post[0].split('=');

	if ( action && action[0] && action[0] === 'action' && action[1] && action[1] != "heartbeat" ) {
		window.currentAction = action[1];
	}
}
