
angular.module('proj.login', ['ngRoute','ngAnimate'])

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

 

.controller('LoginCtrl', function ($scope, $rootScope, $location) {        
  

  $scope.logar = function(user){
    

    if(user.name == 'alberto' && user.senha == '123456'){
      $location.path('/local');
      $rootScope.logado = true;

      $rootScope.contaLogada.nome = 'Alberto';
      $rootScope.contaLogada.avatar = 'https://lh3.googleusercontent.com/5pySG2VRXgi2JwvbolQmod2D9by_Q2DXymR4O9ErqYXD4K1GrswdGAd78SI1LJozAYnmOqgITw=w2324-h1307-rw-no';
      $rootScope.contaLogada.rota = 'perfil/'+'alberto';

    }

  }
})