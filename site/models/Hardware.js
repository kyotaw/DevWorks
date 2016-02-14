'use strict';


var model = require("./Model");

var hardwareSchema = {
	name: { type: String, require: false },
	type: { type: String, required: true  },
	uuid: { type: String, required: true, index: { unique: true } },
	device: { type: model.Schema.Types.ObjectId, ref: "Device" }
}

var Hardware = model.model(hardwareSchema, "Hardware");

Hardware.prototype.serialize = function() {
	var res = {};
	res['name'] = this.name;
	res['type'] = this.type;
	res['uuid'] = this.uuid;
	return res;
}

module.exports = Hardware;
