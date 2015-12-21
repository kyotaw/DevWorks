'use strict';


module.exports = function(Thing) {

	Thing.mediator = null;

	Thing.prototype.addMediator = function(mediator) {
		this.mediator = mediator;
	}
}
