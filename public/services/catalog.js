angular.module('datasource').service("catalogSvc", function($http, $q, apiUrl){
	var catalogUrl = apiUrl + "catalog"; 
	
	this.getCategories = function(){
		var deferred = $q.defer();
		$http.get(catalogUrl + "/categories")
			.success(function(data){
				deferred.resolve(data);
				})
			.error(function(data){
				deferred.reject("无法获取类别数据!");
			});
		return deferred.promise;
	};
	
	this.getBooks = function(category){
		var url= catalogUrl + "/books";
		if(angular.isDefined(category)){
			url += "/" + category._id;
		}
		var deferred = $q.defer();
		$http.get(url)
			.success(function(data){
				deferred.resolve(data);
			})
			.error(function(data){
				deferred.reject("无法获取图书数据！");
			});
		return deferred.promise;
	};
	
	this.getBook = function(bookId){
		var url = catalogUrl + "/book/" + bookId;
		var deferred = $q.defer();
		$http.get(url)
			.success(function(data){
				deferred.resolve(data);
			})
			.error(function(data){
				deferred.reject("无法获取图书数据！");
			});
		return deferred.promise;
	}
});
