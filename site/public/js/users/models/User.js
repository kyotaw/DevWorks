var app = angular.module('UsersApp');


app.factory('User', ['$resource', function($resource) {

	var usersAPI = $resource('http://localhost:11230/api/users/:username');

	var constructor = function(params) {
		this.api = new usersAPI(params);
	}

	constructor.get = function(query, success, error) {
		var user = new constructor();
		usersAPI.get(query, function(data, resHeaders) {
			for (paramName in data.user) {
				user[paramName] = data.user[paramName];
			}
			if (success) {
				success(user, resHeaders);
			}
		}, function(httpResponse) {
			if (error) {
				error(httpResponse);
			}
		});
		return user;
	}

	return constructor;
}]);
