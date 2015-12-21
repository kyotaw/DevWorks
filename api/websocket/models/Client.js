'use strict';


var Client = (function() {

	function constructor(clientID, socket) {
		this.id = clientID;
		this.socket = socket;
		this.token = 1;
	}

	constructor.prototype = {
		dispatch: function(data, error) {
			var payload = {};
			payload["status"] = error ? "error" : "success";
			payload["data"] = data;
			this.socket.emit("data", payload);	
		}
	}

	require("./thing")(constructor);

	return constructor;
}());


module.exports.Client = function(clientID, socket) {
	return new Client(clientID, socket);
}
