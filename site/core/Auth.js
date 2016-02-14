'use strict';


(function(Auth) {
	var passport = require("passport")
 	  , LocalStrategy = require("passport-local").Strategy
	  , hash = require("../utils/Hash")
	  , User = require('../models/User').User
	  , Env = require('../core/Env')
	  , uuid = require("node-uuid")
	  , rest = require("restler");

	Auth.setAuthUser = function(User) {
		passport.serializeUser(function(user, callback) {
			callback(null, { email: user.email, _id: user._id });
		});

		passport.deserializeUser(function(serializedUser, callback) {
			User.findById(serializedUser._id, function(err, user) {
				callback(err, user);
			});
		});

		passport.use(new LocalStrategy(
			{ usenameField: "username", passwordField: "password" },
			function(username, password, done) {
				process.nextTick(function() {
					rest.post(Env.API_URL + '/api/auth/',{
						data: {
							username: username,
							password: password
						}
					}).on('complete', function(data) {
						if (data['status'] === 'success') {
							User.findOne({username: username}).exec(function(err, user) {
								return done(null, user);	
							});
						} else {
							return done(null, false, { message: "ユーザーIDまたはパスワードが違います。" })
						}
					});
				});
			})
		);
	}

	Auth.SYSTEM_API_TOKEN = hash.get(uuid.v4());

	var Authentication = require('../models/Authentication').Authentication
  	  , secret = require("../core/Secret");

	Auth.refreshSystemToken = function() {
		var now = Date.now();
		var date = new Date();
		date.setFullYear(date.getFullYear() + 1);
		var expire = date.getTime();
		Authentication.update(
			{ _id: secret.SYTEM_AUTH_OBJECT_ID },
			{ $set: { token: Auth.SYSTEM_API_TOKEN, issueDate: now, expireDate: expire, lastUsedDate: now, interval: 0 } },
			function(err, rawRes) {
				if (err) {
					console.log("sytem auth update failed");
				}
			}
		);
	}
}(exports));
