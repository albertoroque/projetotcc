

angular.module('proj.perfil')

.service('PerfilService', function ($http, $q) {    
	var serverstatic = "http://localhost:63349/api/v1";
	var serversocial = "http://localhost:51698/projetotcc/api/";

    return {
    	upload: function(data) {

    	var d = $q.defer(),
	        fd = new FormData(),	        
	        url = 'http://localhost:63349/api/upload',
	        files = data.files,                    
	        $this = this;	              	                

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
	},

	carregarPerfil : function(username){

		var d = $q.defer(),
		url = serversocial + 'users/' + username; 

		$http.get(url)
		.success(function(result){
			d.resolve(result);
		})
		.error(function(result){
			d.reject(result);
		});

		return d.promise;
	},
	

	editarPerfil : function(userdata){

		var d = $q.defer(),
		url = serversocial + 'users/' + userdata.id;

		console.log(userdata);

		$http.put(url, userdata)
		.success(function(result){

			d.resolve(result);
		})
		.error(function(result){
			d.reject(result);
		});

		return d.promise;
	},

	criarPost : function(iduser, post){

		var d = $q.defer(),
		url = serversocial + 'users/' + iduser + '/posts'; 

		$http.post(url, post)
		.success(function(result){
			d.resolve(result);
		})
		.error(function(result){
			d.reject(result);
		});

		return d.promise;
	}
}
    
})