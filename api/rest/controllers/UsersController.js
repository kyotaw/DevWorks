"use strict";


(function(UsersController) {

	var User = require('../../../site/models/User')
	  , Device = require('../../../site/models/Device')
	  , Hardware = require('../../../site/models/Hardware');


	UsersController.query = function(req, res) {
		User.find().exec(function(err, users) {
			if (err) {
				return res.json({ 'status': 'error' });
			}
			var usernames = [];
			var userCount = users.length;
			for (var i = 0; i < userCount; ++i) {
				usernames.push(users[i].username);
			}
			return res.json({ 'status': 'success', 'users': usernames });
		});
	}

	UsersController.get = function(req, res) {
		User.findOne(req.params.username).populate('devices hardwares').exec(function(err, user) { 
			if (err) {
				return res.json({ 'status': 'error' });
			}
			if (!user) {
				return res.json({ 'status': 'error', 'message': 'user not found' });
			}

			var devices = [];
			var deviceCount = user.devices.length;
			for (var devIndex = 0; devIndex < deviceCount; ++devIndex) {
				var device = user.devices[devIndex];
				devices.push({
					'name': device.name,
					'deviceId': device.deviceId,
				});
			}

			return res.json({
				'status': 'success',
				'user': {
					'username': user.username,
					'devices': devices
				}
			});
		});
	}

}(exports));
