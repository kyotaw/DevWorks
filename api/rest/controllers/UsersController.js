"use strict";


(function(UsersController) {

	var User = require('../../../site/models/User').User
	  , Device = require('../../../site/models/Device')
	  , hash = require('../../../site/utils/Hash')
	  , JsonRes = require('../core/JsonResponse').JsonResponse
	  , errorMessage = require('../core/ErrorMessage').ErrorMessage
	  , errorCode = require('../core/ErrorCode').ErrorCode
	  , Hardware = require('../../../site/models/Hardware')
	  , async = require('async');


	UsersController.query = function(req, res) {
		User.find().exec(function(err, users) {
			if (err) {
				return res.json(new JsonRes().error().json);
			}
			var usernames = [];
			var userCount = users.length;
			for (var i = 0; i < userCount; ++i) {
				usernames.push(users[i].username);
			}
			return res.json(new JsonRes().success().users(usernames).json);
		});
	}

	UsersController.get = function(req, res) {
		User.findOne({'username': req.params.username}).populate('devices hardwares').exec(function(err, user) { 
			if (err) {
				return res.json(new JsonRes().error().json);
			}
			if (!user) {
				return res.json(new JsonRes().error().message(errorMessage(errorCode.USER_NOT_FOUND)).json);
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

			return res.json(new JsonRes().success().user({'username': user.username, 'devices': devices}).json);
		});
	}

	UsersController.create = function(req, res) {
		async.waterfall([
			function(next) {
				if (req.params.username === undefined ||
					req.params.password === undefined ||
					req.params.email === undefined) {
					return next(errorCode.REQUEST_PARAMETER_INVALID);
				}
				next(null, null);
			},
			function(value, next) {
				User.count({ 'username': req.params.username }, function(err, count) {
					if (err) {
						return next(errorCode.DB_UNKNOWN_ERROR);
					}
					if (0 < count) {
						return next(errorCode.USER_NAME_ALREADY_USED);
					}
					next(null, null);
				});
			},
			function(value, next) {
				User.count({ 'email': req.params.username }, function(err, count) {
					if (err) {
						return next(errorCode.DB_UNKNOWN_ERROR);
					}
					if (0 < count) {
						return next(errorCode.USER_EMAIL_ALREADY_USED);
					}
					next(null, null);
				});
			},
			function(value, next) {
				var user = new User({
					'username': req.params.username,
					'password': hash.get(req.params.password),
					'email': req.params.email
				});
				user.save(function(err) {
					if (err) {
						return next(errorCode.DB_UNKNOWN_ERROR);
					}
					next(null, user);
				});
			}
		], function(err, user) {
			if (!err && user) {
				return res.json(new JsonRes().success().user({ 'username': user.username, 'email': user.email }));
			}

			if (err) {
				if (err === errorCode.USER_NAME_ALREADY_USED || err === errorCode.USER_EMAIL_ALREADY_USED) {
					return res.json(new JsonRes().error().message(errorMessage(err)).json);
				}
			}
			return res.status(500).json(new JsonRes().error().json);
		});
	}

}(exports));
