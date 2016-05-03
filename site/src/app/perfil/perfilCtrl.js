
angular.module('proj.perfil', ['ngRoute','ngMaterial'])

.config(function($routeProvider) {

    $routeProvider       
        .when('/perfil/:rota', {
            controller: 'PerfilCtrl',
            templateUrl: 'app/perfil/partials/perfil.tpl.html'
        });

    
})


.controller('PerfilCtrl', function ($scope, $rootScope, $location) {        

	$scope.dadosPerfil = {};

	$scope.carregaPerfil= function(){
		$scope.dadosPerfil = $rootScope.contaLogada;
		$scope.dadosPerfil.localFormatado = $scope.buscaLocal($scope.dadosPerfil.placeId);	
	}

	$scope.buscaLocal = function(placeId){
		geocoder = new google.maps.Geocoder();
			    
	    geocoder.geocode({'placeId': placeId}, function(results, status)
	    {
        if (status == google.maps.GeocoderStatus.OK)
        {	        
          if (results[0])
          {          	
          	console.log(results[0].formatted_address);
          	$scope.dadosPerfil.localFormatado = results[0].formatted_address;

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