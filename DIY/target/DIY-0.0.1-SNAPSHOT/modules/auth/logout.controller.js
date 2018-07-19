/**
 * Created by SumitJangir on 6/5/16.
 */

(function (window, document, $, angular) {

    var diyAuth = angular.module('diyAuth');

    diyAuth.controller("logoutCtrl", ["$scope", "$http", "$rootScope", "authSvcs", "authModel", "localStorage", function ($scope, $http, $rootScope, authSvcs, authModel, localStorage) {

        var vm = this;

        if (localStorage.get('visionKey')) {
            authSvcs.logout();
        } else {
            $rootScope.pageLoader.stop();
            authSvcs.redirect("login");
        }

        vm.submit = function (event, form) {
            event.preventDefault();
            authSvcs.login({
                usrName: form.usrName.$modelValue,
                password: form.password.$modelValue
            });
        };
    }]);

})(window, window.document, window.jQuery, window.angular);
