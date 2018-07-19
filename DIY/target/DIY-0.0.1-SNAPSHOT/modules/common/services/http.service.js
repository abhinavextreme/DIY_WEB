/**
 * Created by SumitJangir on 6/5/16.
 */

(function (window, document, $, angular) {

    angular.module('commonApp').factory("http", ["$http", "storeSvcs", "$rootScope", function ($http, storeSvcs, $rootScope) {

        var result = {};

        var http = new function () {

            this.request = function (map, successCallback, errorCallback) {
                $http(map).then(function (response) {
                    if (successCallback)
                        successCallback(response);
                }, function (err) {
                    if (errorCallback)
                        errorCallback(err);
                });
            };

        }();

        result.request = http.request;

        var lookupArray = ["Unit"];

        angular.forEach(lookupArray, function (value, key) {

            result["get" + value] = function (successCallback, errorCallback) {
                var k = value;
                http.request(
                    {
                        url: $rootScope.baseAPIUrl + "ajax/getObject",
                        method: "POST",
                        data: {objName: "LK" + k}
                    },
                    successCallback,
                    errorCallback
                );
            }
        });

        var controllersDef = {
            "ajax": {
                "createObject": {
                    name: "Object",
                    type: "create",
                    method: "POST"
                },
                "updateObject": {
                    name: "Object",
                    type: "update",
                    method: "POST"
                },
                "getObject": {
                    name: "Object",
                    type: "get",
                    method: "POST"
                },
                "createImgObject": {
                    name: "ImageObject",
                    type: "create",
                    method: "POST"
                },
                "updateImgObject": {
                    name: "ImageObject",
                    type: "update",
                    method: "POST"
                },
                "createCategory": {
                    name: "Category",
                    type: "create",
                    method: "POST"
                },
                "createGSTSlab": {
                    name: "GSTSlab",
                    type: "create",
                    method: "POST"
                },
                "createItemsList": {
                    name: "ItemsList",
                    type: "create",
                    method: "POST"
                },
                "getItemsList": {
                    name: "ItemsList",
                    type: "get",
                    method: "POST"
                },
                "createInventory": {
                    name: "Inventory",
                    type: "create",
                    method: "POST"
                },
                "getInventoryDetail": {
                    name: "InventoryDetail",
                    type: "get",
                    method: "POST"
                },
                "getSellingItemsList": {
                    name: "SellingItemsList",
                    type: "get",
                    method: "POST"
                },
                "updateInvDetailTotalQuantity": {
                    name: "InvDetailTotalQuantity",
                    type: "update",
                    method: "POST"
                },
                /*"getLicenseTrialVersion": {
                    name: "LicenseTrialVersion",
                    type: "get",
                    method: "POST"
                },*/
                "getLicenseDataUpdate": {
                    name: "LicenseDataUpdate",
                    type: "get",
                    method: "POST"
                }
            },
            "ajaxRegistration": {
                "createUser": {
                    name: "User",
                    type: "create",
                    method: "POST"
                },
                "updateUser": {
                    name: "User",
                    type: "update",
                    method: "POST"
                }
            },
            "ajaxReport": {
                "getGstReportForItems": {
                    name: "GstReportForItems",
                    type: "get",
                    method: "POST"
                }
            }
        };

        angular.forEach(controllersDef, function (controllerDefVal, controllerDefKey) {

            angular.forEach(controllerDefVal, function (val, key) {
                var k = controllerDefKey;
                k = k.replace(k.charAt(0), k.charAt(0).toUpperCase());

                result[val.type + k + val.name] = function (modelData, successCallback, errorCallback) {

                    var clsKey = controllerDefKey,
                        methodKey = key,
                        value = val;

                    http.request(
                        {
                            url: $rootScope.baseAPIUrl + clsKey + "/" + methodKey,
                            method: value.method,
                            data: modelData
                        },
                        successCallback,
                        errorCallback
                    );
                }

            });

        });

        return result;

    }]);

})(window, window.document, window.jQuery, window.angular);