(function (window, document, $, angular) {

    var adminTasksApp = angular.module('adminTasksApp');

    adminTasksApp.controller("addItemsCtrl", ["$scope", "$state", "$rootScope", "adminTasksModel", "getItemsData", "localStorage", "adminTasksSvcs", "notifySvcs", function ($scope, $state, $rootScope, adminTasksModel, getItemsData, localStorage, adminTasksSvcs, notifySvcs) {

        var vm = this;

        $rootScope.pageHeader = "Add Items";
        $rootScope.pageDescription = "";

        var tabMapForFields = [
            ["eoCategory", "itemName", "lkUnit", "quantity", "itemMRP", "rateOfSelling", "eoGst"]
        ];

        //console.log("getItemsData", getItemsData);

        vm.validateTabSectionFieldsFn = function (tabIndex) {
            var formInputs = vm.formConfig.vinputs;
            var formSelects = vm.formConfig.vselect;
            var invalidFields = [];
            for (var fieldIndex in tabMapForFields[tabIndex]) {
                if (fieldIndex != "length") {
                    var fieldName = tabMapForFields[tabIndex][fieldIndex];
                    if (formInputs[fieldName]) {
                        if (!formInputs[fieldName].valid()) {
                            invalidFields.push(fieldName);
                        }
                    }
                    if (formSelects[fieldName]) {
                        if (!formSelects[fieldName].valid()) {
                            invalidFields.push(fieldName);
                        }
                    }
                }
            }
            return invalidFields;
        };

        vm.formModel = {};

        vm.categoryArrayData = getItemsData.CategoryData;
        vm.gstSlabArrayData = getItemsData.gstSlabData;
        vm.lkUnitArray = getItemsData.lkUnit;


        vm.formModel.itemsArrayList = [];

        vm.formModel.itemsArrayList = getItemsData.itemViewData;

        for (var key in vm.formModel.itemsArrayList) {
            vm.formModel.itemsArrayList[key].className = "EOItem";
            vm.formModel.itemsArrayList[key].eoCategory = vm.formModel.itemsArrayList[key].eoCategory + "";
            vm.formModel.itemsArrayList[key].eoGst = vm.formModel.itemsArrayList[key].eoGst + "";
            vm.formModel.itemsArrayList[key].lkUnit = vm.formModel.itemsArrayList[key].lkUnit + "";
        }

        vm.addAnotherItem = function () {
            vm.formModel.itemsArrayList.push(adminTasksModel.getInstance("ItemsData"));
        };

        vm.removeSlab = function (key) {
            var index = undefined;
            for (var i in vm.formModel.itemsArrayList) {
                if (typeof(vm.formModel.itemsArrayList[i]) == "object") {
                    if (vm.formModel.itemsArrayList[i].$$hashKey == key) {
                        index = i;
                        vm.formModel.itemsArrayList.splice(i, 1);
                    }
                }
            }
        };

        vm.checkRateOfSellingAmount = function(item){
            if(item.rateOfSelling > item.itemMRP){
                notifySvcs.info({
                    content : "Rate of selling cannot be greater than MRP"
                })
            }
        };

        vm.formConfig = {
            name: "categoryForm",
            preCompile: function (e) {
            },
            postCompile: function (e) {
                vm.formConfig.formScope = e.scope;
                vm.formConfig.formElement = e.element;
            },
            submit: function (e, form) {
                e.preventDefault();
                var form = vm.formConfig.formScope.addItemsForm;
                var formModelCopy = angular.copy(vm.formModel);
                //console.log("formModelCopy", formModelCopy);
                var validationResponse = vm.formConfig.validateFormInputs();
                if (validationResponse.invalidInputs.length == 0) {
                    adminTasksSvcs.createItemsList(formModelCopy, function (res) {
                            $state.reload();
                            notifySvcs.success({
                                content: "Created Successfully."
                            });
                        },
                        function (err) {
                            notifySvcs.error({
                                content: "Action not performed! Please Fill Form Correctly."
                            });
                        });
                } else {

                    notifySvcs.error({
                        content: "Please Fill The Form Correctly."
                    });
                }
            }
        };

    }]);

})(window, window.document, window.jQuery, window.angular);

