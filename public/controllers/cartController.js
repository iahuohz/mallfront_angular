angular.module("cart")
	.controller("cartCtrl", function($scope, $rootScope, cartSvc) {
		$scope.cartData = cartSvc.getItems();
		$scope.total = function() {
			var total = 0;
			for (var i = 0; i < $scope.cartData.length; i++) {
				total += ($scope.cartData[i].price * $scope.cartData[i].quantity);
			}
			return total;
		}
		$scope.itemCount = function() {
			var total = 0;
			for (var i = 0; i < $scope.cartData.length; i++) {
				total += $scope.cartData[i].quantity;
			}
			return total;
		}
		$scope.remove = function(book) {
			var msg = Messenger().post({
				message: '确定从购物车中删除图书【' + book.title + '】?',
				id : "deleteConfirm",			// 设置id将使得该确认框一次只能显示一个
				showCloseButton: true,
				actions: {
					confirm: {
						label: '确定',
						action: function() {
							cartSvc.removeItem(book.bookId);
							$rootScope.$broadcast("cartUpdated", {});
							return msg.hide();
						}
					},
					cancel: {
						label: '取消',
						action: function() {
							return msg.cancel();
						}
					}
				}
			});
		};
		$scope.$on("cartUpdated", function(event, args) {
			$scope.cartData = cartSvc.getItems();
			$scope.$digest();
		});
	});