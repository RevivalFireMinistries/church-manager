'use strict';
/**
 * controller for Messages
 */


app.controller('TitheCtrl', function ($scope, $state,SweetAlert,Members,$localStorage,Tithe) {

    $scope.tithes = [];
    $scope.members = $localStorage.members;
    $scope.tithe = {};

    $scope.form = {

        submit: function (form) {
            var firstError = null;
            if (form.$invalid) {

                var field = null, firstError = null;
                for (field in form) {
                    if (field[0] != '$') {
                        if (firstError === null && !form[field].$valid) {
                            firstError = form[field].$name;
                        }

                        if (form[field].$pristine) {
                            form[field].$dirty = true;
                        }
                    }
                }

                angular.element('.ng-invalid[name=' + firstError + ']').focus();
                SweetAlert.swal("Tithe cannot be submitted because it contains validation errors!", "Errors are marked with a red, dashed border!", "error");
                return;

            } else {
                if(!checkIfExistsInList($scope.tithe)){

                    SweetAlert.swal("Success", "Your tithe has been added to the list", "success");
                    //your code for submit
                    $scope.tithes.push($scope.tithe);
                    $scope.tithe = {};
                    form.$setPristine(true);
                }
                else{
                    SweetAlert.swal("Hey...","Looks like you already have a similar transaction on the list", "warning");
                    return;
                }

            }

        },
        reset: function (form) {

            $scope.tithe = {};
            form.$setPristine(true);

        }
    };



    $scope.saveTithes = function(){
        waitingDialog.show('Please Wait...');
        Tithe.addTithes($scope.tithes,function(response){
            if(response.success = true){
                $scope.success = "Tithes have been processed successfully";
                $state.go("app.dashboard");
                SweetAlert.swal("OK","Tithes have been processed successfully", "success");
                waitingDialog.hide();
            }else{
                SweetAlert.swal("Error","Failed to process tithes on server", "error");
                waitingDialog.hide();
            }
        })
    };


    var checkIfExistsInList =  function(tithe){

        if($scope.tithes.length < 1){
            return false;
        }

        for(var i=0;i<$scope.tithes.length;i++){
            if(((tithe.member.id === $scope.tithes[i].member.id) && (moment(tithe.date).isSame(moment($scope.tithes[i].date)))) && (tithe.amount == $scope.tithes[i].amount) ){
                return true;
            }
        }
        return false;
    };





});
