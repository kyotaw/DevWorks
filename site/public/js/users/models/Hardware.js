var app = angular.module('UsersApp');


app.factory('Hardware', ['$resource', function($resource) {

	var hardwaresAPI = $resource('http://localhost:11230/api/hardwares/:hardwareId?deviceId=:deviceId');

	var constructor = function(params) {
		this.api = new hardwaresAPI(params);
	}

	constructor.query = function(query, success, error) {
		var hardwares = [];
		hardwaresAPI.get(query, function(data, resHeaders) {
			var hwCount = data.hardwares.length;
			for (var i = 0; i < hwCount; ++i) {
				var hwData = data.hardwares[i];
				var hardware = new hardwaresAPI();
				for (paramName in hwData) {
					hardware[paramName] = hwData[paramName];
				}
				hardwares.push(hardware);
			}
			if (success) {
				success(hardwares, resHeaders);
			}
		}, function(httpResponse) {
			if (error) {
				error(httpResponse);
			}
		});
		return hardwares;
	}

	return constructor;
}]);
