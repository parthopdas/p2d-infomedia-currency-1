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

    naiveAddition(amount1: number, amount2: number, roundingFun: RoundingFn): string {
      return this.selectedCurrency.symbol + roundingFun(amount1 + amount2);
    }

    currencyAddition(amount1: number, amount2: number): string {
      const fn: (v: number) => currency = v => currency(v, this.selectedCurrency);
      return fn(amount1).add(amount2).format(true);
    }
  }

  angular
    .module("HaveIBeenPwned")
    .controller("SearchController", SearchController);
}
