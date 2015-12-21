'use strict';


var model = require("./Model");

var deviceSchema = {
	name: { type: String, require: true },
	deviceId: { type: String, require: true, index: { unique: true } },
	hardwares: [{ type: model.Schema.Types.ObjectId, ref: "Hardware" }],
	owner: { type: model.Schema.Types.ObjectId, ref: "User" }
}

var Device = model.model(deviceSchema, "Device");

module.exports = Device;
