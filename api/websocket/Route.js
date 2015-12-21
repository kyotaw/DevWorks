'use strict';


(function(Route) {

	var routes = {
		"/devices": require("./DeviceController").DeviceController,
		"/accelerometers": require("./AccelerometerController").AccelerometerController
	};

	var handlers = {};
	
	Route.register = function(socketIO) {
		for (var route in routes) {
			var io = socketIO.of(route);
			var handler = routes[route](io);
			io.on("connection", handler.handle);
			handlers[route] = handler;
		}
	}


}(module.exports));
