'use strict';


(function(HardwaresRouter) {
	var express = require('express')
  	  , controller = require('../controllers/HardwaresController')

	HardwaresRouter.route = function() {
		var router = express.Router();
		
		router.get('/', controller.query);

		return router;
	}

}(exports));
