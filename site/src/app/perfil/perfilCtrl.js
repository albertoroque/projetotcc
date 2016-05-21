
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

.controller('PerfilCtrl', function ($scope, $rootScope, $routeParams, $location, $timeout, $q, Auth, PerfilService, LoginService, AuthService) {        

	$scope.dadosPerfil = {};
	$scope.images = {};	
	$scope.isRoot = false;
	$scope.logado = false;

	

	// CARREGA PERFIL DO USUÁRIO PELA ROTA
	$scope.carregaPerfil= function(){
					
		var userRota = $routeParams.rota;



		PerfilService.carregarPerfil(userRota)
			.then(function(result){

				$scope.dadosPerfil = result;

				$scope.images = result.posts;				

				convertePlaceId($scope.dadosPerfil.placeid);

				verificaStatus();
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

	/*
	*
	*
	*
	**/
	function verificaStatus(){		   
		AuthService.confirmAuth()
		 .then(function(result){

		 	$scope.logado = result.isLogado;
		 	if($scope.dadosPerfil.id == result.id) $scope.isRoot = true;
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