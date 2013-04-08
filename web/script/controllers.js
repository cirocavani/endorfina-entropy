'use strict';

/* Controllers */

function HomeCtrl($scope, EventBus, Credential) {
	$scope.sessionID = Credential.sessionID();
	$scope.principal = Credential.principal();

	$scope.signin = function() {
		var principal = $scope.signin_principal.trim();
		var secret = $scope.signin_secret.trim();
		$scope.signin_secret = '';

		if (principal != '' && secret != '') {
			EventBus.send('accountmanager.login', {username: principal, password: secret}, function (reply) {
				if (reply.status === 'ok') {
					var sessionID = reply.sessionID;
					Credential.setup(sessionID, principal);

					$scope.signin_principal = '';
					$scope.sessionID = sessionID;
					$scope.principal = principal;
					$scope.$apply();
				} else {
					alert('Sign in failed!');
				}
			});
		}
	};

	$scope.signup = function() {
		var name = $scope.signup_name.trim();
		var principal = $scope.signup_principal.trim();
		var secret = $scope.signup_secret.trim();
		if (principal != '' && secret != '') {
			alert('not implemented');
//			EventBus.send('accountmanager.signup', {name: name, principal: principal, secret: secret}, function (reply) {
//				if (reply.status === 'ok') {
//				} else {
//					alert('Sign up failed');
//				}
//			});
		}
	};

	$scope.signout = function() {
		if (Credential.sessionID() != '') {
			EventBus.send('accountmanager.logout', {sessionID: Credential.sessionID()}, function (reply) {
				if (reply.status === 'ok') {
					Credential.reset();
					
					$scope.sessionID = '';
					$scope.$apply();
				} else {
					alert('Sign out failed!');
				}
			});
		}
	};

}

function MainCtrl($scope, EventBus, Credential) {
	$scope.sessionID = Credential.sessionID();
	$scope.principal = Credential.principal();
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
