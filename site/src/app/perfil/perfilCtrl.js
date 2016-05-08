
angular.module('proj.perfil', ['ngRoute','ngMaterial'])

.config(function($routeProvider) {

    $routeProvider       
        .when('/perfil/:rota', {
            controller: 'PerfilCtrl',
            templateUrl: 'app/perfil/partials/perfil.tpl.html'
        });

    
})


.controller('PerfilCtrl', function ($scope, $rootScope, $location, $timeout, $q, Auth) {        

	$scope.dadosPerfil = {};

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
	}

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
  
})