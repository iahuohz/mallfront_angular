angular.module("auth")
	.directive("loginStatus", function () {          
        return {
            restrict: "E",
            templateUrl: "/directives/loginStatus.html",
            controller: "accountCtrl"
        }
    });
