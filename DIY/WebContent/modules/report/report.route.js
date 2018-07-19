(function (window, document, $, angular) {

    var reportApp = angular.module("reportApp");

    reportApp.run(function (amMoment) {

    });

    reportApp.config(['$provide', '$stateProvider', '$urlRouterProvider', function ($provide, $stateProvider, $urlRouterProvider) {

        function onEnter($rootScope, $state) {
        }

        function onExit($rootScope, $state) {
            $rootScope.pageHeader = "";
            $rootScope.pageDescription = "";
        }

        $stateProvider
            .state('report', {
                url: "/report",
                abstract: true,
                data: {
                    parentUrl: "/report"
                },
                templateUrl: 'modules/report/report.html',
                controller: 'reportCtrl',
                controllerAs: 'report',
                onEnter: ["$rootScope", "$state", onEnter],
                onExit: ["$rootScope", "$state", onExit]
            }).state('report.gstReport', {
            url: "/gstReport",
            data: {
                parentUrl: "/report"
            },
            resolve: {
                gstReportData: ["$q", function ($q) {
                    var deferred = $q.defer();
                    deferred.resolve({});
                    return deferred.promise;
                }]
            },
            templateUrl: 'modules/report/gstReport/gstReport.html',
            controller: 'gstReportCtrl',
            controllerAs: 'gstReport',
            onEnter: ["$rootScope", "$state", onEnter],
            onExit: ["$rootScope", "$state", onExit]

        })

    }]);

})(window, window.document, window.jQuery, window.angular);

