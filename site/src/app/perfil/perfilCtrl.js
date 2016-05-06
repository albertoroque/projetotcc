
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

		$scope.dadosPerfil.local = convertePlaceIdw($scope.dadosPerfil.placeId);

		console.log($scope.dadosPerfil);

		if(!$scope.dadosPerfil.isLogado){
			alert('Você não está logado!');
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
				console.log(results[0].formatted_address);
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

	function convertePlaceId(placeId) {
		return 'Alameda';
	  // return function() {
	  //   var defer = $q.defer()

	  //   // simulated async function
	  //   $timeout(function() {
	  //     if(true) {
	  //       defer.resolve(placeId)
	  //     } else {
	  //       defer.reject('erro')
	  //     }
	  //   }, 2000)
	  //   return defer.promise
	  // }
	}
  
})