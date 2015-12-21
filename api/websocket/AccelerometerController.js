'use strict';



var AccelerometerController = (function() {

	var Client = require("./Client").Client;
	var mediatorManager = require("./MediatorManager");
	

	function constructor(io) {
		this.io = io;
	}

	constructor.prototype = {
		handle: function(socket) {
			socket.on("query", function(data, ack) {
				var mediator = mediatorManager.getMediator(data.deviceID);
				if (mediator === null) {
					ack("error");
				} else {
					mediator.addClient(Client(data.clientID, socket), data.api);
				}
			});
		}
	}

	return constructor;
}());


module.exports.AccelerometerController = function(io) {
	return new AccelerometerController(io);
}
