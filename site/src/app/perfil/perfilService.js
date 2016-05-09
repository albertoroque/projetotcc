

angular.module('proj.perfil')

.service('PerfilService', function ($http, $q) {
    
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
	}
}
    
})