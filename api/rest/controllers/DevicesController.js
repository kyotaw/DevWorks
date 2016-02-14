'use strict';


(function(DevicesController) {

	var errorMessage = require('../core/ErrorMessage').ErrorMessage
	  , errorCode = require('../core/ErrorCode').ErrorCode
	  , Device = require('../../../site/models/Device')
	  , JsonRes = require('../core/JsonResponse').JsonResponse
	  , env = require('../core/Env')
	  , async = require('async');

	DevicesController.get = function(req, res) {
		async.waterfall([
			function(next) {
				if (!req.query.deviceId) {
					return next(errorCode.REQUEST_PARAMETER_INVALID);
				}
				next(null, req.query.deviceId);
			},
			function(deviceId, next) {
				Device.findOne({'deviceId': deviceId}).populate('hardwares').exec(function(err, device) {
					if (err) {
						return next(errorCode.DB_UNKNOWN_ERROR);
					}
					if (!device) {
						return next(errorCode.DEVICE_NOT_FOUND);
					}
					next(null, device);
				});
			}
		], function(err, device) {
			if (err) {
				if (err === errorCode.DEVICE_NOT_FOUND) {
					return res.json(new JsonRes().error().message(errorMessage(err)).json);
				} else {
					return res.status(500).json(new JsonRes().error().message(errorMessage(err)).json);
				}
			}
			return res.json(new JsonRes().success().device(device).json);
		});
	}

	DevicesController.register = function(req, res) {
		async.waterfall([
			function(next) {
				if (!req.params.deviceId) {
					return next(errorCode.REQUEST_PARAMETER_INVALID);
				}
				next(null, req.params.deviceId);
			},
			function(deviceId, next) {
				Device.count({'deviceId': deviceId}, function(err, device) {
					if (err) {
						return next(errorCode.DB_UNKNOWN_ERROR);
					}
				});
			}
		])
	}

}(exports));
