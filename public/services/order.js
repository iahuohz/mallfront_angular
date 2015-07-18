angular.module('datasource')
	.factory('orderSvc', function($http, $q, apiUrl){
		return {
			createOrder : function(order){
				var url = apiUrl + "order";
				var deferred = $q.defer();
				$http.post(url, order)
					.success(function(response){
						deferred.resolve("订单创建成功！");
					})
					.error(function(response){
						deferred.reject("订单创建失败！");
					});
				return deferred.promise;
			},
			
			listOrders : function(){
				var url = apiUrl + "order";
				var deferred = $q.defer();
				$http.get(url)
					.success(function(data){
						deferred.resolve(data);
					})
					.error(function(data){
						deferred.reject("获取订单数据失败！");
					});
				return deferred.promise;
			},
			getOrder : function(orderId){
				var url = apiUrl + "order/" + orderId;
				var deferred = $q.defer();
				$http.get(url)
					.success(function(data){
						deferred.resolve(data);
					})
					.error(function(data){
						deferred.reject("获取订单数据失败！");
					});
				return deferred.promise;
			}
		};
	});
