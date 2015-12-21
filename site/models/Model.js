'use strict';


(function(Model) {

	var env = require("../core/Env");
	var mongoose = require("mongoose");
	mongoose.connect("mongodb://" + env.DB_HOST + "/" + env.DB_NAME, function(err, db) {
		if (err) {
			console.log(err);
		}
	});

	Model.Schema = mongoose.Schema;

	Model.model = function(schema, modelName) {
		return mongoose.model(modelName, new mongoose.Schema(schema));
	}

}(exports));
