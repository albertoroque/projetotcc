
angular.module('proj.perfil', [])

.config(function($routeProvider) {

    $routeProvider       
        .when('/perfil/:rota', {
            controller: 'PerfilCtrl',
            templateUrl: 'app/perfil/partials/perfil.tpl.html'
        });

    
})


//https://uncorkedstudios.com/blog/multipartformdata-file-upload-with-angularjs
//http://jsfiddle.net/JeJenny/ZG9re/

.controller('PerfilCtrl', function ($scope, $rootScope, $routeParams, $location, $timeout, $q, Auth, PerfilService, LoginService) {        

	$scope.dadosPerfil = {};

	$scope.images = {};	

	$scope.isRoot = false;
	

	// CARREGA PERFIL DO USUÁRIO PELA ROTA
	$scope.carregaPerfil= function(){
		
		$scope.dadosConta = Auth.get();
		

		var userRota = $routeParams.rota;

		PerfilService.carregarPerfil(userRota)
			.then(function(result){

				$scope.dadosPerfil = result;

				// console.log($scope.dadosPerfil);
				// console.log('CONTA', $scope.dadosConta);

				$scope.images = result.posts;				

				convertePlaceId($scope.dadosPerfil.placeid);

				verificaRoot();
			})
			.catch(function(result){

			})			
	}

	function carregaImagens(user){
		PerfilService.carregarPerfil(user)
			.then(function(result){			
				$scope.images = result.posts;							
			})
			.catch(function(result){
				$rootScope.toast('Erro ao atualizar sua galeria');
			})	
	}

	function verificaRoot(){
		
		var user = {};
        user.username = $scope.dadosConta.username;
        user.password = $scope.dadosConta.password;

        LoginService.logar(user)
          .then(function(result){                

          	console.log(result);
          	var contaLogada = {};
          	contaLogada = result; 

          	if($scope.dadosPerfil.id ==  contaLogada.id)
				$scope.isRoot = true;                      
          })            

				
	}


	/*
	*
	*
	*
	**/
	function convertePlaceId(placeId){
		var geocoder = new google.maps.Geocoder();
			    
	    geocoder.geocode({'placeId': placeId}, function(results, status)
	    {
	      if (status == google.maps.GeocoderStatus.OK)
	      {	 

	      	// console.log('voltou resultado');       
			if (results[0])
			{   
				var icon = '<i class="fa fa-map-marker fa-lg"></i>&nbsp;';
				var bairro = results[0].address_components[1].long_name;
				var cidade = results[0].address_components[2].long_name;

				// console.log(results[0]);

				document.getElementById("local").innerHTML = icon +' '+ bairro + ', ' + cidade;
				return results[0].formatted_address;				
			}else{

				return 'Ocorreu um erro inesperado!'
			}
		  }
	      else
	      {	        	
	        return 'Ocorreu um erro inesperado!'
	      }
	    });
	}


	$scope.logout = function(){
		Auth.clear();
		$location.path('/login');
	};

	/**
     * Função que realiza o upload das imagens
     * @param {[[Type]]} element        [[Description]]
    	
     */
    $scope.uploadDeImagem = function(element) {
        
        console.log("Carregando multimídia");

        PerfilService.upload(element)
            .then(function(multimidia) {

            	console.log(multimidia);
            	$scope.gravaImagem(multimidia);
            })
            .catch(function(retorno) {
                alert('ERRO');
            });          
    };

    $scope.gravaImagem = function(path){

    	var post = {};

    	post.url = path;

    	PerfilService.criarPost($scope.dadosPerfil.id, post)
    	.then(function(result){
    		console.log('ok',result);
    		carregaImagens($scope.dadosPerfil.username);

    	})
    	.catch(function(result){
    		console.log('erro',result);
    	})

    }

})