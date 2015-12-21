'use strict';


(function(Env) {

	var settings = require("../Settings");

	Env.DB_Host = ("DB_HOST" in settings) ? settings.DB_HOST : "localhost";

	Env.DB_NAME = ("DB_NAME" in settings) ? settings.DB_NAME : "ThingsDB";
	
	Env.PORT = ("PORT" in settings) ? settings.PORT : 80;

}(exports));
