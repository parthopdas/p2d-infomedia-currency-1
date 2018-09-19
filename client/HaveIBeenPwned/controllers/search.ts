/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../../bower_components/currency.js/src/currency.d.ts" />

namespace HaveIBeenPwned {
  class SearchController {
    private currencyOptions: { [name: string]: currency.Options } = {
      USD: { precision: 2, symbol: "$", decimal: ".", separator: "," },
      YEN: { precision: 0, symbol: "¥", decimal: ".", separator: "," },
      EUR: { precision: 2, symbol: "€", decimal: ",", separator: "." },
    };

    private selectedCurrency: currency.Options;

    private amount1: number = 0.12;
    private amount2: number = 0.21;

    static $inject = ["PwnedService"];
    constructor(private pwnedService: IPwnedService) {
      this.selectedCurrency = this.currencyOptions.USD;
    }

    naiveAddition(amount1: number, amount2: number): string {
      return this.selectedCurrency.symbol + (amount1 + amount2);
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
