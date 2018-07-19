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
            .state('admintasks', {
                url: "/admintasks",
                abstract: true,
                templateUrl: 'modules/admintasks/admintasks.html',
                controller: 'adminTasksCtrl',
                controllerAs: 'adminTasks',
                onEnter: ["$rootScope", "$state", onEnter],
                onExit: ["$rootScope", "$state", onExit]

            }).state('admintasks.category', {
            url: "/category",
            data: {
                parentUrl: "/admintasks"
            },
            resolve: {
                categoryData: ["$q", "adminTasksSvcs", function ($q, adminTasksSvcs) {
                    var deferred = $q.defer();
                    var reqMap = {
                        objName: "EOCategory"
                    };
                    adminTasksSvcs.getCategoryList(reqMap, function (res) {
                        deferred.resolve(res.data);
                    }, function (err) {
                        deferred.resolve(err);
                    });
                    return deferred.promise;
                }]
            },
            templateUrl: 'modules/admintasks/category/category.html',
            controller: 'categoryCtrl',
            controllerAs: 'category',
            onEnter: ["$rootScope", "$state", onEnter],
            onExit: ["$rootScope", "$state", onExit]
        }).state('admintasks.gst', {
            url: "/gst",
            data: {
                parentUrl: "/admintasks"
            },
            resolve: {
                gstViewData: ["$q", "adminTasksSvcs", function ($q, adminTasksSvcs) {
                    var deferred = $q.defer();
                    var reqMap = {
                        objName: "EOGst"
                    };
                    adminTasksSvcs.getGstSlabList(reqMap, function (res) {
                        deferred.resolve(res.data);
                    }, function (err) {
                        deferred.resolve(err);
                    });
                    return deferred.promise;
                }]
            },
            templateUrl: 'modules/admintasks/gst/gst.html',
            controller: 'gstCtrl',
            controllerAs: 'gst',
            onEnter: ["$rootScope", "$state", onEnter],
            onExit: ["$rootScope", "$state", onExit]
        }).state('admintasks.items', {
            url: "/items",
            data: {
                parentUrl: "/admintasks"
            },
            resolve: {
                getItemsData: ["$q", "lookupStoreSvcs", "adminTasksSvcs", function ($q, lookupStoreSvcs, adminTasksSvcs) {
                    var deferred = $q.defer();
                    var catMap = {
                        objName: "EOCategory"
                    };
                    var gstMap = {
                        objName: "EOGst"
                    };
                    async.parallel({
                            lkUnit: function (callback) {
                                lookupStoreSvcs.getUnit().then(function (res) {
                                    callback(null, res);
                                })
                            },
                            CategoryData: function (callback) {
                                adminTasksSvcs.getCategoryList(catMap, function (res) {
                                    callback(null, res.data);
                                })
                            },
                            gstSlabData: function (callback) {
                                adminTasksSvcs.getGstSlabList(gstMap, function (res) {
                                    callback(null, res.data);
                                })
                            },
                            itemViewData: function (callback) {
                                adminTasksSvcs.getItemsList({}, function (res) {
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
            templateUrl: 'modules/admintasks/items/items.html',
            controller: 'addItemsCtrl',
            controllerAs: 'addItems',
            onEnter: ["$rootScope", "$state", onEnter],
            onExit: ["$rootScope", "$state", onExit]
        }).state('admintasks.updatelicense', {
            url: "/updatelicense",
            data: {
                parentUrl: "/admintasks"
            },
            resolve: {
                licenseData: ["$q", "adminTasksSvcs", function ($q, adminTasksSvcs) {
                    var deferred = $q.defer();
                    async.parallel({
                        licenseUpdateData: function (callback) {
                            adminTasksSvcs.getLicenseDataUpdate(function (res) {
                                callback(null, res.data);
                            });
                        }/*,
                        remainingDays: function (callback) {
                            adminTasksSvcs.getLicenseDays(function (res) {
                                callback(null, res.data);
                            });
                        }*/
                    }, function (err,results) {
                        deferred.resolve(results);
                    });

                    return deferred.promise;
                }]
            },
            templateUrl: 'modules/admintasks/updatelicense/updatelicense.html',
            controller: 'updateLicenseCtrl',
            controllerAs: 'updateLicense',
            onEnter: ["$rootScope", "$state", onEnter],
            onExit: ["$rootScope", "$state", onExit]
        });

    }]);

})(window, window.document, window.jQuery, window.angular);

