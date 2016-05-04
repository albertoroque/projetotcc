
angular.module('proj.perfil', ['ngRoute','ngMaterial'])

.config(function($routeProvider) {

    $routeProvider       
        .when('/perfil/:rota', {
            controller: 'PerfilCtrl',
            templateUrl: 'app/perfil/partials/perfil.tpl.html'
        });

    
})


.controller('PerfilCtrl', function ($scope, $rootScope, $location, Auth) {        

	$scope.dadosPerfil = {};

	$scope.carregaPerfil= function(){
		$scope.dadosPerfil = Auth.get();

		console.log($scope.dadosPerfil);

		if(!$scope.dadosPerfil.isLogado){
			alert('Você não está logado!');
			$location.path('/login');
		}			
	}

	$scope.buscaLocal = function(placeId){
		geocoder = new google.maps.Geocoder();
			    
	    geocoder.geocode({'placeId': placeId}, function(results, status)
	    {
	      if (status == google.maps.GeocoderStatus.OK)
	      {	        
					if (results[0])
					{          	
						var local = results[0].formatted_address;
						return local;
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

	$scope.isMaster = function(){

	}
  
})