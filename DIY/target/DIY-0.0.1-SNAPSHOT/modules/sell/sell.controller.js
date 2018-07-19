(function (window, document, $, angular) {

    var sellApp = angular.module('sellApp');

    sellApp.controller("sellCtrl", ["$scope", "$state", "$rootScope", "getItemsDataForSelling", "$timeout", "sellSvcs", "notifySvcs", function ($scope, $state, $rootScope, getItemsDataForSelling, $timeout, sellSvcs, notifySvcs) {

        var vm = this;
        $rootScope.pageHeader = "Sell";
        $rootScope.pageDescription = "";

        //console.log("getItemsDataForSelling", getItemsDataForSelling);

        $(document).ready(function () {
            $('.select2').select2();
        });

        vm.formModel = {};
        vm.itemListDataArray = getItemsDataForSelling.itemsList;
        vm.shopData = getItemsDataForSelling.ShopListData;
        //console.log(vm.itemListDataArray);
        vm.sellItem = null;

        vm.itemListRepeat = [];
        vm.addTableRows = function (data) {
            var copyDataObj = JSON.parse(data);
            vm.itemListRepeat.push(copyDataObj);
        };

        vm.removeRows = function (key) {
            vm.costAmount = null;
            vm.amountReceived = null;
            var index = undefined;
            for (var i in vm.itemListRepeat) {
                if (vm.itemListRepeat[i].$$hashKey == key) {
                    index = i;
                    vm.itemListRepeat.splice(i, 1);
                }
            }
        };

        //function to calculate item cost,total amount and gst
        vm.calculateAmount = function () {
            vm.costAmount = 0;
            vm.totalGst = 0;
            for (var key in vm.itemListRepeat) {
                vm.itemListRepeat[key].cost = vm.itemListRepeat[key].rateOfSelling * parseInt(vm.itemListRepeat[key].quantity);
                vm.itemListRepeat[key].gstOnItem = vm.itemListRepeat[key].rateOfSelling * parseInt(vm.itemListRepeat[key].gstType) * parseInt(vm.itemListRepeat[key].quantity) / 100;
                if (vm.itemListRepeat[key].cost != isNaN && vm.itemListRepeat[key].gstOnItem != isNaN) {
                    vm.totalGst += vm.itemListRepeat[key].gstOnItem;
                    vm.costAmount += vm.itemListRepeat[key].cost;
                }
            }
        };


        function submitForm() {
            //for updating the quantity from inventory Detail
            var reqMap = {};
            reqMap.InvDetailArray = [];
            var itemMapData = angular.copy(vm.itemListRepeat);
            for (var mKey in itemMapData) {
                var reMapObj = {};
                reMapObj.quantity = itemMapData[mKey].quantity;
                reMapObj.invPK = itemMapData[mKey].invPK;
                reqMap.InvDetailArray.push(reMapObj);
            }
            sellSvcs.updateInvDetailTotalQuantity(reqMap, function (res) {

            }, function (err) {
                notifySvcs.error({
                    content: "Action Not Performed"
                })
            });
            //for creating gst report objects
            var reqMap2 = {
                className: "EOGstReport",
                createdDate: moment().format("YYYY-MM-DD"),
                totalItemsCost: vm.costAmount,
                totalGstOnAllItems: vm.totalGst
            };
            sellSvcs.createReportForGst(reqMap2, function (res) {

            }, function (err) {
                notifySvcs.error({
                    content: "Action Not Performed"
                })
            });
        }

        //generating PDF
        vm.genPDF = function () {
            submitForm();
            var itemListPDF = angular.copy(vm.itemListRepeat);
            console.log("itemListPDF--> ", itemListPDF);
            var doc = new jsPDF('p', 'mm', [225, 160]);
            var y = 25;
            var totalDiscMrp = 0;
            var slipDate = moment().format("YYYY-MM-DD");

            doc.setFont("helvetica");
            doc.setFontSize(16).setFontType("bold");
            doc.textCenter(vm.shopData[0].shopName, {align: "center"}, 0, 15);

            doc.setFontSize(12).setFontType("normal");
            doc.textCenter(vm.shopData[0].addressLine1 + ',' + vm.shopData[0].city + ',' + vm.shopData[0].state, {align: "center"}, 0, 20);
            doc.textCenter('PIN : ' + vm.shopData[0].pinCode, {align: "center"}, 0, 25);
            doc.textCenter('GSTIN : ' + vm.shopData[0].gstInNumber, {align: "center"}, 0, 30);

            doc.setFontSize(10).setFontType("normal");
            doc.text(10, 35, "Date : ");

            doc.setFontSize(10).setFontType("normal");
            doc.text(25, 35, slipDate);

            doc.line(0, 50, 160, 50);
            doc.line(10, 65, 150, 65);
            doc.line(65, 55, 65, 190);
            doc.line(85, 55, 85, 190);
            doc.line(105, 55, 105, 190);
            doc.line(125, 55, 125, 190);

            doc.rect(10, 55, 140, 135);
            doc.rect(90, 192, 60, 20);

            doc.setFontSize(10).setFontType("bold");
            doc.text("Item Name", 15, 60);

            doc.setFontSize(10).setFontType("bold");
            doc.text("Price", 66, 60);

            doc.setFontSize(10).setFontType("bold");
            doc.text("Quantity", 86, 60);

            doc.setFontSize(10).setFontType("bold");
            doc.text("Disc.", 106, 60);

            doc.setFontSize(6).setFontType("normal");
            doc.text("On MRP", 115, 60);

            doc.setFontSize(10).setFontType("bold");
            doc.text("Cost", 127, 60);

            doc.setFontSize(10).setFontType("normal");
            doc.text(100, 198, "Total Amount : ");

            doc.setFontSize(10).setFontType("normal");
            doc.text(100, 205, "Amount Received : ");

            doc.setFontSize(10).setFontType("normal");
            doc.text(130, 198, vm.costAmount + "");

            doc.setFontSize(10).setFontType("normal");
            doc.text(130, 205, vm.amountReceived != undefined && vm.amountReceived != '' ? vm.amountReceived + "" : vm.costAmount + "");

            doc.setFontSize(10).setFontType("normal");
            doc.text(10, 45, "Total Amount Saved On MRP : ");

            y += 40;
            for (var itemKey in itemListPDF) {

                itemListPDF[itemKey]['discMrp'] = itemListPDF[itemKey].itemMRP - itemListPDF[itemKey].rateOfSelling;
                totalDiscMrp += itemListPDF[itemKey].discMrp;
                y += 10;
                doc.setFontSize(10).setFontType("normal");
                var itemSize = itemListPDF[itemKey].itemName + " -" + itemListPDF[itemKey].unitVolume + itemListPDF[itemKey].lkUnit;

                /*if (y > 185) {

                    doc.addPage();
                }*/

                doc.text(13, y, itemSize);

                doc.setFontSize(10).setFontType("normal");
                doc.text(70, y, itemListPDF[itemKey].rateOfSelling + "");

                doc.setFontSize(10).setFontType("normal");
                doc.text(90, y, itemListPDF[itemKey].quantity);

                doc.setFontSize(10).setFontType("normal");
                doc.text(110, y, itemListPDF[itemKey].discMrp + "");

                doc.setFontSize(10).setFontType("normal");
                doc.text(128, y, itemListPDF[itemKey].cost + "");
            }

            doc.setFontSize(10).setFontType("normal");
            doc.text(60, 45, totalDiscMrp + "");
            doc.save(slipDate);

            $state.reload();
        };

        (function (API) {
            API.textCenter = function (txt, options, x, y) {
                options = options || {};
                /* Use the options align property to specify desired text alignment
                 * Param x will be ignored if desired text alignment is 'center'.
                 * Usage of options can easily extend the function to apply different text
                 * styles and sizes
                 */
                if (options.align == "center") {
                    // Get current font size
                    var fontSize = this.internal.getFontSize();

                    // Get page width
                    var pageWidth = this.internal.pageSize.width;

                    // Get the actual text's width
                    /* You multiply the unit width of your string by your font size and divide
                     * by the internal scale factor. The division is necessary
                     * for the case where you use units other than 'pt' in the constructor
                     * of jsPDF.
                     */
                    txtWidth = this.getStringUnitWidth(txt) * fontSize / this.internal.scaleFactor;

                    // Calculate text's x coordinate
                    x = ( pageWidth - txtWidth ) / 2;
                }

                // Draw text at x,y
                this.text(txt, x, y);
            }
        })(jsPDF.API);

    }]);

})(window, window.document, window.jQuery, window.angular);

