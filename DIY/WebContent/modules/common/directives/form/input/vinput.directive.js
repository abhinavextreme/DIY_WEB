/**
 * Created by SumeetHashia on 6/5/16.
 */

(function (window, document, $, angular) {

    var commonApp = angular.module('commonApp');

    commonApp.directive("validatePattern", ["$timeout", "vformSvcs", "$compile", function ($timeout, vformSvcs, $compile) {
        var isUndefined = function (val) {
            return val == undefined;
        };

        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, elm, attr, ctrl) {
                if (!ctrl) return;
                ctrl.$validators.pattern = function (modelValue, viewValue) {
                    var inputCon = vformSvcs.inputPattern[attr['vtype']];
                    return ctrl.$isEmpty(viewValue) || isUndefined(inputCon.regx) || inputCon.regx.test(viewValue);
                };
            }
        };
    }]);

    commonApp.directive("charminlength", ["$timeout", "http", "vformSvcs", "$compile", function ($timeout, http, vformSvcs, $compile) {

        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, elm, attr, ctrl) {
                if (!ctrl) return;

                var minlength = 0;
                attr.$observe('charminlength', function (value) {
                    minlength = parseInt(value) || 0;
                    ctrl.$validate();
                });
                ctrl.$validators.charminlength = function (modelValue, viewValue) {
                    return ctrl.$isEmpty(viewValue) || (viewValue + "").length >= minlength;
                };
            }
        }
    }]);

    commonApp.directive("charmaxlength", ["$timeout", "http", "vformSvcs", "$compile", function ($timeout, http, vformSvcs, $compile) {

        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, elm, attr, ctrl) {
                if (!ctrl) return;

                var maxlength = -1;
                attr.$observe('charmaxlength', function (value) {
                    var intVal = parseInt(value);
                    maxlength = isNaN(intVal) ? -1 : intVal;
                    ctrl.$validate();
                });
                ctrl.$validators.charmaxlength = function (modelValue, viewValue) {
                    return ctrl.$isEmpty(viewValue) || (viewValue + "").length <= maxlength;
                };
            }
        }
    }]);

    commonApp.directive("maxLimit", [function () {
        return {
            restrict: "A",
            link: function (scope, elem, attrs) {
                var limit = parseInt(attrs.maxLimit);
                angular.element(elem).on("keypress", function (e) {
                    if (this.value.length == limit) e.preventDefault();
                });
            }
        }
    }]);

    commonApp.directive('onlyNumbers', function () {
        return function (scope, element, attrs) {
            var keyCode = [8, 9, 17, 37, 39, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 110];
            element.bind("keydown", function (event) {
                if ($.inArray(event.which, keyCode) == -1) {
                    scope.$apply(function () {
                        scope.$eval(attrs.onlyNumbers);
                        event.preventDefault();
                    });
                    event.preventDefault();
                }

            });
        };
    });

    commonApp.directive("vinput", ["$timeout", "http", "vformSvcs", "$compile", function ($timeout, http, vformSvcs, $compile) {
        return {
            restrict: "E",
            replace: true,
            scope: {
                formConfig: '=?',
                preCompile: '=?',
                postCompile: '=?'
            },
            template: '<input />',
            compile: function (element, attrs) {
                return {
                    pre: function (scope, element, attrs) {
                        scope.inputCon = vformSvcs.inputPattern[attrs['vtype']];
                        if (attrs['vtype']) {
                            scope.inputCon = vformSvcs.inputPattern[attrs['vtype']];
                            if (scope.inputCon) {
                                element.attr({
                                    type: scope.inputCon.type,
                                    'pattern': scope.inputCon.pattern,
                                    title: (scope.inputCon.title && !attrs['title']) ? scope.inputCon.title : ""
                                });
                            } else {
                                element.attr({type: attrs['vtype']});
                            }
                        }

                        if (scope.preCompile && typeof(scope.preCompile) == "function") {
                            scope.preCompile({
                                scope: scope,
                                element: element,
                                attrs: attrs
                            });
                        }

                        if (scope.formConfig) {
                            if (scope.formConfig.vinputs == undefined) {
                                scope.formConfig.vinputs = {};
                            }
                            scope.formConfig.vinputs[attrs['name']] = {
                                scope: scope,
                                element: element,
                                attrs: attrs,
                                inputCon: scope.inputCon,

                                valid: function () {
                                    //console.log("attrs['errorMsgElm'] ::::::::::", attrs['errorMsgElm']);
                                    if (scope.formConfig.formScope[scope.formConfig.name][attrs['name']].$valid) {
                                        element[0].classList.remove("vinput-error");
                                        if (attrs['errorMsgElm']) {
                                            document.getElementById(attrs['errorMsgElm']).style.display = "none";
                                        }
                                        return true;
                                    }
                                    else {
                                        element[0].classList.add("vinput-error");
                                        if (attrs['errorMsgElm']) {
                                            document.getElementById(attrs['errorMsgElm']).setAttribute("title", attrs['title']);
                                            document.getElementById(attrs['errorMsgElm']).style.display = "block";
                                        }
                                        return false;
                                    }
                                }
                            }
                        }
                    },
                    post: function (scope, element, attrs) {

                        if (scope.postCompile && typeof(scope.postCompile) == "function") {
                            scope.postCompile({
                                scope: scope,
                                element: element,
                                attrs: attrs
                            });
                        }
                        scope.$on("$destroy", function (e) {

                            if (scope.formConfig) {
                                if (scope.formConfig.vinputs[attrs['name']]) {
                                    delete scope.formConfig.vinputs[attrs['name']];
                                }
                            }
                        });
                        //$compile(element[0])(scope.$parent.$parent.$parent);
                    }
                }
            }

        };
    }]);

})(window, window.document, window.jQuery, window.angular);