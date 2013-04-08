'use strict';

/* Controllers */

function HomeCtrl($scope, EventBus, Credential) {
	$scope.sessionID = Credential.sessionID();
	$scope.username = Credential.username();
	$scope.password = '';

	$scope.login = function() {
		var username = $scope.username.trim();
		var password = $scope.password.trim();
		if (username != '' && password != '') {
			EventBus.send('vertx.basicauthmanager.login', {username: username, password: password}, function (reply) {
				if (reply.status === 'ok') {
					var sessionID = reply.sessionID;
					Credential.setup(sessionID, username);
					
					$scope.sessionID = sessionID;
					$scope.$apply();
				} else {
					alert('invalid login');
				}
			});
		}
	};

}

function MainCtrl($scope, EventBus, Credential) {
	$scope.sessionID = Credential.sessionID();
	$scope.username = Credential.username();
	$scope.message = '';

	$scope.send = function() {
		if ($scope.message.trim() != '') {
			var agentMsg = {
				sessionID: Credential.sessionID(),
				text: $scope.message
			};
			EventBus.send('agent', agentMsg, function(reply) {
				alert(reply.text);
			});
		}
	};
}
