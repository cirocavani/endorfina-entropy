'use strict';

/* Services */

var serviceModule = angular.module('EntropyApp.services', []);

serviceModule.value('version', '1.0');

serviceModule.factory('Credential', function() {
	var sessionID = '';
    var username = '';

	return {
		setup: function(id, u) {
			sessionID = id;
			username = u;
		},
		sessionID: function() {
			return sessionID;
		},
		username: function() {
			return username;
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