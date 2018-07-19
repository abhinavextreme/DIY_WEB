/**
 * Created by SumitJangir on 6/5/16.
 */

(function (window, document, $, angular) {

    var commonApp = angular.module('commonApp');

    commonApp.directive("headerDrct", ["$timeout", "localStorage", "storeSvcs", function ($timeout, localStorage, storeSvcs) {
        return {
            replace: true,
            scope: {},
            templateUrl: 'modules/common/directives/header/headerDrct.html',
            link: function (scope, element, attrs) {
                scope.firstName = localStorage.get("firstName");

                //scope.remainingDays = "";
                /*storeSvcs.on("headerRemainingDaysCount", function (newVal, oldVal) {
                    //console.log("event headerRemainingDaysCount",newVal ,oldVal);
                    scope.remainingDays = newVal || "";
                });*/
            }
        };
    }]);

})(window, window.document, window.jQuery, window.angular);
