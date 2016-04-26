
angular.module('proj.perfil', ['ngRoute'])

.config(function($routeProvider) {

    $routeProvider       
        .when('/perfil', {
            controller: 'PerfilCtrl',
            templateUrl: 'app/perfil/partials/perfil.tpl.html'
        });

    
})


.controller('PerfilCtrl', function ($scope, $location) {        
  
})