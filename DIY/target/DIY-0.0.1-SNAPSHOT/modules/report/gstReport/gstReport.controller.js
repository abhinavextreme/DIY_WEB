(function (window, document, $, angular) {

    var reportApp = angular.module('reportApp');

    reportApp.controller("gstReportCtrl", ["$scope", "$state", "$rootScope", "gstReportData", "reportModel", "reportSvcs", "$timeout", "notifySvcs", function ($scope, $state, $rootScope, gstReportData, reportModel, reportSvcs, $timeout, notifySvcs) {

        var vm = this;
        $rootScope.pageHeader = "GST";
        $rootScope.pageDescription = "Report";

        vm.formModel = {};

        vm.format = 'yyyy-MM-dd';
        vm.popup = {
            opened: false
        };
        vm.open = function () {
            vm.popup.opened = true;
        };
        vm.dateOptions = {
            formatYear: 'yyyy',
            maxDate: moment()
        };

        vm.getGstReportData = function () {

            var reqMap = {
                createdDate: moment(vm.formModel.createdDate).format("YYYY-MM-DD")
            };

            reportSvcs.getGstReportForItems(reqMap, function (res) {
                vm.respData = res.data;
                vm.checkEmptyMap = Object.keys(vm.respData);
                if (vm.checkEmptyMap.length == 0) {
                    notifySvcs.info({
                        content: "No data for selected date"
                    })
                } else {
                    notifySvcs.success({
                        content: "Fetched Successfully"
                    })
                }
            })

        };

    }]);

})(window, window.document, window.jQuery, window.angular);

