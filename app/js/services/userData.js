todoApp.factory('userData', function ($resource, $q){
	var userid = 0;
	var resource = $resource('/data/event/:id', {id: '@id'});
	return {
		save: function(user){
			var deferred = $q.defer();
			user.id = userid;
			userid++;
			resource.save(user,
                function(response) { deferred.resolve(response);},
                function(response) { deferred.reject(response);}
            );
            return deferred.promise;
		}
	}

})