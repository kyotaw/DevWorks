'use strict';


var constructor = function() {
	this.json = {};
}

constructor.prototype = {
	
	success: function() {
		this.json['status'] = 'success';
		return this;
	},
	error: function() {
		this.json['status'] = 'error';
		return this;
	},
	access_token: function(token) {
		this.json['access_token'] = token;
		return this;
	},
	device: function(device) {
		this.json['device'] = device.serialize();
		return this;
	},
	hardwares: function(hardwares) {
		var hws = [];
		for (var i = 0; i < hardwares.length; ++i) {
			hws.push(hws[i].serialize());
		}
		this.json['hardwares'] = hws;
		return this;
	},
	user: function(user) {
		this.json['user'] = user;
		return this;
	},
	users: function(users) {
		this.json['users'] = users;
		return this;
	},
	message: function(message) {
		this.json['message'] = message;
		return this;
	}
};

module.exports = {
	JsonResponse: constructor
}
