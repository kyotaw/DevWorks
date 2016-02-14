'use strict';

var hash = require('../utils/Hash')
  , uuid = require('node-uuid');

var model = require("../models/Model")

var authSchema = {
	token: { type: String, required: true, index: { unique: true } },
	issueDate: { type: Number, required: true },
	expireDate: { type: Number, required: true },
	lastUsedDate: { type: Number, require: true },
	owner: { type: model.Schema.Types.ObjectId, ref: "User" },
	restriction: { type: model.Schema.Types.ObjectId, ref: "CountRestriction" }
}

var Authentication = model.model(authSchema, "Authentication");

Authentication.prototype.isExpired = function() {
	var now = Date.now();
	if (now <= this.expireDate) {
		return false;
	} else {
		return true;
	}
}

module.exports = {
	Authentication: Authentication,

	create: function(params) {	
		params = params || {}; 
		var now = Date.now();
		var expireDate = now + (('expire' in params) ? params.expire : 600000);
		return new Authentication({
			token: hash.get(uuid.v4()),
			issueDate: now,
			expireDate: expireDate,
			lastUsedDate: now,
		});
	}
}

