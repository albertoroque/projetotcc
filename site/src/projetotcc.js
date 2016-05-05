angular.module('Proj',[
  	'ngRoute',
    'ngMaterial',
    'ngCookies',
    'ngMessages',
    'proj.login',
    'proj.erro',
    'proj.local',
    'proj.timeline',
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
  
.controller('MenuCtrl', function ($scope, $rootScope, $timeout, $mdSidenav, $log) {
       
  })


.controller('SocialCtrl', function ($scope, $rootScope, Auth) {
        
  $rootScope.logado = false;

  $rootScope.contaLogada = {};
    
})

 
