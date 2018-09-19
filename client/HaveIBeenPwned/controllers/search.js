/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../../bower_components/currency.js/src/currency.d.ts" />
var HaveIBeenPwned;
(function (HaveIBeenPwned) {
    var SearchController = (function () {
        function SearchController(pwnedService) {
            this.pwnedService = pwnedService;
            this.currencyOptions = {
                USD: { precision: 2, symbol: "$", decimal: ".", separator: "," },
                YEN: { precision: 0, symbol: "¥", decimal: ".", separator: "," },
                EUR: { precision: 2, symbol: "€", decimal: ",", separator: "." },
            };
            this.amount1 = 0.12;
            this.amount2 = 0.21;
            this.selectedCurrency = this.currencyOptions.USD;
        }
        SearchController.prototype.naiveAddition = function (amount1, amount2) {
            return this.selectedCurrency.symbol + (amount1 + amount2);
        };
        SearchController.prototype.currencyAddition = function (amount1, amount2) {
            var _this = this;
            var fn = function (v) { return currency(v, _this.selectedCurrency); };
            return fn(amount1).add(amount2).format(true);
        };
        return SearchController;
    }());
    SearchController.$inject = ["PwnedService"];
    angular
        .module("HaveIBeenPwned")
        .controller("SearchController", SearchController);
})(HaveIBeenPwned || (HaveIBeenPwned = {}));
//# sourceMappingURL=search.js.map