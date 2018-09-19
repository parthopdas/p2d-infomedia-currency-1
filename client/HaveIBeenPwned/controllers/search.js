/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../../bower_components/currency.js/src/currency.d.ts" />
var HaveIBeenPwned;
(function (HaveIBeenPwned) {
    var SearchController = (function () {
        function SearchController(pwnedService) {
            this.pwnedService = pwnedService;
            this.emailAddress = "foo@bar.com";
        }
        SearchController.prototype.submit = function (address) {
            var _this = this;
            var USD = function (value) { return currency(value); };
            var JPY = function (value) { return currency(value, { precision: 0, symbol: "¥" }); };
            var EURO = function (value) { return currency(value, { symbol: "€", decimal: ",", separator: "." }); };
            alert(USD(1234.567).format(true)); // => "$1,234.57"
            alert(JPY(1234.567).format(true)); // => "¥1,235"
            alert(EURO(1234.567).format(true)); // => "€1.234,57"
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