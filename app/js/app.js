'use strict';

/* App Module */

var barmanApp = angular.module('barmanApp', ['ngRoute','barmanControllers', 'ui.bootstrap']);

barmanApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/command-list.html',
        controller: 'CommandListController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
