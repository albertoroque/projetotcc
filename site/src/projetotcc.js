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

.service("LocalFactory", function(){
  
    return{
      getLocation: function(){
                
        if (navigator.geolocation) {
          return navigator.geolocation.getCurrentPosition(codeLatLng, showError);       
        } else { 
          alert ("Geolocation is not supported by this browser.");
        }
      }
    }

    function codeLatLng(position)
    {
      var geocoder = new google.maps.Geocoder();
    
      var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      geocoder.geocode({'latLng': latlng}, function(results, status)
      {
        if (status == google.maps.GeocoderStatus.OK)
        {         
          if (results[0])
          {                 
            console.log(results[0].place_id);
            return results[0].place_id;                               
          }
          else
          {
             return "A pesquisa não obteve resultados";
          }
        }
        else
        {           
          return "Geocoder failed due to: " + status;
        }
      });
    }


    function showError(error) {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          return "Permissão negada!"
          break;
        case error.POSITION_UNAVAILABLE:
          return "O local informado parece não ser real"
          break;
        case error.TIMEOUT:
          return "Ops, algum erro aconteceu, verifique sua internet"
          break;
        case error.UNKNOWN_ERROR:
          return "Ops, algum erro aconteceu"
          break;
      }
    }
})


  
.controller('MenuCtrl', function ($scope, $rootScope, $timeout, $mdSidenav, $log) {
       
  })


.controller('SocialCtrl', function ($scope, $rootScope, Auth) {
        
  $rootScope.logado = false;

  $rootScope.contaLogada = {};
    
})

 
