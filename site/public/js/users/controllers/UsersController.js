var app = angular.module('UsersApp');

app.controller('UsersController', ['$scope', 'User', 'Hardware', function($scope, User, Hardware) {
	$scope.user = User.get({ username: 'testuser' });
	$scope.hardwares = [];
		
	$scope.showDeviceDetail = function(index) {
		$scope.hardwares = Hardware.query({ deviceId: $scope.user.devices[index].deviceId });
	}
}]);
