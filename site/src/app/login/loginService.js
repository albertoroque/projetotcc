angular.module('proj.login')

.service('LoginService', function ($http, $q){

	var serverstatic = "http://localhost:51698/api/v1";
	var serversocial = "http://localhost:51698/projetotcc/api/";

	return {

		logar: function(userlogin){
			var d = $q.defer(),
			url = serversocial + 'autenticar'

			$http.post(url, userlogin)
			.success(function(result){
				d.resolve(result);
			})
			.error(function(result){
				d.reject(result);
			});

			return d.promise;
		}
	}

})

