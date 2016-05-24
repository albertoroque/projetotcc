
angular.module('proj.perfil', [])

.config(function($routeProvider) {

    $routeProvider       
        .when('/perfil/:rota', {
            controller: 'PerfilCtrl',
            templateUrl: 'app/perfil/partials/perfil.tpl.html'
        })
        .when('/editarperfil', {
            controller: 'PerfilEdicaoCtrl',
            templateUrl: 'app/perfil/partials/edit.tpl.html'
        });

    
})


//https://uncorkedstudios.com/blog/multipartformdata-file-upload-with-angularjs
//http://jsfiddle.net/JeJenny/ZG9re/

.controller('PerfilCtrl', function ($scope, $rootScope, $mdMedia, $routeParams, $mdDialog, $location, $timeout, $q, Auth, PerfilService, LoginService, AuthService, LocalService) {        

	$scope.dadosPerfil = {};
	$scope.images = {};	
	$scope.isRoot = false;
	$scope.logado = false;
	$scope.imagePreview = {};

	

	// CARREGA PERFIL DO USUÁRIO PELA ROTA
	$scope.carregaPerfil= function(){
					
		var userRota = $routeParams.rota;

		PerfilService.carregarPerfil(userRota)
			.then(function(result){
				$scope.dadosPerfil = result;

				console.log(result);
				$scope.images = result.posts;				
				$scope.convertPlace(result.placeid);			
				verificaStatus();
			})
			.catch(function(result){
				
			})			
	}

	$scope.convertPlace = function(placeidentification){
		LocalService.convertePlaceId(placeidentification)
		.then(function(result){
			console.log(result);
			$scope.dadosPerfil.local = result;
		})		
		.catch(function(result){
			$scope.dadosPerfil.local = result;
		})		
	}

	function carregaImagens(user){
		PerfilService.carregarPerfil(user)
			.then(function(result){			
				$scope.images = result.posts;							
			})
			.catch(function(result){
				$rootScope.toast('Erro ao atualizar sua galeria');
			})	
	}

	
	function verificaStatus(){		   
		AuthService.confirmAuth()
		 .then(function(result){
		 	$scope.logado = result.isLogado;
		 	if($scope.dadosPerfil.id == result.id) $scope.isRoot = true;
		 })		 		
	}


	$scope.editar = function(){
		$location.path('/editarperfil');
	}
	
    $scope.uploadDeImagem = function(element) {        
        console.log("Carregando multimídia");
        PerfilService.upload(element)
            .then(function(multimidia) {            
            	$scope.imagePreview = multimidia;
            	$scope.previewImage();
            })
            .catch(function(retorno) {
                alert('Ops, algo deu errado ao carregar sua foto. Estamos trabalhando nisso.');
            });          
    };

    $scope.previewImage = function(){
    	   		  	    
	    $mdDialog.show({	      
	      scope: $scope, 
	      preserveScope: true,
	      templateUrl: 'app/perfil/partials/preview.tpl.html',
	      parent: angular.element(document.body),		      
	      clickOutsideToClose:false	      
	    })		    		 
    }

    $scope.gravaImagem = function(path){

    	var post = {};
    	post.url = path;
    	PerfilService.criarPost($scope.dadosPerfil.id, post)
    	.then(function(result){    	
    		console.log('CARREGADO');	
    		carregaImagens($scope.dadosPerfil.username);
    		$mdDialog.hide();
    		$rootScope.toast('Imagem publicada');

    	})
    	.catch(function(result){
    		console.log('erro', result);
    	})
    }

    $scope.cancelar = function(){
    	$mdDialog.hide();
    }

})


.controller('PerfilEdicaoCtrl', function($scope, $rootScope, $location, AuthService, Auth, LocalService, PerfilService){

	$scope.dataedit = {};

	$scope.carregando = false;
	
	$scope.carregaFormulario = function(){

		$scope.carregando = true;

		AuthService.confirmAuth()
		 .then(function(result){
		 	console.log(result);
		 	$scope.dataedit = result;
		 	$scope.convertPlace(result.placeid);
		 	$scope.carregando = false;		 
		 })
		.catch(function(result){
			$location.path('/login');
			$rootScope.toast('Você não está logado');
			$scope.carregando = false;
		})			
	
	}

	$scope.convertPlace = function(placeidentification){

		LocalService.convertePlaceId(placeidentification)
		.then(function(result){
			console.log(result);
			$scope.dataedit.local = result;
		})		
		.catch(function(result){
			
		})		

	}

	$scope.uploadDeImagem = function(element) {               

        PerfilService.upload(element)
            .then(function(multimidia) {
            	console.log(multimidia);
            	$scope.dataedit.avatar = multimidia;
            })
            .catch(function(retorno) {
                alert('Ops, algo deu errado ao carregar sua foto. Estamos trabalhando nisso.');
            });          
    };

    $scope.gotoLocal = function(){
    	$location.path('/local');
    }

    $scope.editarPerfil = function(){
    	
	  	if($scope.dataedit.nome == null || !$scope.dataedit.nome.length > 5){
	  		flag = false;  		
	      	$scope.erro = 'Seu nome tem menos de 6 caracteres';
	  	}else{
	  		PerfilService.editarPerfil($scope.dataedit)
	        .then(function(result){        
	            $location.path('perfil/' + $scope.dataedit.username);
	            $rootScope.toast('Seu perfil foi atualizado');
	        })
	        .catch(function(result){	           
	            $rootScope.toast('Ops! Ocorreu algum erro');
	        })	
	  	}		
    }
})
