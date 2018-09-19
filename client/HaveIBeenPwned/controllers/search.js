/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../../bower_components/currency.js/src/currency.d.ts" />
var HaveIBeenPwned;
(function (HaveIBeenPwned) {
    var SearchController = (function () {
        function SearchController() {
            this.noRoundingType = ["No Rounding", function (v) { return v; }];
            this.roundingTypes = [
                ["Standard Rounding", Math.round],
                ["Round Up", Math.ceil],
                ["Round Down", Math.floor],
            ];
            this.currencyOptions = {
                USD: { precision: 2, symbol: "$", decimal: ".", separator: ",", increment: 0.05 },
                YEN: { precision: 0, symbol: "¥", decimal: ".", separator: ",", increment: 0.5 },
                EUR: { precision: 2, symbol: "€", decimal: ",", separator: ".", increment: 0.05 },
            };
            this.selectedCurrency = this.currencyOptions.YEN;
            this.selectedRoundingType = this.roundingTypes[0];
            this.amount1 = 5.00;
            this.amount2 = 0.21;
            this.discount = 10;
        }
        SearchController.prototype.naiveCalculation = function (amount1, amount2, roundingFun) {
            var sum = amount1 + amount2;
            var discount = sum * this.discount / 100;
            return roundingFun(sum - discount);
        };
        SearchController.prototype.currencyCalculation = function (amount1, amount2) {
            var _this = this;
            var fn = function (v) { return currency(v, _this.selectedCurrency); };
            var sum = fn(amount1).add(amount2);
            var discount = sum.multiply(this.discount).divide(100);
            return sum.subtract(discount).format();
        };
        return SearchController;
    }());
    angular
        .module("HaveIBeenPwned")
        .controller("SearchController", SearchController);
})(HaveIBeenPwned || (HaveIBeenPwned = {}));
//# sourceMappingURL=search.js.map