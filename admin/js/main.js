angular.module('myApp')


.controller('homeCtrl', function ($uibModal, $scope, $http, p_const , $stateParams,$state, AuthService,$rootScope){

  $rootScope.hideit = true;
  
  $scope.user_data = {
      user_name:'',
      user_pass:''
    }
//$scope.$emit('LOAD')
 $scope.sign_in = function(){
       AuthService.loginApp($scope.user_data).then(function(response){
            window.localStorage.setItem('user_id',response.user_id);
            $scope.message=response.message;
            $state.go('shop');
       }, function(err){
         console.log(err);
           $scope.message = err;
       });
    };


})


.controller('fpassCtrl', function ($uibModal, $scope, $http, p_const , $stateParams, $state,AuthService){

  $scope.fpass_data = {
      email_address:''
    }

   $scope.fpass = function(){
      AuthService.fpassApp($scope.fpass_data);
    };
})

.controller('navCtrl', function ($uibModal, $scope, $http, p_const , $stateParams, $state,AuthService){
  $scope.logout = function(){
      AuthService.logout();
      $state.go('home');
    };
})


.controller('shopCtrl', function ($uibModal, $scope, $http, p_const , $stateParams, $state,ShopDetails,$rootScope){
  $rootScope.hideit = false;
  $scope.shop_data = {
      shop_name : '',
      shop_owner: '',
      shop_number :'',
      shop_add :'',
      shop_tinno :''
    }


  $scope.add_shop = function(){
      ShopDetails.add_new($scope.shop_data).success(function( response ){
        $scope.message=response.message;
        $state.go('shop');
      });
    };

    ShopDetails.list().success(function( response ){
        $scope.list = response.records;
        console.log($scope.list);
      });

  $scope.delete= function(shop_data){
   ShopDetails.delete(shop_data).success(function(response){
      $scope.shop_data = shop_data;
      $scope.list.splice($scope.list.indexOf($scope.shop_data), 1);
    });
  };

})

.controller('editshopCtrl', function ($uibModal, $scope, $http, p_const , $stateParams, $state,ShopDetails,$rootScope) {
   $rootScope.hideit = false;
   $scope.s_info = {
    shop_id:$stateParams.shop_id
  }

console.log($stateParams.shop_id);
  $scope.call_shop_details = function(){
    ShopDetails.call_details($scope.s_info).success(function( response ){
      $scope.shop_data = response.records;
    });
  };

  $scope.update = function(){
   console.log( $scope.shop_data );
   // call api
    ShopDetails.edit_shop($scope.shop_data).success(function( response ){
      $scope.message=response.message;
      console.log($scope.message);
    });
  };

})

.controller('userCtrl', function ($uibModal, $scope, $http, p_const , $stateParams, $state,UserDetails,$rootScope){
  $rootScope.hideit = false;

  UserDetails.list().success(function( response ){
        $scope.user_list = response.records;
        console.log($scope.user_list);
      });

  $scope.user_data = {
      user_name : '',
      user_mobile: '',
      role:'',
      email_id :''
    }


  $scope.add_user = function(){
      UserDetails.add_new($scope.user_data).success(function( response ){
        $scope.message=response.message;
        $state.go('user');
      });
    };

    $scope.delete= function(user_data){
    UserDetails.delete(user_data).success(function(response){
      $scope.user_data = user_data;
      $scope.user_list.splice($scope.user_list.indexOf($scope.user_data), 1);
      $scope.message=response.message;
    });
  };

})

.controller('edituserCtrl', function ($uibModal, $scope, $http, p_const , $stateParams, $state,UserDetails,$rootScope) {
  $rootScope.hideit = false;
   $scope.u_info = {
    user_id:$stateParams.user_id
  }

console.log($stateParams.user_id);
  $scope.call_user_details = function(){
    UserDetails.call_details($scope.u_info).success(function( response ){
      $scope.user_data = response.records;
    });
  };

$scope.update = function(){
   console.log( $scope.user_data );
   // call api
    UserDetails.edit_user($scope.user_data).success(function( response ){
      $scope.message=response.message;
      console.log($scope.message);
    });
  };

 })


.controller('vendorCtrl', function ($uibModal, $scope, $http, p_const , $stateParams, $state,VendorDetails,$rootScope){
  $rootScope.hideit = false;
  $scope.vendor_data = {
      v_name : '',
      address: '',
      mobile_no :'',
      email_id :''
    }


  $scope.add_vendor = function(){
      VendorDetails.add_new($scope.vendor_data).success(function( response ){
        $scope.message=response.message;
        $state.go('vendor');
      });
    };

    VendorDetails.list().success(function( response ){
        $scope.list = response.records;
        console.log($scope.list);
      });

  $scope.delete= function(vendor_data){
   VendorDetails.delete(vendor_data).success(function(response){
      $scope.vendor_data = vendor_data;
      $scope.list.splice($scope.list.indexOf($scope.vendor_data), 1);
    });
  };

})


.controller('editvendorCtrl', function ($uibModal, $scope, $http, p_const , $stateParams, $state,VendorDetails,$rootScope) {
  $rootScope.hideit = false;
   $scope.v_info = {
    v_id:$stateParams.v_id
  }

console.log($stateParams.v_id);
  $scope.call_vendor_details = function(){
    VendorDetails.call_details($scope.v_info).success(function( response ){
      $scope.vendor_data = response.records;
    });
  };

$scope.update = function(){
   console.log( $scope.vendor_data );
   // call api
    VendorDetails.edit_vendor($scope.vendor_data).success(function( response ){
      $scope.message=response.message;
      console.log($scope.message);
    });
  };

 })


