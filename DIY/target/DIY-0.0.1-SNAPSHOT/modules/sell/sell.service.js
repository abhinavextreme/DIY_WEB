(function (window, document, $, angular) {

    angular.module('sellApp').factory("sellSvcs", ["http", "$rootScope", "localStorage", function (http, $rootScope, localStorage) {


        var createReportForGst = function (model, successCallback, errorCallback) {
            http.createAjaxObject(model, successCallback, errorCallback);
        };

        var getSellingItemsList = function (model, successCallback, errorCallback) {
            http.getAjaxSellingItemsList(model, successCallback, errorCallback);
        };

        var updateInvDetailTotalQuantity = function (model, successCallback, errorCallback) {
            http.updateAjaxInvDetailTotalQuantity(model, successCallback, errorCallback);
        };

        return {
            createReportForGst: createReportForGst,
            getSellingItemsList: getSellingItemsList,
            updateInvDetailTotalQuantity: updateInvDetailTotalQuantity
        }
    }]);

})(window, window.document, window.jQuery, window.angular);

