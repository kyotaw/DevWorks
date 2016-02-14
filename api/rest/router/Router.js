'use strict';


(function(Route) {

	var usersRouter = require('./UsersRouter')
	  , devicesRouter = require('./DevicesRouter')
	  , hardwaresRouter = require('./HardwaresRouter')
	  , authRouter = require('./AuthRouter')
	  , header = require('../core/Header');
	
	Route.register = function(app) {

		app.use(header.allowCORS);

		// users
		app.use("/api/users", usersRouter.route());
	
		// devices
		app.use('/api/devices', devicesRouter.route());

		// hardwares
		app.use("/api/hardwares", hardwaresRouter.route());

		// auth
		app.use('/api/auth', authRouter.route());

		// error handling
		// not found
		app.use(function(res, req, next) {
			var err = new Error("Not found");
			err.status = 404;
			next(err);
		});

		// stack trace
		if (app.get("env") === "development") {
			app.use(function(err, req, res, next) {
				res.status(err.status || 500);
				res.json({ "status": "error" });
			});
		}

		// no stack trace
		app.use(function(err, req, res, next) {
			res.status(err.status || 500);
			res.json({ "status": "error" });
		});
	}
}(exports));
