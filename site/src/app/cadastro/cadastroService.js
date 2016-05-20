angular.module('proj.cadastro')

.service('CadastroService', function ($http, $q){

	var serverstatic = "http://localhost:63349/api/v1";
	var serversocial = "http://localhost:51698/projetotcc/api/";

	return {

		cadastrar: function(dadosusuario){
			var d = $q.defer(),
			url = serversocial + 'users'

			$http.post(url, dadosusuario)
			.success(function(result){
				d.resolve(result);
			})
			.error(function(result){
				d.reject("Erro ao cadastrar");
			});

			return d.promise;
		}
	}

})

