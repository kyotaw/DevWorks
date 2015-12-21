'use strict';


var model = require("./Model");
var hash = require("../utils/Hash");

var userSchema = {
	username: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	devices: [{ type: model.Schema.Types.ObjectId, ref: "Device" }]
}

var User = model.model(userSchema, "User");

User.count({}, function(err, count) {
	if (!err && count === 0) {
		var testUser = new User({
			username: "testuser",
			password: hash.get("test"),
			email: "httg1326@gmail.com"
		});
		testUser.save(function(err, user) {
			if (err) {
				console.log("user save error");
			}
		});
	}
});

module.exports = User;
