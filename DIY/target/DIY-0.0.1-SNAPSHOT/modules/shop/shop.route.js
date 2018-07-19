(function (window, document, $, angular) {

    var shopApp = angular.module("shopApp");

    shopApp.run(function (amMoment) {

    });

    shopApp.config(['$provide', '$stateProvider', '$urlRouterProvider', function ($provide, $stateProvider, $urlRouterProvider) {

        function onEnter($rootScope, $state) {
        }

        function onExit($rootScope, $state) {
            $rootScope.pageHeader = "";
            $rootScope.pageDescription = "";
        }

        $stateProvider
            .state('shop', {
                url: "/shop",
                data: {
                    parentUrl: "/shop"
                },
                resolve: {
                    getShopData: ["$q", "shopSvcs", function ($q, shopSvcs) {
                        var deferred = $q.defer();
                        var reqMap = {
                            objName: "EOShop"
                        };
                        shopSvcs.getShop(reqMap, function (res) {
                            deferred.resolve(res.data);
                        }, function (err) {
                            deferred.resolve(err);
                        });
                        return deferred.promise;
                    }]
                },
                templateUrl: 'modules/shop/shop.html',
                controller: 'shopCtrl',
                controllerAs: 'shop',
                onEnter: ["$rootScope", "$state", onEnter],
                onExit: ["$rootScope", "$state", onExit]
            })
    }]);

})(window, window.document, window.jQuery, window.angular);

