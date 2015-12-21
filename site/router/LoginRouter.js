'use strict';


(function(UsersRouter) {
	var express = require('express')
  	  , controller = require('../controllers/LoginController')

	UsersRouter.route = function() {
		var router = express.Router();
	
		router.get('/', function(req, res) {
			res.render('login');
		});

		router.post('/', controller.login);

		return router;
	}

}(exports));
