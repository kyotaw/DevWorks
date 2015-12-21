'use strict';


module.exports = function(Hardware) {
	var env = require("../core/Env");
	var mongoose = require("mongoose");
	mongoose.connect("mongodb://" + env.DB_HOST + "/" + env.DB_NAME, function(err, db) {
		if (err) {
			console.log(err);
		}
	});
	
	Hardware.state = "idle";

	Hardware.create = function(uuid, socket) {
		
	}

	Hardware.prototype.activate = function(callback) {
		if (this.socket === null) {
			callback(true);
		}

		this.socket.emit("activate")

		var self = this;
		this.socket.once("activate-ack", function(status) {
			if (status === "error" && callback !== null && callback !== undefined) {
				callback(true);
			} else {
				callback(false);
				self.state = "active";
			}
		});
	},

	Hardware.prototype.deactivate = function(callback) {
	
	}

}
