
angular.module('proj.cadastro', [])

.config(function($routeProvider) {

    $routeProvider       
        .when('/cadastro', {
            controller: 'CadastroCtrl',
            templateUrl: 'app/cadastro/partials/cadastro.tpl.html'
        });  
})


.controller('CadastroCtrl', function ($scope, $rootScope, $location, $mdToast, CadastroService, LoginService, Auth) {        
  
  $scope.carregando = false;
  $scope.erro = "";

  $scope.cadastrar = function(cad){  	
  	var flag = true;
  	$scope.carregando = true;
  	
  	if(cad.username == null || !cad.username.length > 3){
  		flag = false;  		
      $scope.erro = 'Nome da conta deve ter 3 caracteres no mínimo';
  	}	

  	if(cad.password == null || !cad.password.length > 6){
  		flag = false;  		
      $scope.erro = 'Senha tem menos de 6 caracteres';
  	}

  	if(cad.nome == null || !cad.nome.length > 5){
  		flag = false;  		
      $scope.erro = 'Seu nome tem menos de 6 caracteres';
  	}

  	if(flag){

      cad.avatar = '/img/default.png';

  		CadastroService.cadastrar(cad)
  		.then(function(result){  			
  			$scope.carregando = false;  
        logar(cad);
  		})	

  		.catch(function(result){
  			$scope.carregando = false;
        console.log(result);

        if(result == null) result = 'Ops, algo de errado aconteceu!'
  			
        $rootScope.toast(result.Message);        

  		})

  	}else{
  		$scope.carregando = false; 
  	}  	  
  }


  function logar(user){

    var dadosConta = {};
    $scope.carregando = true;  

    LoginService.logar(user)
      .then(function(result){
                
        $scope.carregando = false;
        
        dadosConta.username = user.username;  
        dadosConta.password = user.password;                      
        dadosConta.isLogado = true;        

        Auth.set(dadosConta);

        $location.path('/local');   
      })  

      .catch(function(result){
        $scope.carregando = false;          
      })   
  }


})