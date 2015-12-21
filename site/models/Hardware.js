'use strict';


var model = require("./Model");

var hardwareSchema = {
	name: { type: String, require: false },
	type: { type: String, required: true  },
	uuid: { type: String, required: true, index: { unique: true } },
	device: { type: model.Schema.Types.ObjectId, ref: "Device" }
}

var Hardware = model.model(hardwareSchema, "Hardware");

module.exports = Hardware;
