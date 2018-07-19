/**
 * Created by mydell on 3/4/2017.
 */

(function (window, document, $, angular) {

    var adminTasksApp = angular.module('adminTasksApp');

    adminTasksApp.controller("categoryCtrl", ["$scope", "$state", "$rootScope", "adminTasksModel", "categoryData", "localStorage", "adminTasksSvcs", "notifySvcs", function ($scope, $state, $rootScope, adminTasksModel, categoryData, localStorage, adminTasksSvcs, notifySvcs) {

        var vm = this;

        $rootScope.pageHeader = "Add Category";
        $rootScope.pageDescription = "";

        var tabMapForFields = [
            ["categoryName"]
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

        //console.log("categoryDate", categoryData);

        vm.formModel = {};
        vm.formModel.categoryArray = [];

        vm.formModel.categoryArray = categoryData;

        if (vm.formModel.categoryArray.length == 0) {
            notifySvcs.info({
                content: "No Data."
            });
        }

        vm.addAnotherCategory = function () {
            vm.formModel.categoryArray.push(adminTasksModel.getInstance("CreateCategories"));
        };

        vm.removeCategory = function (key) {
            var index = undefined;
            for (var i in vm.formModel.categoryArray) {
                if (typeof(vm.formModel.categoryArray[i]) == "object") {
                    if (vm.formModel.categoryArray[i].$$hashKey == key) {
                        index = i;
                        vm.formModel.categoryArray.splice(i, 1);
                    }
                }
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
                var form = vm.formConfig.formScope.categoryForm;
                var formModelCopy = angular.copy(vm.formModel);
                //console.log("formModelCopy", formModelCopy);
                var validationResponse = vm.formConfig.validateFormInputs();
                if (validationResponse.invalidInputs.length == 0) {
                    adminTasksSvcs.createCategory(formModelCopy, function (res) {
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
