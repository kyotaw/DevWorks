'use strict';


(function(Entry) {

	var env = require("./core/Env")
	  , router = require("./router/Router")
	  , express = require("express")
	  , logger = require("morgan")
	  , cookieParser = require("cookie-parser")
	  , bodyParser = require("body-parser")
	  , http = require("http");

	var app = express();

	app.set("port", env.PORT);
	
	app.use(logger("dev"));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: false
	}));
	app.use(cookieParser())

	// route
	router.register(app);
	
	Entry.start = function() {
		http.createServer(app).listen(app.get("port"), function() {
			console.log("Things REST API server listning on port " + app.get("port"));
		});
	}
}(exports));
