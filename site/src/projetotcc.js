angular.module('Proj',[
  	'ngRoute',
    'ngMaterial',
    'ngCookies',
    'ngMessages',
    'proj.login'
  	])

.config([
  '$routeProvider', '$httpProvider',
  function($routeProvider, $httpProvider) {

    // Permitindo CORS
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

      $routeProvider
        .when('/login', {
            redirectTo: '/login'
        })
        .otherwise({
            redirectTo: '/erro/404'
        });
    }
  ])


  
.controller('MenuCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    
    $scope.close = function () {
      $mdSidenav('left').close()
    };

    $scope.toggleLeft = buildToggler('left');    

    function buildToggler(navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID).toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }
    }
  })


.controller('SocialCtrl', function ($scope) {
        
  $scope.logado = false;

  console.log('carregado');
    
})

 