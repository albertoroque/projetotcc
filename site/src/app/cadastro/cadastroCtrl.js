
angular.module('proj.cadastro', [])

.config(function($routeProvider) {

    $routeProvider       
        .when('/cadastro', {
            controller: 'CadastroCtrl',
            templateUrl: 'app/cadastro/partials/cadastro.tpl.html'
        });

    
})


.controller('CadastroCtrl', function ($scope, $location, CadastroService) {        
  
  $scope.cadastrar = function(cad){
  	console.log(cad);
  	var flag = true;
  	
  	if(!cad.username.length > 3){
  		flag = false;
  	}	

  	if(!cad.password.length > 6){
  		flag = false;
  	}

  	if(!cad.nome.length > 5){
  		flag = false;
  	}

  	if(flag){
  		CadastroService.cadastrar(cad)
  		.then( function(result){
  			console.log(result);
  			//LOGAR PERFIL DA PESSOA
  		})	
  		.catch(function(result){
  			console.log(result);
  		})
  	}  	

  	
  }
})