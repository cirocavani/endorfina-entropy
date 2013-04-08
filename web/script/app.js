'use strict';


// Declare app level module which depends on filters, and services
angular.module('EntropyApp', ['EntropyApp.filters', 'EntropyApp.services', 'EntropyApp.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {templateUrl: 'view/home.html', controller: HomeCtrl});
    $routeProvider.when('/about', {templateUrl: 'view/about.html'});
    $routeProvider.when('/contact', {templateUrl: 'view/contact.html'});
    $routeProvider.when('/main', {templateUrl: 'view/main.html', controller: MainCtrl});
    $routeProvider.otherwise({redirectTo: '/home'});
  }]);
