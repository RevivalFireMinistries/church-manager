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
            var user = $localStorage.user;
            if(!angular.isDefined(user)){
                Auth.login($scope.user).then(function (user) {
                    $localStorage.user = user;
                    $state.go("app.dashboard");
                    SweetAlert.swal("Success", "Welcome "+user.username, "success");
                }, function () {
                    SweetAlert.swal("Log in failed!", "Wrong username and password", "error");
                });
            }else{
                $state.go("app.dashboard");
                SweetAlert.swal("Success", "Welcome Back : "+user.username, "success");
            }


        }
    }

    $scope.doLogin = function() {
        waitingDialog.show('Please Wait...');
        Auth.getUser($scope.user, function (response) {
            if (response.status == 0 && response.user != null) {
                $state.go("app.dashboard");
                $localStorage.user = response.user;
                waitingDialog.hide();
            } else {
                SweetAlert.swal("Log in failed!",response.message, "error");
                waitingDialog.hide();
            }
        });
    };

});

app.controller('LogoutCtrl', function ($scope, $state,SweetAlert,Members,$filter,$localStorage,Auth) {

   $state.go("login.signin");
    delete $localStorage.user;
    delete $localStorage.members;
    delete $localStorage.layout;
});
