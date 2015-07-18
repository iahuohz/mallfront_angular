angular.module("shopping")
	.controller("bookCtrl", function($scope, $routeParams, catalogSvc, cartSvc){
		var bookId = $routeParams.bookId;
		
		catalogSvc.getBook(bookId).then(
			function(data){
				$scope.book = data;
			},
			function(data){
				$scope.error = data;
			}
		);
			
		$scope.addBookToCart = function(book){
       		cartSvc.addItem(book._id, book.title, book.reducedprice);
       		Messenger().post({
           		message: '图书【' + book.title + '】成功加入购物车！',
           		hideAfter: 3,
           		hideOnNavigate: true,
           		showCloseButton: true
			});
       };
	});
