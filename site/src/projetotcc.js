angular

.module('Proj',[
  	'ngRoute',
    'ngMaterial',
    'ngCookies',
    'ngMessages'
  	])

// .config([
//     '$routeProvider', '$httpProvider',
//     function($routeProvider, $httpProvider) {

//         // Permitindo CORS
//         $httpProvider.defaults.useXDomain = true;
//         delete $httpProvider.defaults.headers.common['X-Requested-With'];

//         $routeProvider
//             .when('/', {
//                 redirectTo: '/home'
//             })
//             .otherwise({
//                 redirectTo: '/erro/404'
//             });

//             }
//         ])

// .controller('LoginCtrl',[])