'use strict';


var model = require("./Model")
  , secret = require("../core/Secret")
  , auth = require("../core/Auth")

var authSchema = {
	token: { type: String, required: true, index: { unique: true } },
	issueDate: { type: Date, required: true },
	expireDate: { type: Date, required: true },
}

var Authentication = model.model(authSchema, "Authentication");


module.exports.Authentication = Authentication;

module.exports.refreshSystemToken = function() {
	var now = new Date();
	Authentication.update(
		{ _id: secret.SYTEM_AUTH_OBJECT_ID },
		{ $set: { token: auth.SYSTEM_API_TOKEN, issueDate: now, expireDate: now.setYear(now.getYear()) } },
		function(err, rawRes) {
			if (err) {
				console.log("sytem auth update failed");
			}
		}
	);
}
