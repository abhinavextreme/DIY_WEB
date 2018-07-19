/**
 * Created by SumeetHashia on 6/5/16.
 */

(function (window, document, $, angular) {

    var diy = angular.module('diy');

    diy.controller("homeCtrl", ["$scope", "homeSvcs", "$rootScope", function ($scope, homeSvcs, $rootScope) {

        var vm = this;

        $rootScope.pageHeader = "";
        $rootScope.pageDescription = "";

    }]);

})(window, window.document, window.jQuery, window.angular);
