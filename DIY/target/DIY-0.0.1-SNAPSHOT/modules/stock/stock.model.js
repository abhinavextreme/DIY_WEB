(function (window, document, $, angular) {

    angular.module('stockApp').factory("stockModel", ["stockSvcs", function (stockSvcs) {

        var InstanceGenerator = new function () {

            var InstanceFns = {
                EOInventory: function () {
                    this.className = "EOInventory";
                    this.eoItem = "";
                    this.eoInventoryDetailsArray = [];
                },
                EOInventoryDetail: function () {
                    this.className = "EOInventoryDetail";
                    this.currentQuantity = "";
                    this.purchaseQuantity = "";
                    this.totalQuantity = "";
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


