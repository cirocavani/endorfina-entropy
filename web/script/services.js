'use strict';

/* Services */

var serviceModule = angular.module('EntropyApp.services', []);

serviceModule.value('version', '1.0');

serviceModule.factory('Credential', function() {
	var sessionID = '';
    var principal = '';

	return {
		setup: function(id, p) {
			sessionID = id;
			principal = p;
		},
		reset: function() {
			sessionID = '';
			principal = '';
		},
		sessionID: function() {
			return sessionID;
		},
		principal: function() {
			return principal;
		}
	};
});

serviceModule.factory('EventBus', ['$window', function(w) {
	var eb = new vertx.EventBus(w.location.protocol + '//' + w.location.hostname + ':' + w.location.port + '/eventbus');

	eb.onclose = function() {
		eb = null;
	};

    return {
    	send: function(address, message, handler) {
    		eb.send(address, message, handler); 
    	}
    };
}]);