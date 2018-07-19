(function (window, document, $, angular) {

    angular.module('reportApp').factory("reportSvcs", ["http", "$rootScope", "localStorage", function (http, $rootScope, localStorage) {


        var getGstReportForItems = function (model, successCallback, errorCallback) {
            http.getAjaxReportGstReportForItems(model, successCallback, errorCallback);
        };
        /*var getGstReportForItems = function (model, successCallback, errorCallback) {
         http.getAjaxObject(model, successCallback, errorCallback);
         };*/

        return {
            getGstReportForItems: getGstReportForItems
        }

    }]);

})(window, window.document, window.jQuery, window.angular);


