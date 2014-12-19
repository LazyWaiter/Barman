'use strict';

/* App Module */

var barmanApp = angular.module('barmanApp', [
    'ngRoute',
    'ui.bootstrap',
    'barmanControllers',
    'barmanServices'
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
