'use strict';


(function(AuthController) {
	var	Authentication = require('../../../site/models/Authentication')
	  , CountRestriction = require('../../../site/models/CountRestriction')
      , User = require('../../../site/models/User').User
	  , hash = require('../../../site/utils/Hash')
	  , JsonRes = require('../core/JsonResponse').JsonResponse
	  , async = require('async');

	AuthController.authenticate = function(req, res) {
		User.findOne({ username: req.body.username }).populate('auth').exec(function(err, user) {
			if (err) {
				return res.json(new JsonRes().error().json);
			}
			if (!user) {
				return res.json(new JsonRes().error());
			}
			var passwordHash = hash.get(req.body.password);
			if (user.password === passwordHash) {
				if (user.auth) {
					if (user.auth.isExpired()) {
						user.auth.remove();
						user.auth = null;
					} else {
						return res.json(new JsonRes().success().access_token(user.auth.token).json);
					}
				}

				var auth = Authentication.create();
				var restriction = CountRestriction.create();
				async.series([
					function(cb) {
						restriction.save(function(err) {
							cb(err, restriction);
						});
					},
					function(cb) {
						auth.restriction = restriction._id;
						auth.save(function(err) {
							cb(err, auth);
						});
					},
					function(cb) {
						user.auth = auth._id;
						user.save(function(err) {
							cb(err, user);
						});
					}
				], function(err, values) {
					if (err) {
						restriction.remove();
						auth.remove();
						return res.json(new JsonRes().error().json);
					}
					return res.json(new JsonRes().success().access_token(auth.token).json);
				});
			}
		});
	}

	AuthController.isAuthenticated = function(req, res, next) {
		if (req.header('Authorization') === undefined) {
			res.header('WWW-Authenticate', 'Bearer realm="token required"');
			return res.status(401).json(new JsonRes().error().json);
		}
	}
}(exports));
