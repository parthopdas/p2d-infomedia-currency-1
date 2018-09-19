/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../../bower_components/currency.js/src/currency.d.ts" />

namespace HaveIBeenPwned {
  class SearchController {
    private emailAddress: string;
    private breachedAccounts: BreachedAccount[];

    static $inject = ["PwnedService"];
    constructor(private pwnedService: IPwnedService) {
      this.emailAddress = "foo@bar.com";
    }

    submit(address: string): void {

	const USD: any = value => currency(value);
	const JPY: any = value => currency(value, { precision: 0, symbol: "¥" });
	const EURO: any = value => currency(value, { symbol: "€", decimal: ",", separator: "." });

	alert(USD(1234.567).format(true)); // => "$1,234.57"
	alert(JPY(1234.567).format(true)); // => "¥1,235"
	alert(EURO(1234.567).format(true)); // => "€1.234,57"

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
