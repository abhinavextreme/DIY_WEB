/**
 * Created by SumeetHashia on 6/5/16.
 */

(function (window, document, $, angular) {

    var diyAuth = angular.module('diyAuth');

    diyAuth.controller("signUpCtrl", ["$scope", "$http", "$rootScope", "authSvcs", "authModel", "localStorage", function ($scope, $http, $rootScope, authSvcs, authModel, localStorage) {

        var vm = this;
        vm.baseUrl = window.sInstances.origin + "/DIY/";
        vm.login = window.sInstances.origin + "/DIY/login";

    }]);

})(window, window.document, window.jQuery, window.angular);
