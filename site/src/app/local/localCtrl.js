
angular.module('proj.local', ['ngRoute'])

.config(function($routeProvider) {

    $routeProvider       
        .when('/local', {
            controller: 'LocalCtrl',
            templateUrl: 'app/local/partials/local.tpl.html'
        });

    
})


.controller('LocalCtrl', function ($scope, $location) {        
  
})