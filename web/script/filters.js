'use strict';

/* Filters */

angular.module('EntropyApp.filters', []).
  filter('version', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }]);
