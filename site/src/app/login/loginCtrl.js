
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

.controller('LoginCtrl', function ($scope, $rootScope, $location, Auth, LoginService) {        
  
  
  $scope.carregando = false;

  $scope.logar = function(user){

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
        $scope.erro = 'usuário ou senha inválido';    
      })   
  }
})