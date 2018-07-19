(function (window, document, $, angular) {

    var adminTasksApp = angular.module("adminTasksApp");

    adminTasksApp.run(function (amMoment) {

    });

    adminTasksApp.config(['$provide', '$stateProvider', '$urlRouterProvider', function ($provide, $stateProvider, $urlRouterProvider) {

        function onEnter($rootScope, $state) {
        }

        function onExit($rootScope, $state) {
            $rootScope.pageHeader = "";
            $rootScope.pageDescription = "";
        }

        $stateProvider
            .state('stock', {
                url: "/stock",
                data: {
                    parentUrl: "/stock"
                },
                resolve: {
                    getItemsDataForStock: ["$q", "lookupStoreSvcs", "adminTasksSvcs", "stockSvcs", function ($q, lookupStoreSvcs, adminTasksSvcs, stockSvcs) {
                        var deferred = $q.defer();
                        var catMap = {
                            objName: "EOCategory"
                        };
                        async.parallel({
                                CategoryData: function (callback) {
                                    adminTasksSvcs.getCategoryList(catMap, function (res) {
                                        callback(null, res.data);
                                    })
                                },
                                inventoryDetail: function (callback) {
                                    stockSvcs.getInventoryDetail({}, function (res) {
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
                templateUrl: 'modules/stock/stock.html',
                controller: 'stockCtrl',
                controllerAs: 'stock',
                onEnter: ["$rootScope", "$state", onEnter],
                onExit: ["$rootScope", "$state", onExit]

            })

    }]);

})(window, window.document, window.jQuery, window.angular);

