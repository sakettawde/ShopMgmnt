var app = angular.module('app.services',[])
.constant('p_const', {
  api:'http://localhost:8090/api/'
})


app.factory('AuthService', function($q, $http,$state,p_const) {
  var LOCAL_TOKEN_KEY = "shop";
  var user_id = '';
  var username = '';
  var email = '';
  var name = '';

  var isAuthenticated = false;
  var role = '';
  var authToken;

  function loadUserCredentials() {
    //var user = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    var user = window.localStorage.getItem('user_data');
    if (user) {
      var user = JSON.parse( user );
      useCredentials( user );
    }
  }

  function storeUserCredentials(user) {
        window.localStorage.setItem( 'user_data', JSON.stringify(user) );
        useCredentials(user);
  }

  function useCredentials(user) {
    user_id  = user.user_id;
    username = user.username;
    email    = user.email;
    name     = user.firstname+' '+user.lastname;

    isAuthenticated = true;
    authToken = JSON.stringify(user);
    //$http.defaults.headers.common['X-Auth-Token'] = JSON.stringify(user);
  }

  function destroyUserCredentials() {
    authToken = undefined;

    user_id       = '';
    username = '';
    email    = '';
    name     = '';

    isAuthenticated = false;
    console.log('logout service');
    //$http.defaults.headers.common['X-Auth-Token'] = undefined;
    window.localStorage.removeItem('user_data');
  }


  var loginApp = function(user_data){
    return $q(function(resolve, reject){
      //loader.show();
    // call api
      $http.post(p_const.api + 'user/sign_in', user_data )
      .success(function(res,req){
        if( res.error ){
          //loader.hide();
          reject( res.message );
        } else {
          //loader.hide();
          storeUserCredentials(res.records);
          resolve ( res.records);
        }
      }).error( function(res,req){
      //loader.hide();
        reject( res.message);
      });
    });
  };


var fpassApp = function(fpass_data){
    return $q(function(resolve, reject){

    $http.post(p_const.api + 'user_admin/forget_password', fpass_data )
    .success(function(res,req){
       if( res.error){
          reject( res.message);
       } else {
          $state.go('home');
       }
      });
    });
  };


var isAuthorized = function(authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
  };

  var logout = function() {
    destroyUserCredentials();
  };


  // loadUserCredentials();
  return {
    logout: logout,
    isAuthorized: isAuthorized,
    loginApp: loginApp,
    fpassApp: fpassApp,

    isAuthenticated: function() {return isAuthenticated;},
    id: function() {return id;},
    name: function() {return name;},
    username: function() {return username;},
    email: function() {return email;},
    authToken: function() {return authToken;},
    role: function() {return role;}
  };

});

app.factory('ShopDetails', function( $http, p_const) {
	return{
		add_new:function(shop_data){
			return $http.post(p_const.api+ 'shop/create_new' , shop_data);
		},
		list: function( ) {
      		return $http.get(p_const.api + 'shop/list' );
    	},
    	call_details:function(shop_id){
	      return $http.post( p_const.api+'shop/shop_info', shop_id );
	    },
	    edit_shop:function(shop_data){
			return $http.post(p_const.api+ 'shop/edit', shop_data );
		},
		delete:function(shop_data){
			return $http.post( p_const.api+'shop/delete', shop_data );
		},
	}
});


app.factory('UserDetails', function( $http, p_const) {
	return{
		add_new:function(user_data){
			return $http.post(p_const.api+ 'user/create_new' , user_data);
		},
		list: function( ) {
      		return $http.get(p_const.api + 'user/list' );
    	},
    	call_details:function(user_id){
	      return $http.post( p_const.api+'user/user_info', user_id );
	    },
	    edit_user:function(user_data){
			return $http.post(p_const.api+ 'user/edit', user_data );
		},
		delete:function(user_data){
			return $http.post( p_const.api+'user/delete', user_data );
		},
	}
});


app.factory('VendorDetails', function( $http, p_const) {
  return{
    add_new:function(vendor_data){
      return $http.post(p_const.api+ 'vendor/create_new' , vendor_data);
    },
    list: function( ) {
          return $http.get(p_const.api + 'vendor/list' );
      },
      call_details:function(v_id){
        return $http.post( p_const.api+'vendor/vendor_info', v_id );
      },
      edit_vendor:function(vendor_data){
      return $http.post(p_const.api+ 'vendor/edit', vendor_data );
    },
    delete:function(vendor_data){
      return $http.post( p_const.api+'vendor/delete', vendor_data );
    },
  }
});

