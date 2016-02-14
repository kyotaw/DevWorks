'use strict';


(function(DevicesRouter) {
	var express = require('express')
  	  , controller = require('../controllers/DevicesController')
	
	DevicesRouter.route = function() {
		var router = express.Router();
		
		router.get('/', controller.get);

		return router;
	}

}(exports));
