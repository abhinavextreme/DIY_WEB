/**
 * Created by SumitJangir on 6/5/16.
 */

(function (window, document, $, angular) {

    var diy = angular.module('diy', ['ui.router', 'ui.bootstrap', 'ngSanitize', 'ui.select', 'angularMoment', 'commonApp', 'adminTasksApp', 'stockApp', 'sellApp', 'reportApp', 'shopApp']);

    diy.controller("bodyCtrl", ["$scope", "$rootScope", "$state", "localStorage", function ($scope, $rootScope, $state, localStorage) {

        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams, options) {
                /*adminTasksSvcs.getLicenseDays(function (res) {
                    storeSvcs.set("headerRemainingDaysCount", res.data);
                });*/
                //console.log("$stateChangeStart", [event, toState, toParams, fromState, fromParams, options]);
            });
        $rootScope.$on('$stateNotFound',
            function (event, unfoundState, fromState, fromParams) {
                //console.log("$stateNotFound", [event, unfoundState, fromState, fromParams]);
            });
        $rootScope.$on('$stateChangeSuccess',
            function (event, toState, toParams, fromState, fromParams) {
                //console.log("$stateChangeSuccess", [event, toState, toParams, fromState, fromParams]);
            });
        $rootScope.$on('$stateChangeError',
            function (event, toState, toParams, fromState, fromParams, error) {
                //console.log("$stateChangeError", [event, toState, toParams, fromState, fromParams, error]);
            });

        $rootScope.$on('$viewContentLoading',
            function (event, viewConfig) {
                //console.log("$viewContentLoading", [event, viewConfig]);
            });

        $scope.$on('$viewContentLoaded',
            function (event) {
                //console.log("$viewContentLoaded", [event]);
            });

    }])

})(window, window.document, window.jQuery, window.angular);
