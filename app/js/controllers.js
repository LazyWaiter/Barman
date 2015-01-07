'use strict';

/* Controllers */

var barmanControllers = angular.module('barmanControllers', []);

barmanControllers.controller('CommandListController', ['$scope', 'Order', 'ControlTime', '$interval', function($scope, Order, ControlTime,$interval) {
    $scope.orderService = Order;
    $scope.controlTime = ControlTime;
    $scope.orderService.fetchOrders();

    $scope.orderService.startFetchingEvery(60000);
}]);
