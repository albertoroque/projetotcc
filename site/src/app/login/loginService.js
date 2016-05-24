angular.module('proj.login')

.service('LoginService', function ($http, $q){

	var serverstatic = "http://localhost:51698/api/v1";
	var serversocial = "http://localhost:51698/projetotcc/api/";

	return {

		logar: function(userlogin){

			var fbauth = '';

			console.log(userlogin);
			
			if(userlogin.fbid) fbauth = 'f';

			var d = $q.defer(),
			url = serversocial + 'autenticar' + fbauth;

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

