/**
 * Created by SumeetHashia on 6/5/16.
 */

(function (window, document, $, angular) {

    var diyAuth = angular.module('diyAuth', []);

    diyAuth.run(function () {

    });

    diyAuth.config(['$httpProvider', '$provide', function ($httpProvider, $provide) {

        var httpRequestCounter = 0,
            pageLoader = new sInstances.pageLoader();

        // register the interceptor as a service
        $provide.factory('rootHttpInterceptor', ["$q", "$rootScope", function ($q, $rootScope) {
            $rootScope.pageLoader = pageLoader;
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
        }]);

        $httpProvider.interceptors.push('rootHttpInterceptor');

    }]);

})(window, window.document, window.jQuery, window.angular);