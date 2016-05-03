
angular.module('proj.local', ['ngRoute'])

.config(function($routeProvider) {

    $routeProvider       
      .when('/local', {
          controller: 'LocalCtrl',
          templateUrl: 'app/local/partials/local.tpl.html'
      });
})


.controller('LocalCtrl', function ($scope, $rootScope, $location) {        
  
	var geocoder;

	$scope.getLocation = function() {
			
		$scope.placeId = {};

	    if (navigator.geolocation) {
	      navigator.geolocation.getCurrentPosition($scope.codeLatLng, showError);	      
	    } else { 
	       alert ("Geolocation is not supported by this browser.");
	    }
	}

	$scope.mostraLocal =  function(result){
    $rootScope.contaLogada.placeId = result.place_id;
    $location.path($rootScope.contaLogada.rota);
	}

	$scope.codeLatLng = function(position)
	{
	    
	    geocoder = new google.maps.Geocoder();
		
	    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	    geocoder.geocode({'latLng': latlng}, function(results, status)
	    {
        if (status == google.maps.GeocoderStatus.OK)
        {	        
          if (results[0])
          {          	
          	$scope.mostraLocal(results[0]);	            		              
          }
          else
          {
            alert("A pesquisa não obteve resultados");
          }
        }
        else
        {	        	
          alert("Geocoder failed due to: " + status);
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