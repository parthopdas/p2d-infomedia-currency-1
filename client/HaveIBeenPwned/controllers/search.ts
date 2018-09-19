/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../../bower_components/currency.js/src/currency.d.ts" />

namespace HaveIBeenPwned {
  class SearchController {
    private emailAddress: string;
    private breachedAccounts: BreachedAccount[];

    private USD: any = value => currency(value);
    private JPY: any = value => currency(value, { precision: 0, symbol: "¥" });
    private EURO: any = value => currency(value, { symbol: "€", decimal: ",", separator: "." });

    private usd = this.USD(1234.567).format(true); // => "$1,234.57"
    private jpy = this.JPY(1234.567).format(true); // => "¥1,235"
    private euro = this.EURO(1234.567).format(true); // => "€1.234,57"

    static $inject = ["PwnedService"];
    constructor(private pwnedService: IPwnedService) {
      this.emailAddress = "foo@bar.com";
    }

    submit(address: string): void {
      this.pwnedService
        .check(address)
        .then((result: ng.IHttpPromiseCallbackArg<BreachedAccount[]>) => {
          this.breachedAccounts = result.data;
        });
    }
  }

  angular
    .module("HaveIBeenPwned")
    .controller("SearchController", SearchController);
}
