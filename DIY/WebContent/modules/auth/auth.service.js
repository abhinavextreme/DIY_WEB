/**
 * Created by SumeetHashia on 6/5/16.
 */
(function (window, document, $, angular) {

    angular.module('diyAuth').service('localStorage', function () {
        this.add = window.sInstances.localStorage.add;
        this.remove = window.sInstances.localStorage.remove;
        this.get = window.sInstances.localStorage.get;
    });

    angular.module('diyAuth').factory("authSvcs", ["$http", "$rootScope", "localStorage", function ($http, $rootScope, localStorage) {

        $rootScope.baseAPIUrl = window.sInstances.origin + "/DIY/rest/";
        $rootScope.baseUrl = window.sInstances.origin + "/DIY/";

        var logout = function () {
            localStorage.remove('visionKey');
            localStorage.remove('userID');
            localStorage.remove('dbRole');
            localStorage.remove('userKey');
            localStorage.remove('firstName');
            redirect("login");

        };

        var login = function (model) {
            $http({
                method: "POST",
                url: $rootScope.baseAPIUrl + "auth/loginUser",
                data: model
            }).then(function (response) {
                if (response.data !== "Expired") {
                    if (response.data.url) {
                        localStorage.add('visionKey', response.data.token);
                        localStorage.add('userID', response.data.userId);
                        localStorage.add('dbRole', response.data.dbRole);
                        localStorage.add('userKey', response.data.userKey);
                        localStorage.add('firstName', response.data.firstName);
                        window.location.href = response.data.url;

                    }
                } else {
                    bootbox.dialog({
                        message: "Your Licence Has Been Expired, Please Contact VSPL.",
                        size: 'small',
                        title: "<span style='color: red'>Login Error!</span> "
                    });

                }
            }, function (err) {
                alert("Error In Sign In Check Your Credentials Again");
            });
        };

        /*var getLicenseDays = function (model) {
            $http({
                method: "POST",
                url: $rootScope.baseAPIUrl + "auth/getLicenseTrialVersion",
                data: model
            }).then(function (response) {
                console.log(response);
            }, function (err) {
                alert("Error In Sign In Check Your Credentials Again");
            });
        };*/

        var createLicenseIfTrial = function (model) {
            $http({
                method: "POST",
                url: $rootScope.baseAPIUrl + "auth/createTrialLicense",
                data: model
            }).then(function (response) {
                if (response.data) {
                    if (response.data.token && response.data.url) {
                        window.location.href = response.data.url;
                    }
                }
                if (response.data == "Success") {
                    redirect('login')
                } else {
                    bootbox.dialog({
                        message: "Please fill the form correctly",
                        size: 'small',
                        title: "<span style='color: red'>Action not performed!</span> "
                    });
                }
            }, function (err) {
            });
        };

        var createLicenseIfFullVersion = function (model) {
            $http({
                method: "POST",
                url: $rootScope.baseAPIUrl + "auth/createFullVersionLicense",
                data: model
            }).then(function (response) {
                if (response.data) {
                    if (response.data.token && response.data.url) {
                        window.location.href = response.data.url;
                    }
                }
                if (response.data == true) {
                    redirect('login')
                } else {
                    bootbox.dialog({
                        message: "License Key is either Invalid or Expired",
                        size: 'small',
                        title: "<span style='color: red'>Invalid License Key!</span> "
                    });
                }
            }, function (err) {
            });
        };

        function redirect(url) {
            window.location.href = $rootScope.baseUrl + url;
        }

        return {
            login: login,
            logout: logout,
            redirect: redirect,
            createLicenseIfTrial :createLicenseIfTrial,
            createLicenseIfFullVersion : createLicenseIfFullVersion
        }
    }]);
})(window, window.document, window.jQuery, window.angular);