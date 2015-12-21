'use strict';


var Mediator = (function() {

	var events = require("events");

	function constructor(device) {
		device.mediator = this;
		this.device = device;
		this.clients = {};
		this.emitter = new events.EventEmitter();
	}

	constructor.prototype = {
		addClient: function(client, requestedAPI) {
			client.mediator = this;
			this.clients[client.id] = client;
			
			var self = this;
			this.device.activate(function(error) {
				if (error) {
					client.dispatch("", true);
					return;
				}

				if (requestedAPI === "dataStream") {
					self.emitter.on("data", function(data) {
						client.dispatch(data);
					});
				} else if (requestedAPI === "data") {
					self.emitter.once("data", function(data) {
						client.dispatch(data);
						delete self.clients[client.id];

						if (Object.keys(self.clients).length === 0) {
							self.device.deactivate();
						}
					});
				} else {
					client.dispatch("", true);
				}
			});
		},

		setController: function(controller) {
			
		},

		dispatch: function(data) {
			this.emitter.emit("data", data);	
		}

	}

	return constructor;
}());

module.exports.Mediator = function(device) {
	return new Mediator(device);
}

