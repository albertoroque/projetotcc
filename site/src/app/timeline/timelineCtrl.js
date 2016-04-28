
angular.module('proj.timeline', ['ngRoute'])

.config(function($routeProvider) {

    $routeProvider       
        .when('/erro/404', {
            controller: 'TimelineCtrl',
            templateUrl: 'app/timeline/partials/timeline.tpl.html'
        });

    
})


.controller('TimelineCtrl', function ($scope, $location) {        
  
})