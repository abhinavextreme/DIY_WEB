/**
 * Created by mydell on 3/4/2017.
 */

(function (window, document, $, angular) {

    var adminTasksApp = angular.module('adminTasksApp');

    adminTasksApp.controller("updateLicenseCtrl", ["$scope", "$state", "$rootScope", "licenseData", "$http", "notifySvcs", "storeSvcs", function ($scope, $state, $rootScope, licenseData, $http, notifySvcs, storeSvcs) {

        var vm = this;

        $rootScope.pageHeader = "Update";
        $rootScope.pageDescription = "License";

        vm.formModel = {};
        $rootScope.baseAPIUrl = window.sInstances.origin + "/VGST/rest/";

        vm.licenseData = licenseData.licenseUpdateData;
        //console.log(vm.licenseData);

        //vm.count = licenseData.remainingDays;
        //storeSvcs.set("headerRemainingDaysCount", vm.count);

        vm.submit = function (form) {
            console.log(form);
            $http({
                method: "POST",
                url: $rootScope.baseAPIUrl + "auth/createFullVersionLicense",
                data: {
                    className: "EOLicenseInfo",
                    primaryKey: vm.licenseData.primaryKey,
                    licenseKey: form.licenseKey.$modelValue
                }
            }).then(function (response) {
                if(response.data == true){
                    $state.reload();
                    notifySvcs.success({
                        content : "Updated Successfully"
                    })
                }
            });

        }


    }]);

})(window, window.document, window.jQuery, window.angular);


