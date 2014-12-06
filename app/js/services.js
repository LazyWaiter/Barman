'use strict';

/* Services */

var barmanServices = angular.module('barmanServices', ['$http']);

barmanServices.factory('Order', function ($http) {
    return {
        /*
         * Get the orders from couchDB
         *
         * @param array: it's where we push the data
         */
        fetchOrders: function () {
            return $http.get('https://lazywaiter.couchappy.com/orders/_design/orders/_view/all');
        },
        /*
         * Update status of an order
         *
         * @param order: The order which want to update the status
         */
        updateOrderState: function(order) {
            $http.put('https://lazywaiter.couchappy.com/orders/' + order.value._id, {"status": "to_delivery"});
        },
        /*
         * Check if the status is 'to_prepare'
         *
         * @param order : the object which want to check the status
         * @return true or false
         */
        isToPrepare: function(order) {
            return order.value.status === "to_prepare" ? true : false;
        }
    }
}) 
