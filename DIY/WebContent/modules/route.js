/**
 * Created by SumeetHashia on 6/5/16.
 */
(function (window, document, $, angular) {

    var diy = angular.module("diy");

    diy.run(function (amMoment) {

    });

    diy.config(['$httpProvider', '$provide', '$stateProvider', '$urlRouterProvider', function ($httpProvider, $provide, $stateProvider, $urlRouterProvider) {

        function onEnter($rootScope, $state) {
            //console.log("onEnter");
            //console.log("$rootScope", $rootScope);
            //console.log("$state", $state);
        }

        function onExit($rootScope, $state) {
            //console.log("onExit");
            //console.log("$rootScope", $rootScope);
            //console.log("$state", $state);
            $rootScope.pageHeader = "";
            $rootScope.pageDescription = "";
        }

        $stateProvider
            .state('diy', {
                url: "/dashboard",
                templateUrl: 'modules/home/home.html',
                controller: 'homeCtrl',
                controllerAs: 'home',
                onEnter: ["$rootScope", "$state", onEnter],
                onExit: ["$rootScope", "$state", onExit]
            });
    }]);

})(window, window.document, window.jQuery, window.angular);