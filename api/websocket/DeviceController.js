'use strict';


var DeviceController = (function(DeviceController) {

	var Accelerometer = require("./Accelerometer");
	var mediatorManager = require("./MediatorManager");

	function constructor(io) {
		this.io = io;
	}

	constructor.prototype = {
			
		handle: function(socket) {
			socket.on("deviceInfo", function(deviceType, ack) {
				if (deviceType == "accelerometer") {
					var device = new Accelerometer(socket);
					mediatorManager.createMediator(device);
					ack("success");
				} else {
					ack("error");
				}
			});
		}
	}

	return constructor;
}());

module.exports.DeviceController = function(io) {
	return new DeviceController(io);
}
