angular.module("datasource", []).constant('apiUrl','/api/');
angular.module("util", []);
angular.module("cart", ['LocalStorageModule']);
angular.module('auth', ['LocalStorageModule', 'datasource']);
angular.module("customFilters", []);

angular.module("shopping", ["ngRoute", "ngCookies", "datasource", "cart", "auth", "customFilters", "util"])
	.config(function ($routeProvider){
		$routeProvider.when("/", {
            templateUrl: "/views/catalog.html",
            controller: "catalogCtrl"
        });
        $routeProvider.when("/book/:bookId", {
        	templateUrl: "/views/book.html",
        	controller: "bookCtrl"
        });
        $routeProvider.when("/cartview", {
        	templateUrl: "/views/cartview.html",
        	controller: "cartCtrl"
        });
        $routeProvider.when("/register", {
        	templateUrl: "/views/register.html",
        	controller: "accountCtrl"
        });
        $routeProvider.when("/login", {
        	templateUrl: "/views/login.html",
        	controller: "accountCtrl"
        });
	})

angular.module("user", ["ngRoute", "ngResource", "ngCookies", "datasource", "cart", "auth", "util"])
	.config(function($routeProvider){
		$routeProvider.when("/changepwd", {
        	templateUrl: "/views/changepwd.html",
        	controller: "userCtrl"
        });
        $routeProvider.when("/contact", {
        	templateUrl: "/views/contact.html",
        	controller: "contactCtrl"
        });
        $routeProvider.when("/order", {
        	templateUrl: "/views/order.html",
        	controller: "orderCtrl"
        });
	})
	.config(function ($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    })
	.config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorSvc');
   });

angular.module("order", ["ngRoute", "ngResource", "ngCookies", "datasource", "cart", "auth"])
	.config(function($routeProvider){
		$routeProvider.when("/checkout", {
        	templateUrl: "/views/checkout.html",
        	controller: "orderProcessCtrl"
        });
        $routeProvider.when("/complete", {
        	templateUrl: "/views/complete.html"
        });
	})
	.config(function ($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    })
	.config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorSvc');
   });
