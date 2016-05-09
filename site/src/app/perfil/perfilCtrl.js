
angular.module('proj.perfil', ['ngRoute','ngMaterial'])

.config(function($routeProvider) {

    $routeProvider       
        .when('/perfil/:rota', {
            controller: 'PerfilCtrl',
            templateUrl: 'app/perfil/partials/perfil.tpl.html'
        });

    
})

.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}])

.service('MultimidiaService', function ($http, $q) {
    
    return {
    	upload: function(data) {

    	var d = $q.defer(),
	        fd = new FormData(),	        
	        url = 'http://localhost:63349/api/upload',
	        files = data.files,                    
	        $this = this;	              	   

        // var file = data.files[0];

        console.log(files);

        for (var i = 0; i < files.length; i++) {

            fd.append("file" + i, files[i]);
        }                 

        $.ajax({
	        type: 'POST',
	        url: url,
	        data: fd,
	        contentType: false,
	        processData: false,
	        cache: false,
	        
	        success: function(dados) {	            
	            d.resolve(dados);
	        },
	        error: function(dados) {
	            d.reject(dados);
	        }
	    });
      
	    return d.promise;
	}
}
    
})


//https://uncorkedstudios.com/blog/multipartformdata-file-upload-with-angularjs
//http://jsfiddle.net/JeJenny/ZG9re/

.controller('PerfilCtrl', function ($scope, $rootScope, $location, $timeout, $q, Auth, MultimidiaService) {        

	$scope.dadosPerfil = {};

	$scope.carregaPerfil= function(){
		
		$scope.dadosPerfil = Auth.get();

		console.log($scope.dadosPerfil);

		if($scope.dadosPerfil.placeId == 0){

		}else{
			$scope.dadosPerfil.local = convertePlaceIdw($scope.dadosPerfil.placeId);
		}			

		if(!$scope.dadosPerfil.isLogado){			
			$location.path('/login');
		}			
	}

	function convertePlaceIdw(placeId){
		var geocoder = new google.maps.Geocoder();
			    
	    geocoder.geocode({'placeId': placeId}, function(results, status)
	    {
	      if (status == google.maps.GeocoderStatus.OK)
	      {	        
			if (results[0])
			{   
				var icon = '<i class="fa fa-map-marker fa-lg"></i>';
				var bairro = results[0].address_components[1].long_name;
				var cidade = results[0].address_components[2].long_name;
				console.log(results[0]);
				document.getElementById("local").innerHTML = icon +' '+ bairro + ', ' + cidade;
				return results[0].formatted_address;				
			}else{

				return 'Ocorreu um erro inesperado!'
			}
		  }
	      else
	      {	        	
	        return 'Ocorreu um erro inesperado!'
	      }
	    });
	}

	$scope.logout = function(){
		Auth.clear();
		$location.path('/login');
	};

	/**
     * Função que realiza o upload das imagesn para avatar e wallpaper
     * @param {[[Type]]} element        [[Description]]
     * @param {String} scopeAttribute Variável de $scope a ser alterada
     */
    $scope.uploadDeImagem = function(element) {
        
        console.log("Carregando multimídia");

        MultimidiaService.upload(element)
            .then(function(multimidia) {
            	console.log(multimidia);                
                alert(multimidia);
            })
            .catch(function(retorno) {
                alert('ERRO');
            });          
    };

})