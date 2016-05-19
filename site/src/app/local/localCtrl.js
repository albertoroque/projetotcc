
angular.module('proj.local', [])

.config(function($routeProvider) {

    $routeProvider       
      .when('/local', {
          controller: 'LocalCtrl',
          templateUrl: 'app/local/partials/local.tpl.html'
      });
})


.controller('LocalCtrl', function ($scope, $rootScope, $location, $mdDialog, Auth, LoginService) {        
  
	
	$scope.dadosConta = {};
    $scope.dadosPerfil = {};
    $scope.carregando = false;

	var geocoder = new google.maps.Geocoder;

	$scope.carregaPagina= function(){

		$scope.dadosConta = Auth.get();

        console.log($scope.dadosConta);
    
		if($scope.dadosConta.isLogado){            

            var user = {};
            user.username = $scope.dadosConta.username;
            user.password = $scope.dadosConta.password;

            LoginService.logar(user)
              .then(function(result){                
                $scope.dadosPerfil = result; 

                console.log($scope.dadosPerfil);

              })  
              .catch(function(result){
                $scope.carregaPagina();
              }) 

		}else{

            alert('Você não está logado!');
            $location.path('/login');
        }	
	}

	$scope.buscaLocal =  function(){
        console.log('disparada a busca de localização');
		getLocation();
        $scope.carregando = true;
	}

    $scope.gotoPerfil = function(){
        var page = 'perfil/' + $scope.dadosConta.username;
        $location.path(page);
    }

	function cookieLocal(local){		
		//$location.path($scope.dadosPerfil.rota);
        if(local.place_id != null){
            $scope.dadosPerfil.placeId = local.place_id;
            Auth.set($scope.dadosPerfil);        
            $location.path('perfil/alberto');
            console.log(Auth.get().rota);        

            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.body))
                .clickOutsideToClose(true)
                .title('LOCALIZAÇÃO PRONTA')
                .textContent('Seu perfil contém as informações do seu local para que outros amigos te achem com mais facilidade')
                .ariaLabel('Ok Localização')
                .ok('ok')    
            );


        }else{
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.body))
                .clickOutsideToClose(true)
                .title('Ops')
                .textContent('Você pode ter esquecido de usar sua localização. Tente novamente!')
                .ariaLabel('Erro Localização')
                .ok('ok')
                .targetEvent(ev)
            );
            
        }		
	}

   
    function getLocation() {
        if (navigator.geolocation) {
            return navigator.geolocation.getCurrentPosition(showPosition, showError);
        }else{ 
        	return "Seu browser não suporta Geolocalização."; 
        }
    }

    function showPosition(position) {
        console.log('buscando...');
        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    console.log('achei!');
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