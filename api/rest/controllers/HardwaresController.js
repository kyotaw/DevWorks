'use strict';


(function(HardwaresController) {
	var	Hardware = require('../../../site/models/Hardware')
	  , Device = require('../../../site/models/Device');

	HardwaresController.query = function(req, res) {
		if (!req.query.deviceId) {
			return res.json({ 'status': 'success', 'hardwares': [] });
		}
		var query = Device.where({ deviceId: req.query.deviceId });
		query.findOne(function(err, device) {
			if (err) {
				return res.json({ 'status': 'error' });
			}
			if (!device) {
				return res.json({ 'status': 'error', 'message': 'device not found' });
			}
			Hardware.find({ 'device': device._id }).exec(function(err, hardwares) {
				if (err) {
					return res.json({ 'status': 'error' });
				}
				var resHarwares = [];
				var hwCount = hardwares.length;
				for (var i = 0; i < hwCount; ++i) {
					var hardware = hardwares[i];
					resHarwares.push({
						'naem': hardware.name,
						'type': hardware.type,
						'id': hardware.uuid
					});
				}
				return res.json({ 'status': 'success', 'hardwares': resHarwares });
			});
		});
	
	}
}(exports));
