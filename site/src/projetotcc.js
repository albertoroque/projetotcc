angular.module('Proj',[
  	'ngRoute',
    'ngMaterial',
    'ngCookies',
    'ngMessages',
    'proj.login',
    'proj.erro',
    'proj.local',
    'proj.timeline',
    'proj.cadastro',
    'proj.perfil'
  	])

.config([
  '$routeProvider', '$httpProvider',
  function($routeProvider, $httpProvider) {

    //Permitindo CORS
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

      $routeProvider
        .when('/', {
            redirectTo: '/login'
        })
        .otherwise({
            redirectTo: '/erro/404'
        });
    }
  ])


.service('AuthService', function($http, $q, $rootScope, LoginService, Auth){

  return {

    confirmAuth : function(){

      var d = $q.defer();

      var dadosConta = Auth.get();
      
      var user = {}
      user.username = dadosConta.username;
      user.password = dadosConta.password;  
      
      
      LoginService.logar(user)
        .then(function(result){                            
          $rootScope.toast('Logado como ' + result.nome);
          result.isLogado = true;
          d.resolve(result);        
        }) 

        .catch(function(result){        
          result.isLogado = false
          d.resolve(result);
      });

      return d.promise;
    }
  }

})

.controller('SocialCtrl', function ($scope, $rootScope, $mdToast, $location, Auth, LoginService, AuthService) {
    
  var dadosConta = {};

  $rootScope.toast = function(conteudo) {
    var position = {
      bottom: true,
      top: false,
      left: true,
      right: false
    };
      $mdToast.show(
        $mdToast.simple()
          .content(conteudo)              
          .position(position)
          .hideDelay(3000)
      );
    };


  $rootScope.logout = function(){
    Auth.clear();
    $location.path('/login');
    $rootScope.toast('Você acabou de sair')
  };



  $rootScope.gotoMyProfile = function(){    
    AuthService.confirmAuth()
    .then(function(result){
      console.log(result);
      $location.path('/perfil/'+ result.username);
    })  
    .catch(function(result){
      $rootScope.toast('Você não está logado')
      $location.path('/login');
    })      
  }


  $rootScope.logado = function(){
    
    AuthService.confirmAuth()
    .then(function(result){
      if(result.isLogado){
        return true;  
      }else{
        return false;
      }
      
    })  
    .catch(function(result){
      $rootScope.toast('Você não está logado')
      return false;
    }) 
  }


})


  
.controller('MenuCtrl', function ($scope, $rootScope, $timeout, $mdSidenav, $log) {
       
})


 
