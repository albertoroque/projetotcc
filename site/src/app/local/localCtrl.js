
angular.module('proj.local', ['ngRoute'])

.config(function($routeProvider) {

    $routeProvider       
      .when('/local', {
          controller: 'LocalCtrl',
          templateUrl: 'app/local/partials/local.tpl.html'
      });
})


.controller('LocalCtrl', function ($scope, $rootScope, $location, Auth, LocalFactory) {        
  
	
	$scope.dadosPerfil = {};

	$scope.carregaPagina= function(){
		$scope.dadosPerfil = Auth.get();
		if(!$scope.dadosPerfil.isLogado){
			alert('Você não está logado!');
			$location.path('/login');
		}		
	}

	$scope.getLocation =  function(){

		$scope.local = LocalFactory.getLocation();

		console.log($scope.local);

		$scope.dadosPerfil.placeId = $scope.local.place_id;

		Auth.set($scope.dadosPerfil);

   	$location.path($scope.dadosPerfil.rota);
	}
})