/**
 * Created by rmupfumira on 2015-07-13.
 */
'use strict';
/**
 * controller for Login
 */


app.controller('LoginCtrl', function ($scope, $state,SweetAlert,Members,$filter,$localStorage,Auth) {

    $scope.login = function(form){
        if(form.$invalid){
           SweetAlert.swal("Log in failed!", "Please fill in username and password", "error");
        }else{
            SweetAlert.swal("OK!", "Welcome back!", "success");
            $state.go("app.dashboard");
          /* var user =  Auth.login($scope.user);
           if(user === null){
               SweetAlert.swal("Log in failed!", "Invalid login details specified", "error");
           }else{
               //$localStorage.user = user;
              // $state.go("app.dashboard");
           }*/
        }
    }

});
