(function (window, document, $, angular) {

    var sellApp = angular.module("sellApp");

    sellApp.run(function (amMoment) {

    });

    sellApp.config(['$provide', '$stateProvider', '$urlRouterProvider', function ($provide, $stateProvider, $urlRouterProvider) {

        function onEnter($rootScope, $state) {
        }

        function onExit($rootScope, $state) {
            $rootScope.pageHeader = "";
            $rootScope.pageDescription = "";
        }

        $stateProvider
            .state('sell', {
                url: "/sell",
                data: {
                    parentUrl: "/sell"
                },
                resolve: {
                    getItemsDataForSelling: ["$q", "sellSvcs", "shopSvcs", function ($q, sellSvcs, shopSvcs) {
                        var deferred = $q.defer();
                        var reqMap = {
                            objName: "EOShop"
                        };
                        async.parallel({
                                itemsList: function (callback) {
                                    sellSvcs.getSellingItemsList({}, function (res) {
                                        callback(null, res.data);
                                    })
                                },
                                ShopListData: function (callback) {
                                    shopSvcs.getShop(reqMap, function (res) {
                                        callback(null, res.data);
                                    })
                                }
                            },
                            function (err, results) {
                                deferred.resolve(results);
                            });
                        return deferred.promise;
                    }]
                },
                templateUrl: 'modules/sell/sell.html',
                controller: 'sellCtrl',
                controllerAs: 'sell',
                onEnter: ["$rootScope", "$state", onEnter],
                onExit: ["$rootScope", "$state", onExit]

            })

    }]);

})(window, window.document, window.jQuery, window.angular);

