'use strict';


(function(Route) {

	var loginRouter = require('./LoginRouter')
	  ,  usersRouter = require('./UsersRouter');
	
	Route.register = function(app) {

		app.get('/', function(req, res) {
			res.redirect('/login');
		});

		app.use("/login", loginRouter.route());
		app.use("/users", usersRouter.route());

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
				res.json({ "status": err });
			});
		}

		// no stack trace
		app.use(function(err, req, res, next) {
			res.status(err.status || 500);
			res.json({ "status": err });
		});
	}
}(exports));
