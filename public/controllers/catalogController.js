angular.module("shopping")
	.constant('pageSize', 3)
	.controller("catalogCtrl", function($scope, pageSize, catalogSvc, cartSvc){
		var selectedCategory = null;
		
		$scope.data = {};
		$scope.pageSize= pageSize;
		$scope.selectedPage = 1;
		
		catalogSvc.getCategories().then( 
			function(data){
				$scope.data.categories = data;
				$scope.selectCategory();
			}, function(data){
				$scope.data.error = data;
			}
		);
		
		$scope.selectCategory = function(newCategory){
			selectedCategory = newCategory;
			catalogSvc.getBooks(selectedCategory).then(
				function(data){
					$scope.data.books = data;
					if($scope.selectedPage != 1){
						$scope.selectedPage = 1;
					}
				}, function(data){
					$scope.data.error = data;
				}
			);
		};
		
		$scope.getCategoryClass = function(category){
			return selectedCategory == category ? "btn-primary" : "";
		};
		
		$scope.getPageClass = function(page){
			return $scope.selectedPage == page ? "btn-primary" : "";
		}
		
		$scope.selectPage = function (newPage) {
            $scope.selectedPage = newPage;
       	};
       	
       	$scope.addBookToCart = function(book){
       		cartSvc.addItem(book._id, book.title, book.reducedprice);
           	Messenger().post({
           		message: '图书【' + book.title + '】成功加入购物车！',
           		hideAfter: 3,
           		hideOnNavigate: true,
           		showCloseButton: true
			});
       	}
	});
