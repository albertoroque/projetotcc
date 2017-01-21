$( document ).ready(function() {
    

    // Create variables (in this scope) to hold the API and image size
	var jcrop_api, boundx, boundy;
	var coords;
	
	var width_cropper = document.getElementById("canvasToThumb").width;

	var canvas = document.createElement("canvas");   
	var context = canvas.getContext("2d");


	//EXECUTE
	imgToCanvas();

	function showCoords(c) { // show all coords	    
	    coords = c;
	}

	function imgToCanvas(){

		console.warn('CALLED');

		var imageDOM = document.getElementById("canvasToThumb"), imgA = $("#canvasToThumb");

		img = new Image();

    	img.src = imageDOM.src;			
		
		console.log(imgA);

		img.onload = function(){
			canvas.width = img.width;  
			canvas.height =  img.height; 
		  	context.drawImage(img, 0, 0);
		  	
			var dataURI = canvas.toDataURL();		
			img.src = dataURI;		
		}		
	}

	//CARREGA JCROP
	$("#loadJcrop").on("click", function(){			  
		$('.thumbnail-img').Jcrop({	    
		    onSelect: showCoords,
		    bgFade: true,
		    bgOpacity: .3,
		    setSelect: [ width_cropper, 0, 0, 0 ],	   
		    aspectRatio: 4
		},function(){	    	       
	      jcrop_api = this;     
		});

	});

	//FUNCTION: ESCONDE EDIÇÃO COM AÇÃO DO BOTÃO
	$("#hideJcrop").on("click", function(){			  
		hideJcrop();
	});


	//FUNCTION: ESCONDE FERRRAMENTA DE EDIÇÃO
	function hideJcrop(){		
		if(jcrop_api){
			jcrop_api.destroy();
			$('.imgToThumb .thumbnail-img').removeAttr('style');
			$('.imgToThumb .jcrop-holder').remove();
			width_cropper = document.getElementById("canvasToThumb").width;        		
    	}
	};

	//FUNCTION:ON RESIZE DESLIGA A FERRAMENTA DE EDIÇÃO
	$(window).resize(function(){
		hideJcrop();
		console.log('RESIZE');	 
	});

	$("#crop").on("click", function(){
	    	    	   
	    var img = document.getElementById("canvasToThumb"),	    	    	
	    	$img = $(img),
		    imgW = img.width, 
		   	imgH = img.height;	
	    
	    var rY = imgH / $img.height(),
	        rX = imgW / $img.width();
                
        canvas.width = coords.w;  
        canvas.height =  coords.h;  

	    context.drawImage(img, (coords.x * rX), (coords.y * rY), (coords.w * rX), (coords.h * rY), 0, 0, canvas.width, canvas.height);

		hideJcrop();

		var dataURI = context.canvas.toDataURL("image/jpg");
		
		img.src = dataURI;

	   	//{ todo }
	   	// 1 - converter imagem para FILE BLOB com function dataURItoBlob(this.dataURI) 
	   	// 2 - enviar retorno de dataURItoBlob para uploadImage(fileBlob)
       	    	  	 
	});


	//{ TODO }
	//SEND IMAGE FROM SERVER
	$("#sendImage").on("click", function(){

		var dataURI = context.canvas.toDataURL("image/jpg");

		var fileBlob = dataURItoBlob(dataURI);

		console.log(fileBlob);

		//FORM DATA
	    var data = new FormData();
	    data.append("file", fileBlob);

	    //STATIC S9
	    fileUploaderUrl = fileUploaderUrl + "?token=" + token;

	    //AJAX UP IMG
	    $.ajax({
	        type: "POST",
	        url: fileUploaderUrl,
	        contentType: false,
	        processData: false,
	        cache: false,
	        data: data, //imagem renderizada
	        success: function (messages) {
	            var str_filename = ""
	            for (i = 0; i < messages.length; i++) {
	                str_filename = messages[i].Path;
	            }

	            $.getJSON(urlPreview,
	                {
	                    idCard: card.val(),
	                    filename: str_filename,
	                    jsonResult: true
	                },
	                function (data) {
	                    presentationDefinitionContent.html(data.message);
	                });
	        },
	        error: function (jqXHR, textStatus, err) {
	            console.log(jqXHR);
	            console.log(textStatus);
	            console.log(err);	           
	        }
	    });
	});


	function dataURItoBlob(dataURI) {
	    // convert base64/URLEncoded data component to raw binary data held in a string
	    var byteString;
	    if (dataURI.split(',')[0].indexOf('base64') >= 0)
	        byteString = atob(dataURI.split(',')[1]);
	    else
	        byteString = unescape(dataURI.split(',')[1]);

	    // separate out the mime component
	    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

	    // write the bytes of the string to a typed array
	    var ia = new Uint8Array(byteString.length);
	    for (var i = 0; i < byteString.length; i++) {
	        ia[i] = byteString.charCodeAt(i);
	    }

	    return new Blob([ia], {type:mimeString});
	}


//END
});
	