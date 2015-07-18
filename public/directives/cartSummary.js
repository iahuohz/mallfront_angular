angular.module("cart")
	.directive("cartSummary", function (cartSvc) {          
        return {
            restrict: "E",
            templateUrl: "/directives/cartSummary.html",  		// Partial view的路径，用于渲染该directive的内容
            controller: function ($scope) {         			// controller为partial view提供数据和操作
                $scope.total = function () {
                	var cartData = cartSvc.getItems();
                    var total = 0;
                    for (var i = 0; i < cartData.length; i++) {
                        total += (cartData[i].price * cartData[i].quantity);
                    }
                    return total;
                };
                $scope.itemCount = function () {
                	var cartData = cartSvc.getItems();
                    var total = 0;
                    for (var i = 0; i < cartData.length; i++) {
                        total += cartData[i].quantity;
                    }
                    return total;
                };
                 $scope.$on("cartUpdated", function (event, args) {
			        $scope.cartData = cartSvc.getItems();
			        $scope.$digest();
			    });
            }
        }
    });
