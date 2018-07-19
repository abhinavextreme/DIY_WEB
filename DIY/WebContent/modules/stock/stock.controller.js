(function (window, document, $, angular) {

    var stockApp = angular.module('stockApp');

    stockApp.controller("stockCtrl", ["$scope", "$state", "$rootScope", "getItemsDataForStock", "stockModel", "stockSvcs", "$timeout", "notifySvcs", function ($scope, $state, $rootScope, getItemsDataForStock, stockModel, stockSvcs, $timeout, notifySvcs) {

        var vm = this;
        $rootScope.pageHeader = "Stock";
        $rootScope.pageDescription = "";

        //console.log("getItemsDataForStock", getItemsDataForStock);

        vm.formModel = {};
        vm.formModel.eoInventoryArray = [];
        vm.categoryArrayData = getItemsDataForStock.CategoryData;
        vm.inventoryData = getItemsDataForStock.inventoryDetail;

        //console.log(vm.inventoryData);

        vm.calculateTotalQuan = function (index, item) {
            $timeout(function () {
                item.totalQuantity = parseInt(item.currentQuantity) + parseInt(item.purchaseQuantity);
            });
        };


        vm.submitInventory = function () {
            vm.formModel.eoInventoryArray = [];
            for (var key in vm.inventoryData) {
                var invObj = {};
                invObj.eoItem = vm.inventoryData[key].eoItem;
                if (vm.inventoryData[key].primaryKey != null) {
                    invObj.primaryKey = parseInt(vm.inventoryData[key].primaryKey);
                }
                invObj.className = 'EOInventory';
                invObj.eoInventoryDetailsArray = [{
                    className: "EOInventoryDetail",
                    currentQuantity: vm.inventoryData[key].currentQuantity,
                    purchaseQuantity: vm.inventoryData[key].purchaseQuantity,
                    purchaseDate: moment().format("YYYY-MM-DD"),
                    totalQuantity: vm.inventoryData[key].totalQuantity + ""
                }];

                vm.formModel.eoInventoryArray.push(invObj);
            }
            console.log(vm.formModel);
            stockSvcs.createInventory(vm.formModel, function (res) {
                if (res.data == 'Success') {
                    $state.reload();
                    notifySvcs.success({
                        content: "Created Successfully"
                    })
                } else {
                    notifySvcs.error({
                        content: "Action not performed"
                    })
                }
            })
        }

    }]);

})(window, window.document, window.jQuery, window.angular);

