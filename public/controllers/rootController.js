angular.module("auth")
	.controller("rootCtrl", function($scope, $cookieStore, localStorageService, accountSvc){
		// 下列代码首先检查用户是否已经登录，如果用户已经在登录到服务端，则cookie中必然有数据
		// 否则的化，将上次登录存放在local storage中的登录数据清空
		// 注意在node.js服务端的login和logout操作中，应该向cookie写入适当数据
		var cookie = $cookieStore.get('isAuthenticated')
		if(cookie != 1){
			localStorageService.remove('ticket');
		}
		
		$scope.credential = {
			isAuthenticated: false,
			token : "",
			nick : ""
		};
		
		// 下列代码保证，在每次重新装载页面（刷新页面）时，从local storage中读取之前已经登录的凭据信息
		// 如果去掉下列代码，那么每次刷新页面将导致页面上无法正确显示登录信息
		var ticket = accountSvc.getTicket();
		if(ticket){
			$scope.credential.isAuthenticated = true;
			$scope.credential.token = ticket.token;
			$scope.credential.nick = ticket.nick;
		}
	});
