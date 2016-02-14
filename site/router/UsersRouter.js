'use strict';


(function(UsersRouter) {
	var express = require('express')
	  , auth = require('../core/Auth')
	  , loginController = require('../controllers/LoginController')
  	  , controller = require('../controllers/UsersController');

	UsersRouter.route = function() {
		var router = express.Router();
		
		router.get('/:username', loginController.isLogined, controller.index);

		return router;
	}

}(exports));
