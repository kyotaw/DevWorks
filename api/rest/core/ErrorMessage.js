'use strict';


var ErrorCode = require('./ErrorCode').ErrorCode;

var messages = {}

messages[ErrorCode.UNKNOWN_ERROR] = function() {
	return 'unknown error';
}
messages[ErrorCode.DB_UNKNOWN_ERROR] = function() {
	return 'unknown db error';
}
messages[ErrorCode.USER_UNKNOWN_ERROR] = function() {
	return 'user api unknown error';
}
messages[ErrorCode.USER_NAME_ALREADY_USED] = function() {
	return 'username aleady used';
}
messages[ErrorCode.USER_EMAIL_ALREADY_USED] = function() {
	return 'email address aleady used';
}
messages[ErrorCode.USER_NOT_FOUND] = function() {
	return 'user not found';
}
messages[ErrorCode.DEVICE_UNKNOWN_ERROR] = function() {
	return 'device api unknown error';
}
messages[ErrorCode.DEVICE_NOT_FOUND] = function() {
	return 'device not found';
}
messages[ErrorCode.HARDWARE_UNKNOWN_ERROR] = function() {
	return 'hardware api unknown error';
}
messages[ErrorCode.REQUEST_UNKNOWN_ERROR] = function() {
	return 'invalid request';
}
messages[ErrorCode.REQUEST_PARAMETER_INVALID] = function() {
	return 'invalid parameters';
}


module.exports = {
	ErrorMessage: function(errorCode) {
		return (errorCode in messages) ? messages[errorCode]() : 'unknown error';
	}
}
