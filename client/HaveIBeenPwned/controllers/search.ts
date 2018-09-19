/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../../bower_components/currency.js/src/currency.d.ts" />

namespace HaveIBeenPwned {

  declare type RoundingFn = (v: number) => number;

  class SearchController {

    private noRoundingType: [string, RoundingFn] = ["No Rounding", v => v];
    private roundingTypes: [string, RoundingFn][]= [
      [ "Standard Rounding", Math.round ],
      [ "Round Up", Math.ceil ],
      [ "Round Down", Math.floor ],
    ];

    private currencyOptions: { [name: string]: currency.Options } = {
      USD: { precision: 2, symbol: "$", decimal: ".", separator: ",", increment: 0.05 },
      YEN: { precision: 0, symbol: "¥", decimal: ".", separator: ",", increment: 0.5 },
      EUR: { precision: 2, symbol: "€", decimal: ",", separator: ".", increment: 0.05 },
    };

    private selectedCurrency: currency.Options = this.currencyOptions.YEN;
    private selectedRoundingType: [string, RoundingFn] = this.roundingTypes[0];

    private amount1: number = 5.00;
    private amount2: number = 0.21;
    private discount: number = 10;

    naiveCalculation(amount1: number, amount2: number, roundingFun: RoundingFn): string {
      const sum: number = amount1 + amount2;
      const discount: number = sum * this.discount / 100;
      return this.selectedCurrency.symbol + roundingFun(sum - discount);
    }

    currencyCalculation(amount1: number, amount2: number): string {
      const fn: (v: number) => currency = v => currency(v, this.selectedCurrency);
      const sum: currency = fn(amount1).add(amount2);
      const discount: currency = sum.multiply(this.discount).divide(100);

      return sum.subtract(discount).format();
    }
  }

  angular
    .module("HaveIBeenPwned")
    .controller("SearchController", SearchController);
}
