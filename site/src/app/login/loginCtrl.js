
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

    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('amazingPaletteName')
      .dark();

  })

.controller('LoginCtrl', function ($scope) {        
  console.log('LOGIN CARREGADO');      
})