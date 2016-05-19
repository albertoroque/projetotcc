
angular.module('proj.cadastro', [])

.config(function($routeProvider) {

    $routeProvider       
        .when('/cadastro', {
            controller: 'CadastroCtrl',
            templateUrl: 'app/cadastro/partials/cadastro.tpl.html'
        });

    
})


.controller('CadastroCtrl', function ($scope, $rootScope, $location, $mdToast, CadastroService, LoginService) {        
  
  $scope.carregando = false;

  $scope.cadastrar = function(cad){
  	console.log(cad);
  	var flag = true;
  	$scope.carregando = true;
  	
  	if(cad.username == null|| !cad.username.length > 3){
  		flag = false;
  		$rootScope.toast('Nome da conta deve ter 3 caracteres no mínimo');
  	}	

  	if(cad.password == null || !cad.password.length > 6){
  		flag = false;
  		$rootScope.toast('Senha tem menos de 6 caracteres');
  	}

  	if(cad.nome == null || !cad.nome.length > 5){
  		flag = false;
  		$rootScope.toast('Seu nome tem menos de 6 caracteres');
  	}

  	if(flag){
  		CadastroService.cadastrar(cad)
  		.then( function(result){
  			console.log(result);
  			$scope.carregando = false;  	
  		})	
  		.catch(function(result){

  			$scope.carregando = false;

  			$rootScope.toast('Serviço indisponível');
  		})
  	}else{
  		$scope.carregando = false; 
  	}  	

  	
  }
})