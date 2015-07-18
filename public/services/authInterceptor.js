angular.module("datasource")
	.factory('authInterceptorSvc', function($q, localStorageService) {
		var authInterceptorServiceFactory = {};

		var _request = function(config) {
			config.headers = config.headers || {};
			// 如果需要向服务端发送凭据信息，则可以编写类似于下列的代码
			/*var authData = localStorageService.get('ticket');
			if (authData) {
				config.headers.Authorization = 'Bearer ' + authData.token;
			}*/
			return config;
		}

		var _responseError = function(rejection) {
			if (rejection.status === 401) {
				localStorageService.remove('ticket');
				window.location.href = "/#/login";
			}
			return $q.reject(rejection);
		}

		authInterceptorServiceFactory.request = _request;
		authInterceptorServiceFactory.responseError = _responseError;

		return authInterceptorServiceFactory;
	});