angular.module('user')
	.controller('orderCtrl', function($scope, orderSvc){
		orderSvc.listOrders().then(
			function(data){
				$scope.orders = data;
			}
		);
		
		$scope.selectOrder = function(order){
			orderSvc.getOrder(order._id).then(
				function(data){
					$scope.selectedOrder = data;
					$('#orderDetailsDiv').modal('show');
				}
			);
		}
	});
