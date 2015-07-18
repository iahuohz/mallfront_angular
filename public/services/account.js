angular.module("datasource")
    .factory("accountSvc", function ($http, $q, localStorageService, apiUrl) {
    	return {
    		register : function(name, nick, password){
    			var url = apiUrl + 'account/register';
    			//var data = "name=" + name + "&nick=" + nick + "&password=" + password;
    			var data = {
    				name : name,
    				nick: nick,
    				password: password
    			};
    			return $http.post(url,data).success(function(response){
    				return response;
    			});
    		},
    		checkname: function(name){
    			var url = apiUrl + 'account/checkname/' + name;
    			return $http.get(url).success(function(response){
    				return response;
    			})
    		},
    		login: function(name, password){
    			var url = apiUrl + 'account/login';
    			var data = {
    				name: name,
    				password: password
    			};
    			var deferred = $q.defer();
    			$http.post(url, data)
    				.success(function(response){
    					if(response.success){
	    					var token = response.token;
	    					var nick = response.nick;
	    					localStorageService.set('ticket', {token:token, nick:nick});
    					} 
    					deferred.resolve(response.success);
    				});
    			return deferred.promise;
    		},
    		logout: function(){
    			var url = apiUrl + 'account/logout';
    			return $http.post(url).then(
    				function(response){
    					localStorageService.remove('ticket');	
    				}
    			);
    		},
    		getTicket: function(){
    			return localStorageService.get('ticket');
    		},
    		changePwd : function(oldpassword, newpassword){
    			var url = apiUrl + 'user/changepwd';
    			var data = {
    				oldpassword: oldpassword,
    				newpassword: newpassword
    			};
    			return $http.post(url, data).then(
    				function(response){
    					return response;
    				},
    				function(response){
    					return response;
    				}
    			);
    		}
    	}
    });