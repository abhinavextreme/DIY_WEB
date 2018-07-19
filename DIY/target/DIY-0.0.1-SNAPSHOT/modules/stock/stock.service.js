(function (window, document, $, angular) {

    angular.module('stockApp').factory("stockSvcs", ["http", "$rootScope", "localStorage", function (http, $rootScope, localStorage) {


        var createInventory = function (model, successCallback, errorCallback) {
            http.createAjaxInventory(model, successCallback, errorCallback);
        };

        var getInventoryDetail = function (model, successCallback, errorCallback) {
            http.getAjaxInventoryDetail(model, successCallback, errorCallback);
        };

        return {

            createInventory: createInventory,
            getInventoryDetail: getInventoryDetail
        }

    }]);

})(window, window.document, window.jQuery, window.angular);

