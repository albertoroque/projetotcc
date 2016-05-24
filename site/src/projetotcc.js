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
      

      if(dadosConta != null){
        var user = {};    
        user.username = dadosConta.username;
        user.password = dadosConta.password;
        user.fbid = dadosConta.fbid;  
      }
                
      LoginService.logar(user)
        .then(function(result){                                      
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

.service('LocalService', ['$http','$q', 
  function($http, $q){

    return{

      convertePlaceId : function(placeId){

        var d = $q.defer();

        var geocoder = new google.maps.Geocoder();
            
        geocoder.geocode({'placeId': placeId}, function(results, status)
        {
          if (status == google.maps.GeocoderStatus.OK)
          {  
                  
            if (results[0])
            {   
              // var icon = '<i class="fa fa-map-marker fa-lg"></i>&nbsp;';
              // var bairro = results[0].address_components[1].long_name;
              // var cidade = results[0].address_components[2].long_name;      
              
              d.resolve(results[0].formatted_address);        
              
            }else{
              d.resolve('Erro ao obter a localização');
            }
          } 
          else
          {           
            d.resolve('Erro ao obter a localização');
          }
        })

        return d.promise;
      }


    }//END RETURN LOCALSERVICE
}])

.controller('SocialCtrl', function ($scope, $rootScope, $mdToast, $location, Auth, LoginService, AuthService) {
    

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
      $rootScope.toast('Você não está logado');
      return false;
    }) 
  }



})


  
.controller('MenuCtrl', function ($scope, $rootScope, $timeout, $mdSidenav, $log) {
       
})





 
