
angular.module('proj.cadastro', [])

.config(function($routeProvider) {

    $routeProvider       
        .when('/cadastro', {
            controller: 'CadastroCtrl',
            templateUrl: 'app/cadastro/partials/cadastro.tpl.html'
        });  
})


.controller('CadastroCtrl', function ($scope, $rootScope, $location, $mdToast, CadastroService, LoginService, Auth) {        
  
  $scope.carregando = false;
  $scope.erro = "";
  $scope.status_face_data = false;

  var face_data = {};

  $scope.cadastrar = function(cad){  	
  	var flag = true;
  	$scope.carregando = true;
  	
  	if(cad.username == null || !cad.username.length > 3){
  		flag = false;  		
      $scope.erro = 'Nome da conta deve ter 3 caracteres no mínimo';
  	}	

  	if(cad.password == null || !cad.password.length > 6){
  		flag = false;  		
      $scope.erro = 'Senha tem menos de 6 caracteres';
  	}

  	if(cad.nome == null || !cad.nome.length > 5){
  		flag = false;  		
      $scope.erro = 'Seu nome tem menos de 6 caracteres';
  	}

  	if(flag){

      cad.avatar = '/img/default.png';
      cadastrarFunc(cad);

  	}else{
  		$scope.carregando = false; 
  	}  	  
  }


  function cadastrarFunc(cad){
            
    CadastroService.cadastrar(cad)
    .then(function(result){       
      $scope.carregando = false;  
      logar(cad);
    })  

    .catch(function(result){
      $scope.carregando = false;        
      if(result == null) result = 'Ops, algo de errado aconteceu!'        
      $rootScope.toast(result.Message);        
    })
  }


  function logar(user){

    var dadosConta = {};
    $scope.carregando = true;  

    LoginService.logar(user)
      .then(function(result){
                
        $scope.carregando = false;
        
        dadosConta.username = user.username;  
        dadosConta.password = user.password;
        dadosConta.fbid = user.fbid;                      
        dadosConta.isLogado = true;        

        Auth.set(dadosConta);

        $location.path('/local');   
      })  

      .catch(function(result){
        $scope.carregando = false;          
      })   
  }

  $scope.cadastraFace = function(){

    var dadoscad = {};

    dadoscad.avatar = face_data.picture.data.url;
    dadoscad.nome = face_data.name;

    dadoscad.username = 'p' + face_data.id;

    //GERAR PASSWORD ALEATÓRIO SEGURAM NÃO USANDO ID
    //dadoscad.password = face_data.id;

    dadoscad.fbid = face_data.id;  

    $scope.carregando = true;

    cadastrarFunc(dadoscad);
  }


  // ------------------------------
  // FACEBOOK INIT
  // ------------------------------

  //FACEBOOKASYNCINIT
  window.fbAsyncInit = function() {

    FB.init({
      appId      : '581702775331200',
      cookie     : true,  // enable cookies to allow the server to access 
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.2' // use version 2.2
    });
    
    FB.getLoginStatus(function(response) {
      $scope.statusChangeCallback(response);
    });
  };

  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) 
      return;
    js = d.createElement(s); 
    js.id = id;
    js.src = "//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.6&appId=581702775331200";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // CHECKLOGINSTATE
  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  window.checkLoginState = function() {
    FB.getLoginStatus(
      function(response) {
        $scope.statusChangeCallback(response);
      });
  }

  // STATUSCHANGECALLBACK
  // This is called with the results from from FB.getLoginStatus().
  $scope.statusChangeCallback = function(response) {
        
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().    
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      Source();
      //console.log('token = ' + response.authResponse.accessToken);

    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      console.log('Você não autorizou o aplicativo obter seus dados');

    }else{
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      console.log('Você não está logado');
    }
  }



  // SOURCE
  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function Source() {    
    FB.api('/me?fields=picture,name', function(response) {                    
      face_data = response;
      console.log(face_data);      
      $scope.status_face_data = true; 
      $scope.$apply();                          
    });
  }




})