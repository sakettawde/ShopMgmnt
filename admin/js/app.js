var myApp = angular.module('myApp', ['ui.router', 'ui.bootstrap', 'ngMessages','angularUtils.directives.dirPagination','app.services','720kb.datepicker'])
.constant('p_const', {

	api: ( window.location.hostname == '146.148.40.15' ? 'http://146.148.40.15/api/' : 'http://localhost:8090/api/'),
  
	
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider  ) {
  $stateProvider
   .state("home", {
    url: "/login",
    templateUrl: "templates/home.html",
    controller:"homeCtrl"
  })

   .state("register", {
    url: "/register",
    templateUrl: "templates/register.html",
    controller:"regCtrl"
  })

  .state("fpass", {
    url: "/forgot_password",
    templateUrl: "templates/fpass.html",
    controller:"fpassCtrl"
  })

  .state("shop", {
    url: "/shop",
    templateUrl: "templates/shop.html",
    controller:"shopCtrl"
  })

  .state("addshop", {
    url: "/addshop",
    templateUrl: "templates/add_shop.html",
    controller:"shopCtrl"
  })

  .state("editshop", {
    url: "/editshop/:shop_id",
    templateUrl: "templates/edit_shop.html",
    controller:"editshopCtrl"
  })

  .state("user", {
    url: "/user",
    templateUrl: "templates/user.html",
    controller:"userCtrl"
  })
  
  .state("adduser", {
    url: "/adduser",
    templateUrl: "templates/add_user.html",
    controller:"userCtrl"
  })
  
  .state("edituser", {
    url: "/edituser/:user_id",
    templateUrl: "templates/edit_user.html",
    controller:"edituserCtrl"
  })

  .state("vendor", {
    url: "/vendor",
    templateUrl: "templates/vendor.html",
    controller:"vendorCtrl"
  })

  .state("addvendor", {
    url: "/addvendor",
    templateUrl: "templates/add_vendor.html",
    controller:"vendorCtrl"
  })

  .state("editvendor", {
    url: "/editvendor/:v_id",
    templateUrl: "templates/edit_vendor.html",
    controller:"editvendorCtrl"
  })

  
  


  $urlRouterProvider.otherwise('home');
  //$httpProvider.interceptors.push('validatesession');

})

// .factory('validatesession', function( $injector ) {
//     var validatesession = {
//         request: function(config) {
//           if (config.url.substr(config.url.length - 5) == '.html') {
//             // console.log(config.url);
//           } else if (  window.localStorage.getItem('user_data') ) {
//             var userdata = JSON.parse( window.localStorage.getItem('user_data'));
//             config.headers.authorization = userdata.user_id;
//           }
//           return config;
//         },
//         responseError : function(response) {
//             if( response.status == 401 ){
//               $state = $injector.get('$state');
//               $state.go('home');
//             } else {
//               return response;

//             }
//         }
//     };
//     return validatesession;
// })



