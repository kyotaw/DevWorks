'use strict';


(function(Env) {

	var settings = require("../Settings");

	Env.DB_HOST = ("DB_HOST" in settings) ? settings.DB_HOST : "127.0.0.1";

	Env.DB_NAME = ("DB_NAME" in settings) ? settings.DB_NAME : "ThingsDB";

	Env.PORT = ("PORT" in settings) ? settings.PORT : 11230;

}(exports));
