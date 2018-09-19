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
        }
        SearchController.prototype.naiveAddition = function (amount1, amount2, roundingFun) {
            return this.selectedCurrency.symbol + roundingFun(amount1 + amount2);
        };
        SearchController.prototype.currencyAddition = function (amount1, amount2) {
            var _this = this;
            var fn = function (v) { return currency(v, _this.selectedCurrency); };
            return fn(amount1).add(amount2).format(true);
        };
        return SearchController;
    }());
    angular
        .module("HaveIBeenPwned")
        .controller("SearchController", SearchController);
})(HaveIBeenPwned || (HaveIBeenPwned = {}));
//# sourceMappingURL=search.js.map