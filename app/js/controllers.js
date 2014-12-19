'use strict';

/* Controllers */

var barmanControllers = angular.module('barmanControllers', []);

/* Command List Controller */

barmanControllers.controller('CommandListController', ['$scope', 'Order', '$interval', function($scope, Order, $interval) {
    $scope.orders = [];

    /*
     * Check if the status is 'to_prepare'
     *
     * @param order : the object which want to check the status
     * @return true or false
     */
    $scope.isToPrepare = function(order) {
        return order.value.status === "to_prepare" ? true : false;
    };

    /*
     * Update status of an order and delete it from orders array
     *
     * @param order: The order which want to update the status
     */
    $scope.updateStatusToReady = function(object) {
        var order = object.value;
        order.status = "to_delivery";

        Order.updateOrderStatusToReady($scope, order);
    };

    Order.fetchOrders($scope);

    /*
     * Refresh data every 60 seconds
     *
     */
    $interval(function() {
        Order.fetchOrders($scope);
    }, 60000);
}]);
