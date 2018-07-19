(function (window, document, $, angular) {

    var adminTasksApp = angular.module('adminTasksApp');

    adminTasksApp.controller("gstCtrl", ["$scope", "$state", "$rootScope", "adminTasksModel", "gstViewData", "localStorage", "adminTasksSvcs", "notifySvcs", function ($scope, $state, $rootScope, adminTasksModel, gstViewData, localStorage, adminTasksSvcs, notifySvcs) {

        var vm = this;

        $rootScope.pageHeader = "Add GST";
        $rootScope.pageDescription = "";

        var tabMapForFields = [
            ["gstType"]
        ];

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

        //console.log("gstViewData", gstViewData);

        vm.formModel = {};
        vm.formModel.gstArray = [];

        vm.formModel.gstArray = gstViewData;

        vm.addAnotherSlab = function () {
            vm.formModel.gstArray.push(adminTasksModel.getInstance("GSTSlab"));
        };

        vm.removeSlab = function (key) {
            var index = undefined;
            for (var i in vm.formModel.gstArray) {
                if (typeof(vm.formModel.gstArray[i]) == "object") {
                    if (vm.formModel.gstArray[i].$$hashKey == key) {
                        index = i;
                        vm.formModel.gstArray.splice(i, 1);
                    }
                }
            }
        };

        vm.formConfig = {
            name: "gstForm",
            preCompile: function (e) {
            },
            postCompile: function (e) {
                vm.formConfig.formScope = e.scope;
                vm.formConfig.formElement = e.element;
            },
            submit: function (e, form) {
                e.preventDefault();
                var form = vm.formConfig.formScope.gstForm;
                var formModelCopy = angular.copy(vm.formModel);
                var validationResponse = vm.formConfig.validateFormInputs();
                if (validationResponse.invalidInputs.length == 0) {
                    //console.log("formModelCopy", formModelCopy);
                    adminTasksSvcs.createGSTSlab(formModelCopy, function (res) {
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
