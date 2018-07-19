(function (window, document, $, angular) {

    var shopApp = angular.module('shopApp');

    shopApp.controller("addModalShopCtrl", ["$scope", "$state", "$rootScope", "$uibModalInstance", "notifySvcs", "shopModel", "shopSvcs", function ($scope, $state, $rootScope, $uibModalInstance, notifySvcs, shopModel, shopSvcs) {

        var mvm = this;

        var tabMapForFields = [
            ["shopName", "phone", "addressLine1", "country", "state", "city", "pinCode", "landMark"]
        ];

        mvm.formModel = {};

        mvm.tabConfig = {
            defaultActive: 0,
            mapid: "tabContainer",
            click: function (clickedIndex) {
                if (parseInt(clickedIndex) > parseInt(mvm.tabConfig.defaultActive)) {
                    mvm.validateTabSectionFieldsFn(mvm.tabConfig.defaultActive, function (status) {
                        if (status) {
                            mvm.tabConfig.setActive(clickedIndex, clickedIndex);
                        }
                    });
                } else {
                    mvm.tabConfig.setActive(clickedIndex, clickedIndex);
                }
            }
        };

        mvm.validateTabSectionFieldsFn = function (tabIndex, callback) {
            var formInputs = mvm.formConfig.vinputs;
            var formSelects = mvm.formConfig.vselect;
            var invaliFields = [];

            for (var fieldIndex in tabMapForFields[tabIndex]) {
                if (fieldIndex != "length") {
                    var fieldName = tabMapForFields[tabIndex][fieldIndex];
                    if (formInputs[fieldName]) {
                        if (!formInputs[fieldName].valid()) {
                            invaliFields.push(fieldName);
                        }
                    }
                    if (formSelects[fieldName]) {
                        if (!formSelects[fieldName].valid()) {
                            invaliFields.push(fieldName);
                        }
                    }
                }
            }

            if (invaliFields.length != 0) {
                callback(false);
                notifySvcs.error({
                    content: "Please Fill The Form Correctly."
                });
            } else {
                callback(true);
            }
        };

        mvm.tabMapForFields = tabMapForFields;

        mvm.formModel = shopModel.getInstance("ShopData");

        mvm.formSubmit = function () {
            mvm.formConfig.formElement.trigger('submit');
        };

        mvm.formConfig = {
            preCompile: function (e) {
            },
            postCompile: function (e) {
                mvm.formConfig.formScope = e.scope;
                mvm.formConfig.formElement = e.element;
            },
            submit: function (e) {
                e.preventDefault();

                var validationResponse = mvm.formConfig.validateFormInputs();
                var form = mvm.formConfig.formScope.ShopRegistrationForm;

                if (validationResponse.invalidInputs.length == 0) {
                    var blankFormInstance = angular.copy(mvm.formModel);

                    if (blankFormInstance.email == '' || blankFormInstance.email == undefined) {
                        delete blankFormInstance.email;
                    }

                    if (blankFormInstance.addressLine2 == '' || blankFormInstance.addressLine2 == undefined) {
                        delete blankFormInstance.addressLine2;
                    }

                    //console.log("blankFormInstance-->", blankFormInstance);

                    shopSvcs.addShop(blankFormInstance, function (res) {
                            $uibModalInstance.close();
                            $state.reload();
                            notifySvcs.success({
                                title: "Shop",
                                content: "Added Successfully."
                            });
                        },
                        function (err) {
                            notifySvcs.error({
                                content: "Action not performed! Please Fill Form Correctly."
                            });
                        });
                }
                else {
                    for (var tabSectionIndex in tabMapForFields) {
                        if (tabSectionIndex != "length") {
                            if (tabMapForFields[tabSectionIndex].indexOf(validationResponse.invalidInputs[0]) != -1) {
                                mvm.tabConfig.setActive(tabSectionIndex, tabSectionIndex);
                            }
                        }
                    }
                    notifySvcs.error({
                        content: "Please Fill The Form Correctly."

                    });
                }
            }
        };

        mvm.modalInstance = $uibModalInstance;
    }]);

})(window, window.document, window.jQuery, window.angular);


