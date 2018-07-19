/**
 * Created by mydell on 3/4/2017.
 */

(function (window, document, $, angular) {

    var adminTasksApp = angular.module('adminTasksApp');

    adminTasksApp.controller("adminTasksCtrl", ["$scope", "$state", "$rootScope", function ($scope, $state, $rootScope) {

        var vm = this;

        $rootScope.pageHeader = "";
        $rootScope.pageDescription = "";

    }]);

})(window, window.document, window.jQuery, window.angular);

