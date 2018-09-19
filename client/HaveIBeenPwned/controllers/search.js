/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../../bower_components/currency.js/src/currency.d.ts" />
var HaveIBeenPwned;
(function (HaveIBeenPwned) {
    var SearchController = (function () {
        function SearchController(pwnedService) {
            this.pwnedService = pwnedService;
            this.USD = function (value) { return currency(value); };
            this.JPY = function (value) { return currency(value, { precision: 0, symbol: "¥" }); };
            this.EURO = function (value) { return currency(value, { symbol: "€", decimal: ",", separator: "." }); };
            this.usd = this.USD(1234.567).format(true); // => "$1,234.57"
            this.jpy = this.JPY(1234.567).format(true); // => "¥1,235"
            this.euro = this.EURO(1234.567).format(true); // => "€1.234,57"
            this.emailAddress = "foo@bar.com";
        }
        SearchController.prototype.submit = function (address) {
            var _this = this;
            this.pwnedService
                .check(address)
                .then(function (result) {
                _this.breachedAccounts = result.data;
            });
        };
        return SearchController;
    }());
    SearchController.$inject = ["PwnedService"];
    angular
        .module("HaveIBeenPwned")
        .controller("SearchController", SearchController);
})(HaveIBeenPwned || (HaveIBeenPwned = {}));
//# sourceMappingURL=search.js.map