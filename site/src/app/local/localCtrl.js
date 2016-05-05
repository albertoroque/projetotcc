
angular.module('proj.local', ['ngRoute'])

.config(function($routeProvider) {

    $routeProvider       
      .when('/local', {
          controller: 'LocalCtrl',
          templateUrl: 'app/local/partials/local.tpl.html'
      });
})


.controller('LocalCtrl', function ($scope, $rootScope, $location, Auth) {        
  
	
	$scope.dadosPerfil = {};

	var geocoder = new google.maps.Geocoder;

	$scope.carregaPagina= function(){
		$scope.dadosPerfil = Auth.get();
		if(!$scope.dadosPerfil.isLogado){
			alert('Você não está logado!');
			$location.path('/login');
		}		
	}

	$scope.buscaLocal =  function(){
		getLocation();
	}

	function cookieLocal(local){		
		$location.path($scope.dadosPerfil.rota);
		$scope.dadosPerfil.placeId = local.place_id;
		Auth.set($scope.dadosPerfil);
	}

   
    function getLocation() {
        if (navigator.geolocation) {
            return navigator.geolocation.getCurrentPosition(showPosition, showError);
        }else{ 
        	return "Seu browser não suporta Geolocalização."; 
        }
    }

    function showPosition(position) {
        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                	cookieLocal(results[0]);
                }
            } else {
              alert("Geocode was not successful for the following reason: " + status);
            }
        });
    }

    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                return "Usuário rejeitou a solicitação de Geolocalização."
                break;
            case error.POSITION_UNAVAILABLE:
                return "Localização indisponível."
                break;
            case error.TIMEOUT:
                return "O tempo da requisição expirou."
                break;
            case error.UNKNOWN_ERROR:
                return "Algum erro desconhecido aconteceu."
                break;
        }
    }
})