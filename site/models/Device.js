'use strict';


var model = require("./Model");

var deviceSchema = {
	name: { type: String, require: true },
	deviceId: { type: String, require: true, index: { unique: true } },
	hardwares: [{ type: model.Schema.Types.ObjectId, ref: "Hardware" }],
}

var Device = model.model(deviceSchema, "Device");

Device.prototype.serialize = function() {
	var res = {};
	res['name'] = this.name;
	res['deviceId'] = this.deviceId;
	var hardwares = [];
	for (var hw in this.hardwares) {
		if (typeof hw === 'Device') {
			hardwares.push(hw.serialize());
		}
	}
	return res;
}

module.exports = Device;
