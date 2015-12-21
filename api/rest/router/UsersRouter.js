'use strict';


(function(UsersRouter) {
	var express = require('express')
  	  , controller = require('../controllers/UsersController')

	UsersRouter.route = function() {
		var router = express.Router();
		
		router.get('/', controller.query);
		router.get('/:username', controller.get);

		return router;
	}

}(exports));
