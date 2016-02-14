'use strict';


(function(HardwaresController) {
	var	Hardware = require('../../../site/models/Hardware')
	  , JsonRes = require('../core/JsonResponse').JsonResponse
	  , Device = require('../../../site/models/Device');

	HardwaresController.query = function(req, res) {
		if (!req.query.deviceId) {
			return res.json(new JsonRes().error().json);
		}
		Device.findOne({'deviceId': req.query.deviceId}, function(err, device) {
			if (err) {
				return res.json(new JsonRes().error().json);
			}
			if (!device) {
				return res.json(new JsonRes().error().messsage('device not found').json);
			}
			Hardware.find({ 'device': device._id }).exec(function(err, hardwares) {
				if (err) {
					return res.json(new JsonRes().error().json);
				}
				return res.json(new JsonRes().success().hardwares(harwares).json);
			});
		});
	
	}
}(exports));
