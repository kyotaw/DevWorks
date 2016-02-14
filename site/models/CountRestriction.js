'use strict';


var model = require("../models/Model")


var countRestrictionSchema = {
	interval: { type: Number, required: true, default: 6000 },
	maxCountInInterval: { type: Number, required: true, default: 20 },
	usedCountInInterval: { type: Number, required: true, default: 0 },
	periodStartDate: { type: Number, required: true }
};

var CountRestriction = model.model(countRestrictionSchema, "CountRestriction");

CountRestriction.prototype.isExpired = function() {
	var now = Date.now();
	if (this.periodStartDate + this.interval < now) {
		this.reset();
	}
	if (this.usedCountInInterval < this.maxCountInInterval) {
		++this.usedCountInInterval;
		return false;
	} else {
		return true;
	}
};

CountRestriction.prototype.reset = function() {
	this.usedCountInInterval = 0;
	this.periodStartDate = Date.now();
};

module.exports = {
	CountRestriction: CountRestriction,

	create: function(params) {
		params = params || {}; 
		var interval = ('interval' in params) ? params.interval : countRestrictionSchema.interval.default;
		var maxCountInInterval = ('maxCountInInterval' in params) ? params.maxCountInInterval : countRestrictionSchema.maxCountInInterval.default;
		var periodStartDate = Date.now();
		return new CountRestriction({
			interval: interval,
			maxCountInInterval: maxCountInInterval,
			periodStartDate: periodStartDate
		});
	}
};
