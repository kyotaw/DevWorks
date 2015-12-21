'use strict';


(function(Entry) {

	function onRequest() {
	}

	var server = require("http").createServer(onRequest)
	  , socketIO = require("socket.io")(server)
	  , route = require("./Route")
	  , env = require("./core/Env");

	Entry.start = function() {
		server.listen(env.PORT);
		route.register(socketIO);
	}

}(exports));

