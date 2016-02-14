"use strict";


(function(LoginController) {

	var auth = require("../core/Auth")
	  , passport = require("passport");

	LoginController.login = function(req, res, next) {
		passport.authenticate("local", function(err, user, info) {
			if (err) {
				return next(err);
			}
			if (!user) {
				return res.render("login", { message: "ユーザーIDかパスワードが違います" });
			}
			req.logIn(user, function(err) {
				if (err) {
					return next(err);
				}
				return res.redirect("/users/" + user.username);
			});
		})(req, res, next);
	}

	LoginController.isLogined = function(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect("/login");
		}
	}
}(exports));
