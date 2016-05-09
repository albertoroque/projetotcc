
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

.controller('PerfilCtrl', function ($scope, $rootScope, $location, $timeout, $q, Auth, PerfilService) {        

	$scope.dadosPerfil = {};

	$scope.images = [];
	var it = {};
	

	// CARREGA PERFIL DO USUÁRIO PELA ROTA
	$scope.carregaPerfil= function(){
		
		$scope.dadosPerfil = Auth.get();

		console.log($scope.dadosPerfil);

		if($scope.dadosPerfil.placeId == 0){

		}else{
			$scope.dadosPerfil.local = convertePlaceIdw($scope.dadosPerfil.placeId);
		}			

		if(!$scope.dadosPerfil.isLogado){			
			$location.path('/login');
		}

		for (var j=0; j<5; j++) {
		  it.bk = "http://localhost:63349/img/33d677a6bd9d4b9b9301557a1b8a0749.jpg";
		  $scope.images.push(it);		
		}

		console.log($scope.images);			
	}



	/*
	*
	*
	*
	**/
	function convertePlaceIdw(placeId){
		var geocoder = new google.maps.Geocoder();
			    
	    geocoder.geocode({'placeId': placeId}, function(results, status)
	    {
	      if (status == google.maps.GeocoderStatus.OK)
	      {	        
			if (results[0])
			{   
				var icon = '<i class="fa fa-map-marker fa-lg"></i>';
				var bairro = results[0].address_components[1].long_name;
				var cidade = results[0].address_components[2].long_name;
				console.log(results[0]);
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
            	var im = {};
            	im.bk = multimidia;
            	$scope.images.push(im);
            	console.log($scope.images);                

            })
            .catch(function(retorno) {
                alert('ERRO');
            });          
    };

})