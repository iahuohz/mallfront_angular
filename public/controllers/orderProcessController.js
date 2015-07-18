angular.module('order')
	.controller('orderProcessCtrl', function($scope, $location, cartSvc, contactSvc, orderSvc){
		$scope.order = {};
		$scope.order.cartData = cartSvc.getItems();
		
		function calcOrder(cartData){
			var total = 0;
			for (var i = 0; i < cartData.length; i++) {
				total += (cartData[i].price * cartData[i].quantity);
			}
			$scope.order.total = total;
		}
		
		contactSvc.listContacts().then(function(data){
			$scope.contacts = data;
			calcOrder($scope.order.cartData);
		});
		
		$scope.submitOrder = function(){
			orderSvc.createOrder($scope.order).then(
				function(response){
					cartSvc.clear();
					$location.path("/complete");
				},
				function(response){
					$scope.error = response;
				}
			);
		};
	});
