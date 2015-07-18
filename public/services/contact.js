angular.module("datasource")
	.factory("contactSvc", function($resource, $q, apiUrl) {
			var rs = $resource(apiUrl + "user/contact/:contactId", {
				contactId: "@_id"
			});

			return {
				listContacts: function() {
					return rs.query().$promise;
				},
				deleteContact: function(contact) {
					var deferred = $q.defer();
					contact.$delete().then(function() {
						deferred.resolve();
					});
					return deferred.promise;
				},
				createContact: function(contact){
					var deferred = $q.defer();
					(new rs(contact)).$save().then(function(response){
						deferred.resolve(response); 
					});
					return deferred.promise;
				},
				updateContact: function(contact){
					var deferred = $q.defer();
					contact.$save().then(function(newContact){
						deferred.resolve(newContact); 
					});
					return deferred.promise;
				}
			};
	});
