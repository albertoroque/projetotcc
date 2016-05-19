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


.controller('SocialCtrl', function ($scope, $rootScope, $mdToast, Auth) {
    
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

})


  
.controller('MenuCtrl', function ($scope, $rootScope, $timeout, $mdSidenav, $log) {
       
  })


 
