'use strict';

/* App Module */

var barmanApp = angular.module('barmanApp', [
    'ngAnimate',
    'ngRoute',
    'ui.bootstrap',
    'barmanControllers',
    'barmanServices',
    "barmanDirectives"
]);

/* Routes configuration */
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
