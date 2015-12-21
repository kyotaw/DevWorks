'use strict';


(function(MediatorManager) {

	var Mediator = require("./Mediator").Mediator;

	var mediators = {};

	MediatorManager.createMediator = function(device) {
		if (device.id in mediators) {
			var mediator = mediators[device.id]
			if (mediator.device.socket.cnnected === false) {
				delete mediators[device.id];
				return MediatorManager.createMediator(device);
			}
			return mediators[device.id];
		} else {
			var mediator = new Mediator(device);
			mediators[device.id] = mediator;
			return mediator;
		}
	}

	MediatorManager.getMediator = function(deviceID) {
		if (deviceID in mediators) {
			return mediators[deviceID];
		} else {
			return null;
		}
	}
	




}(module.exports));
