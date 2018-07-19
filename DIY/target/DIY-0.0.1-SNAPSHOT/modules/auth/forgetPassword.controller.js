/**
 * Created by SumitJangir on 6/5/16.
 */

(function (window, document, $, angular) {

    var diyAuth = angular.module('diyAuth');

    diyAuth.controller("forgetPasswordCtrl", ["$scope", "$http", "$rootScope", "authSvcs", "authModel", "localStorage", function ($scope, $http, $rootScope, authSvcs, authModel, localStorage) {

        var vm = this;

        if (localStorage.get('visionKey')) {
            //  authSvcs.isLoggedIn();
        } else {
            $rootScope.pageLoader.stop();
        }

        vm.submit = function (event, form) {
            event.preventDefault();
            authSvcs.forgetPassword({

                usrName: form.usrName.$modelValue

            });
            return false;
        };
    }]);

})(window, window.document, window.jQuery, window.angular);