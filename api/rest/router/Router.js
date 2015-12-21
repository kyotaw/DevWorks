'use strict';


(function(Route) {

	var usersRouter = require('./UsersRouter')
	  , hardwaresRouter = require('./HardwaresRouter')
	  , header = require('../core/Header');
	
	Route.register = function(app) {

		app.use(header.allowCORS);

		// users
		app.use("/api/users", usersRouter.route());
		
		// hardwares
		app.use("/api/hardwares", hardwaresRouter.route());

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
