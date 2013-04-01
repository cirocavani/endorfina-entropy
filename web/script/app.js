'use strict';


// Declare app level module which depends on filters, and services
angular.module('EntropyApp', ['EntropyApp.filters', 'EntropyApp.services', 'EntropyApp.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {templateUrl: 'view/login.html', controller: LoginCtrl});
    $routeProvider.when('/site', {templateUrl: 'view/site.html', controller: SiteCtrl});
    $routeProvider.otherwise({redirectTo: '/login'});
  }]);
