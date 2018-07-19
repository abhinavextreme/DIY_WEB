(function (window, document, $, angular) {

    angular.module('adminTasksApp').factory("adminTasksSvcs", ["http", "$rootScope", "localStorage", function (http, $rootScope, localStorage) {

        var createCategory = function (model, successCallback, errorCallback) {
            http.createAjaxCategory(model, successCallback, errorCallback);
        };

        var createGSTSlab = function (model, successCallback, errorCallback) {
            http.createAjaxGSTSlab(model, successCallback, errorCallback);
        };

        var createItemsList = function (model, successCallback, errorCallback) {
            http.createAjaxItemsList(model, successCallback, errorCallback);
        };

        var getCategoryList = function (model, successCallback, errorCallback) {
            http.getAjaxObject(model, successCallback, errorCallback);
        };

        var getGstSlabList = function (model, successCallback, errorCallback) {
            http.getAjaxObject(model, successCallback, errorCallback);
        };

        var getItemsList = function (model, successCallback, errorCallback) {
            http.getAjaxItemsList(model, successCallback, errorCallback);
        };

        var getLicenseDataUpdate = function (successCallback, errorCallback) {
            http.getAjaxLicenseDataUpdate({}, successCallback, errorCallback);
        };

        /*var getLicenseDays = function (successCallback, errorCallback) {
            http.getAjaxLicenseTrialVersion({}, successCallback, errorCallback);
        };*/

        return {
            createCategory: createCategory,
            createItemsList: createItemsList,
            createGSTSlab: createGSTSlab,
            getCategoryList: getCategoryList,
            getGstSlabList: getGstSlabList,
            getItemsList: getItemsList,
            getLicenseDataUpdate : getLicenseDataUpdate/*,
            getLicenseDays : getLicenseDays*/

        }

    }]);

})(window, window.document, window.jQuery, window.angular);

