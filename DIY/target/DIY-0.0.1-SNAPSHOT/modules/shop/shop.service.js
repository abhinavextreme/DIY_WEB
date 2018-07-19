(function (window, document, $, angular) {

    angular.module('shopApp').factory("shopSvcs", ["http", "$rootScope", "localStorage", function (http, $rootScope, localStorage) {


        var addShop = function (model, successCallback, errorCallback) {
            http.createAjaxObject(model, successCallback, errorCallback);
        };
        var updateShop = function (model, successCallback, errorCallback) {
            http.updateAjaxObject(model, successCallback, errorCallback);
        };
        var getShop = function (model, successCallback, errorCallback) {
            http.getAjaxObject(model, successCallback, errorCallback);
        };

        return {
            addShop: addShop,
            getShop: getShop,
            updateShop: updateShop
        }

    }]);

})(window, window.document, window.jQuery, window.angular);


