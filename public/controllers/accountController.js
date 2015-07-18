angular.module("auth")
	.controller("accountCtrl", function($scope, accountSvc){
		$scope.registration = {
            name: "",
            nick: "",
            password: "",
            confirmPassword: ""
        };
        $scope.name = {
        	ready : false
        };
        $scope.loginData = {
        	name:"",
        	password:""
        };
        
        $scope.register = function(){
        	accountSvc.register($scope.registration.name, $scope.registration.nick, $scope.registration.password).then(
        		function(response){
        			Messenger().post({
		           		message: '注册成功！',
		           		hideAfter: 3,
		           		hideOnNavigate: true,
		           		showCloseButton: true
					});
        			$scope.registration = {
        				name: "",
			            nick: "",
			            password: "",
			            confirmPassword: ""
        			}
        		},
        		function(response){
        			Messenger().post({
		           		message: '注册失败！',
		           		hideAfter: 10,
		           		hideOnNavigate: true,
		           		showCloseButton: true
					});
        		}
        	);
        };
        $scope.checkname = function(needCheck){
        	if(needCheck){
	        	accountSvc.checkname($scope.registration.name).then(
	        		function(response){
	        			if(response.data.result == "ok"){
	        				$scope.name.ready = true;
	        			} else{
	        				$scope.name.ready = false;
	        			}
	        		}
	        	)
	        } else{
	        	$scope.name.ready = false;
	        };
        };
        $scope.login = function(){
        	accountSvc.login($scope.loginData.name, $scope.loginData.password).then(
        		function(result){
        			if(result){
	        			var ticket = accountSvc.getTicket();
	        			$scope.credential.isAuthenticated = true;
	        			$scope.credential.token = ticket.token;
	        			$scope.credential.nick = ticket.nick;
	        			Messenger().post({
			           		message: '登录成功！',
			           		hideAfter: 10,
			           		hideOnNavigate: true,
			           		showCloseButton: true
						});
						window.location.href = "/#/";
					} else{
						$scope.loginError = "用户名或密码错误，请重试！";
					}
        		}
        	);
        };
        $scope.logout = function(){
        	accountSvc.logout().then(
        		function(response){
        			$scope.credential.isAuthenticated = false;
        			$scope.credential.token = "";
        			$scope.credential.nick = "";
        			
        			Messenger().post({
			           		message: '注销成功！',
			           		hideAfter: 10,
			           		hideOnNavigate: true,
			           		showCloseButton: true
						});
        			window.location.href = "/#/";
        		}
        	);
        }
	});
