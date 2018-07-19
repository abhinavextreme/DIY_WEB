/**
 * Created by SumitJangir on 6/5/16.
 */

(function (window, document, $, angular) {

    var diyAuth = angular.module('diyAuth');

    diyAuth.controller("loginCtrl", ["$scope", "$http", "$rootScope", "authSvcs", "authModel", "localStorage", function ($scope, $http, $rootScope, authSvcs, authModel, localStorage) {

        var vm = this;

        vm.baseUrl = window.sInstances.origin + "/DIY/";

        if (localStorage.get('visionKey')) {
            $rootScope.pageLoader.stop();
            //     authSvcs.isLoggedIn();
        } else {
            $rootScope.pageLoader.stop();
        }

        vm.submit = function (event, form) {
            event.preventDefault();
            $http({
                method: 'POST',
                url: $rootScope.baseAPIUrl + "auth/getLicenseData",
                data: {}
            }).then(function (response) {
                vm.licenseKey = response.data;
                if (vm.licenseKey == true) {
                    authSvcs.login({
                        usrName: form.usrName.$modelValue,
                        password: form.password.$modelValue
                    });
                } else {
                    vm.licenseKey = false;
                }
            });
        };

    }]);

})(window, window.document, window.jQuery, window.angular);