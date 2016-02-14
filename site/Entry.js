'use strict';


(function(Entry) {

	var env = require("./core/Env")
	  , secret = require("./core/Secret")
	  , router = require("./router/Router")
  	  , flash = require("connect-flash")
	  , express = require("express")
	  , session = require("express-session")
	  , passport = require("passport")
	  , favicon = require("serve-favicon")
	  , logger = require("morgan")
	  , cookieParser = require("cookie-parser")
	  , bodyParser = require("body-parser")
	  , path = require("path")
	  , http = require("http");

	var app = express();

	app.set("port", env.PORT);
	app.set("views", __dirname + "/views");
	app.set("view engine", "jade");
	
	app.use(flash());
	
	app.use("/static", express.static(path.join(__dirname, "public")));
	
	app.use(logger("dev"));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: false
	}));
	app.use(cookieParser())

	// session
	var MongoStore = require("connect-mongo")(session);
	app.use(session({
		secret: secret.SECRET_FOR_SESSION
	}));

	// account
	var User = require("./models/User").User;
	var auth = require("./core/Auth");
	auth.setAuthUser(User);
	app.use(passport.initialize());
	app.use(passport.session());

	// system api authentication
	auth.refreshSystemToken();
	
	// route
	router.register(app);
	
	Entry.start = function() {
		http.createServer(app).listen(app.get("port"), function() {
			console.log("Things site listning on port " + app.get("port"));
		});
	}
}(exports));
