(function (window, document, $, angular) {

    angular.module('shopApp').factory("shopModel", ["shopSvcs", function (shopSvcs) {

        var InstanceGenerator = new function () {

            var InstanceFns = {
                ShopData: function () {
                    this.className = "EOShop";
                    this.shopName = "";
                    this.phone = "";
                    //this.email = "";
                    this.addressLine1 = "";
                    this.city = "";
                    this.state = "";
                    this.country = "";
                    this.pinCode = "";
                    this.landMark = "";
                    this.gstInNumber = "";
                }
            };

            this.create = function (type) {
                if (InstanceFns[type]) {
                    return new InstanceFns[type]();
                }
            };
        }();

        return {
            getInstance: InstanceGenerator.create
        }

    }]);

})(window, window.document, window.jQuery, window.angular);



