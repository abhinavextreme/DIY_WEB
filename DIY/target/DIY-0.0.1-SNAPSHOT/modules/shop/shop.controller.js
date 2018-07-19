(function (window, document, $, angular) {

    var shopApp = angular.module('shopApp');

    shopApp.controller("shopCtrl", ["$scope", "$state", "$rootScope", "modalSvcs", "getShopData", function ($scope, $state, $rootScope, modalSvcs, getShopData) {

        var vm = this;
        $rootScope.pageHeader = "Shop";
        $rootScope.pageDescription = "Details";

        var modalInstance;

        vm.getShopData = getShopData;
        //console.log("getShopData", vm.getShopData);

        vm.addModal = function () {
            modalInstance = modalSvcs.open({
                windowClass: "fullHeight",
                size: "lg",
                templateUrl: "modules/shop/addshop/addshop.addmodal.html",
                controller: "addModalShopCtrl",
                controllerAs: "addModalShop"
            });
            modalInstance.rendered.then(function () {
                //console.log("modal template rendered");
            });
            modalInstance.opened.then(function () {
                //console.log("modal template opened");
            });
            modalInstance.closed.then(function () {
                //console.log("modal template closed");
                modalInstance = undefined;
            });
        };

        vm.updateModal = function (d) {
            modalInstance = modalSvcs.open({
                windowClass: "fullHeight",
                size: "lg",
                data: angular.copy(d),
                templateUrl: "modules/shop/updateshop/updateshop.updatemodal.html",
                controller: "updateModalShopCtrl",
                controllerAs: "updateModalShop"
            });
            modalInstance.rendered.then(function () {
                //console.log("modal template rendered");
            });
            modalInstance.opened.then(function () {
                //console.log("modal template opened");
            });
            modalInstance.closed.then(function () {
                //console.log("modal template closed");
                modalInstance = undefined;
            });
        }
    }]);

})(window, window.document, window.jQuery, window.angular);


