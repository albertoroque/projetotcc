
angular.module('proj.login', [])

.config(function($routeProvider) {

    $routeProvider       
        .when('/login', {
            controller: 'LoginCtrl',
            templateUrl: 'app/login/partials/login.tpl.html'
        });

    
})


.config(function($mdThemingProvider) {
    
    $mdThemingProvider.definePalette('amazingPaletteName', {
      '50': 'fff',
      '100': 'fff',
      '200': 'fff',
      '300': 'fff',
      '400': 'fff',
      '500': 'fff',
      '600': 'fff',
      '700': 'fff',
      '800': 'fff',
      '900': 'fff',
      'A100': 'fff',
      'A200': 'fff',
      'A400': 'fff',
      'A700': 'fff',
      'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                          // on this palette should be dark or light
      'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
       '200', '300', '400', 'A100'],
      'contrastLightColors': undefined    // could also specify this if default was 'dark'
    });

    $mdThemingProvider.theme('docs-dark')
      .primaryPalette('amazingPaletteName')
      .dark();
    
    $mdThemingProvider.theme('default')
      .primaryPalette('indigo')
      .accentPalette('pink');
  })

.factory("Auth", [
  "$cookieStore", function($cookieStore) {
    var conta = {};
    return {
      set: function(conta) {
        conta = conta;
        $cookieStore.put("conta", conta);
      },
      get: function() {
        conta = $cookieStore.get("conta");
        return conta;
      },
      clear: function() {
        conta = {};
        conta.isLogado = false;
        $cookieStore.remove("conta");
      }
    }
  }
])

.controller('LoginCtrl', function ($scope, $rootScope, $location, Auth,AuthService, LoginService) {        
  
  
  $scope.carregando = false;
  $scope.wait_callsession = 1;
  $scope.usersession = {};

  $scope.logar = function(user){

    var dadosConta = {};
    $scope.carregando = true;  

    console.log(user);

    LoginService.logar(user)
      .then(function(result){
                
        $scope.carregando = false;
        
        if(user.username) dadosConta.username = user.username;    
        
        if(user.password) dadosConta.password = user.password;        
        
        if(user.fbid) dadosConta.fbid = user.fbid;
        
        dadosConta.isLogado = true;        

        Auth.set(dadosConta);

        if(result.placeid){
          $location.path('/perfil/' + result.username);   
        }else{
          $location.path('/local');   
        }      
      })  
      .catch(function(result){
        $scope.carregando = false;  
        $scope.erro = 'usuário ou senha inválido';    
      })   
  }

  $scope.showlogin = function(){
    $scope.wait_callsession = 2;
  }

  $scope.callsession = function(){
    $scope.wait_callsession = 1;
    test_facesession();      
  }

  function test_facesession(){
    
    window.fbAsyncInit = function() {

      FB.init({appId:'581702775331200', cookie:true, xfbml:true, version:'v2.2'});
      
      FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {      
          
          FB.api('/me?fields=picture,name', function(response) {                    
                        
            var dadosConta = {};        
            dadosConta.fbid = response.id;                      
            dadosConta.isLogado = true;        

            Auth.set(dadosConta); 

            test_session();                                        
          })
        } else { 
          test_session();             
        }
      });
    };
  }

  function test_session(){
    console.log('test_session');
    if(Auth.get()){     
      AuthService.confirmAuth()
      .then(function(result){
        if(result.isLogado){
          $scope.wait_callsession = 3;          
          $scope.usersession = result;
          $scope.usersession.password = Auth.get().password; 
        }else{
          $scope.wait_callsession = 2;
        }
      })
      .catch(function(result){
        $scope.wait_callsession = 2;
      })  
    }else{
      $scope.wait_callsession = 2;
       
    }

    $scope.$apply();
    
  };

})