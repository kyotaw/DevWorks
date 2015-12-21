'use strict';


var Accelerometer = (function() {
	var uuid = require("node-uuid");


	function constructor(socket) {
		this.socket = socket;
		this.id = 1//uuid.v4();

		var self = this;
		socket.on("data", function(accelX, accelY, accelZ, ack) {
			if (self.mediator && self.state === "active") {
				var accel = {};
				accel.x = accelX;
				accel.y = accelY;
				accel.z = accelZ;
				self.mediator.dispatch(accel);
			}
		});
	}

	constructor.prototype = {
	}

	require("./Thing")(constructor);
	require("./Device")(constructor);

	return constructor;
}());

module.exports = Accelerometer;
