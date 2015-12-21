'use strict';


(function(Auth) {
	var passport = require("passport")
 	  , LocalStrategy = require("passport-local").Strategy
	  , hash = require("../utils/Hash")
	  , uuid = require("node-uuid")

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
					User.findOne({ username: username }, function(err, user) {
						if (err) {
							return done(err);
						}
						if (user) {
							var passwordHash = hash.get(password);
							if (user.password === passwordHash) {
								return done(null, user);
							}
						}
						return done(null, false, { message: "ユーザーIDまたはパスワードが違います。" })
					});
				});
			}
		));
	}

	Auth.isLogined = function(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect("/login");
		}
	}

	Auth.SYSTEM_API_TOKEN = hash.get(uuid.v4());
}(exports));
