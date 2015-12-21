'use strict';


(function(Hash) {

	var crypto = require("crypto");
	var secret = require("../core/Secret");

	Hash.get = function(target) {
		var sha = crypto.createHmac("sha256", secret.SECRET_FOR_HASH);
		sha.update(target);
		return sha.digest("hex");	
	}

}(exports));
