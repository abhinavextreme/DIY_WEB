/**
 * Created by SumitJangir on 6/5/16.
 */

(function (window, document, $, angular) {

    var commonApp = angular.module('commonApp');

    commonApp.directive("menuDrct", ["$timeout", "http", "localStorage", function ($timeout, http, localStorage) {

        return {
            replace: true,
            scope: {},
            templateUrl: 'modules/common/directives/menu/menuDrct.html',

            link: function (scope, element, attrs) {


                function initializeMenuScrollbar() {
                    if (!$("body").hasClass("fixed")) {
                        if (typeof $.fn.slimScroll != 'undefined') {
                            $(".sidebar").slimScroll({destroy: true}).height("auto");
                        }
                        return;
                    } else if (typeof $.fn.slimScroll == 'undefined' && window.console) {
                        window.console.error("Error: the fixed layout requires the slimscroll plugin!");
                    }
                    //Enable slimscroll for fixed layout
                    if ($.AdminLTE.options.sidebarSlimScroll) {
                        if (typeof $.fn.slimScroll != 'undefined') {
                            //Destroy if it exists
                            $(".sidebar").slimScroll({destroy: true}).height("auto");
                            //Add slimscroll
                            $(".sidebar").slimscroll({
                                height: ($(window).height() - $(".main-header").height()) + "px",
                                color: "rgba(0,0,0,0.2)",
                                size: "3px"
                            });
                        }
                    }
                }

                if (localStorage.get('dbRole') == "Admin") {
                    http.request({
                        method: "GET",
                        url: "data/adminMenu.json"
                    }, function (res) {
                        scope.menuData = res.data;
                        $timeout(function () {
                            initializeMenuScrollbar();
                        })
                    });
                }


                else if (localStorage.get('dbRole') == "Owner") {
                    http.request({
                        method: "GET",
                        url: "data/ownerMenu.json"
                    }, function (res) {
                        scope.menuData = res.data;
                        $timeout(function () {
                            initializeMenuScrollbar();
                        })
                    });
                }

            }
        };
    }]);

})(window, window.document, window.jQuery, window.angular);

