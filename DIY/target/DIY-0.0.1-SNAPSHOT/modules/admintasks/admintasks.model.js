(function (window, document, $, angular) {

    angular.module('adminTasksApp').factory("adminTasksModel", ["adminTasksSvcs", function (adminTasksSvcs) {

        var InstanceGenerator = new function () {

            var InstanceFns = {
                ItemsData: function () {
                    this.className = "EOItem";
                    this.itemName = "";
                    this.quantity = "";
                    this.eoCategory = "";
                    this.eoGst = "";
                    this.lkUnit = "";
                },
                CreateCategories: function () {
                    this.className = "EOCategory";
                    this.categoryName = "";
                    this.createdDate = moment().format("YYYY-MM-DD");
                },
                GSTSlab: function () {
                    this.className = "EOGst";
                    this.gstType = "";
                    this.createdDate = moment().format("YYYY-MM-DD");
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


