'use strict';
/**
 * controller for Messages
 */


app.controller('TitheCtrl', function ($scope, $state,SweetAlert,Members,$localStorage,Tithe,toaster) {

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
                toaster.pop('error', 'Error', 'Failed to submit form : validation errors!');
                return;

            } else {
                if(!checkIfExistsInList($scope.tithe)){
                    waitingDialog.show('Please Wait...');
                    Tithe.create($scope.tithe,function(response){
                        if(response.status === 0){
                            $scope.success = "Tithe has been sent successfully";
                            toaster.pop('success', 'Success', 'Tithe has been sent successfully');
                            $scope.tithes.push($scope.tithe);
                            $scope.tithe = {};
                            form.$setPristine(true);
                            waitingDialog.hide();
                        }else{
                            toaster.pop('error', 'Error', response.message);
                            waitingDialog.hide();
                        }
                    });

                }
                else{
                    toaster.pop('warning', 'Hey!', 'Looks like you have a similar transaction on the list already');
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
        $state.go("app.dashboard");
    };


    var checkIfExistsInList =  function(tithe){

        if($scope.tithes.length < 1){
            return false;
        }

        for(var i=0;i<$scope.tithes.length;i++){
            if(((tithe.member.id === $scope.tithes[i].member.id) && (moment(tithe.txndate).isSame(moment($scope.tithes[i].txndate)))) && (tithe.amount == $scope.tithes[i].amount) ){
                return true;
            }
        }
        return false;
    };





});
