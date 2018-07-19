(function (window, document, $, angular) {

    var reportApp = angular.module('reportApp');

    reportApp.controller("reportCtrl", ["$scope", "$state", "$rootScope", function ($scope, $state, $rootScope) {

        var vm = this;
        $rootScope.pageHeader = "";
        $rootScope.pageDescription = "";

        //console.log("getItemsDataForStock", getItemsDataForStock);

    }]);

})(window, window.document, window.jQuery, window.angular);


