'use strict';


(function(AuthRouter) {
	var express = require('express')
  	  , controller = require('../controllers/AuthController')

	AuthRouter.route = function() {
		var router = express.Router();
		
		router.post('/', controller.authenticate);

		return router;
	}

}(exports));
