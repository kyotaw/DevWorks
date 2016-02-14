'use strict';


var ErrorCode = require('./ErrorCode')
  , ErrorMessage = require('./ErrorMessage');


var constructor = function(errorCode) {
	this.errorCode = (errorCode !== undefined) ? errorCode : ErrorCode.UNKNOWN_ERROR;
}

constructor.prototype = {
	message: function() {
		return (this.errorCode in ErrorMessage) ? ErrorMessage[this.errorCode]() : '';
	}
}

module.exports = {
	ErrorCode: ErrorCode,
	Error: constructor
}
