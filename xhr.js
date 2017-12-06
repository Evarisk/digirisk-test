
 window.__nightmare = {};
	__nightmare.ipc = require('electron').ipcRenderer;

window.confirm = function(message, defaultResponse){
  return true;
}

var fs = require("fs");

window.societyInformationsData = fs.readFileSync("./test/module/society/data/society_informations.json");
window.societyInformationsData = JSON.parse(window.societyInformationsData);

window.societyLegalDisplayData = fs.readFileSync("./test/module/society/data/society_legal_display.json");
window.societyLegalDisplayData = JSON.parse(window.societyLegalDisplayData);

window.establishmentData = fs.readFileSync("./test/module/establishment/data/establishment.json");
window.establishmentData = JSON.parse(window.establishmentData);

window.riskData = fs.readFileSync("./test/module/establishment/data/risk.json");
window.riskData = JSON.parse(window.riskData);

window.evaluatorData = fs.readFileSync("./test/module/establishment/data/evaluator.json");
window.evaluatorData = JSON.parse(window.evaluatorData);

window.userData = fs.readFileSync("./test/module/user/data/user.json");
window.userData = JSON.parse(window.userData);
window.allUsersResponses = [];

var open = window.XMLHttpRequest.prototype.open;
window.currentResponse = [];
window.currentAction = undefined;
window.digiriskTest = {};
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

				window.currentResponse[responseJSON.data.callback_success] = responseJSON;
			}
		}, false);
	open.apply(this, arguments);
};

window.XMLHttpRequest.prototype.realSend = XMLHttpRequest.prototype.send;
window.XMLHttpRequest.prototype.send = function(vData) {
	this.realSend(vData);
};
