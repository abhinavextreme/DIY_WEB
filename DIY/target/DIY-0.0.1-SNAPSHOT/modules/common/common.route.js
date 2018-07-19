/**
 * Created by SumitJangir on 6/5/16.
 */
(function (window, document, $, angular) {

    var commonApp = angular.module("commonApp");

    commonApp.run(["$rootScope", "amMoment", function ($rootScope, amMoment) {

        $rootScope.baseAPIUrl = window.sInstances.origin + "/VGST/rest/";
        $rootScope.baseUrl = window.sInstances.origin + "/VGST/";

    }]);

    commonApp.config(['$httpProvider', '$provide', '$stateProvider', '$urlRouterProvider', function ($httpProvider, $provide, $stateProvider, $urlRouterProvider) {

        var httpRequestCounter = 0,
            pageLoader = new sInstances.pageLoader();

        // register the interceptor as a service
        $provide.factory('rootHttpInterceptor', function ($q) {
            return {
                // optional method
                'request': function (config) {
                    // do something on success
                    ++httpRequestCounter;

                    if (httpRequestCounter == 1)
                        pageLoader.start();

                    return config;
                },

                // optional method
                'requestError': function (rejection) {
                    // do something on error
                    // if (canRecover(rejection)) {
                    //     return responseOrNewPromise
                    // }
                    return $q.reject(rejection);
                },

                // optional method
                'response': function (response) {
                    // do something on success
                    --httpRequestCounter;
                    if (httpRequestCounter == 0)
                        pageLoader.stop();
                    return response;
                },

                // optional method
                'responseError': function (rejection) {
                    --httpRequestCounter;
                    if (httpRequestCounter == 0)
                        pageLoader.stop();
                    // do something on error
                    // if (canRecover(rejection)) {
                    //     return responseOrNewPromise
                    // }
                    return $q.reject(rejection);
                }
            };
        });

        $httpProvider.interceptors.push('rootHttpInterceptor');


    }]);

})(window, window.document, window.jQuery, window.angular);