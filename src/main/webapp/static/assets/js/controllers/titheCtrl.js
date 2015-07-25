'use strict';
/**
 * controller for Messages
 */


app.controller('TitheCtrl', function ($scope, $state,SweetAlert,Members,$localStorage,Tithe) {

    $scope.tithes = [];
    $scope.members = $localStorage.members;
    $scope.tithe = {};


// Add a Item to the list
    $scope.addTithe = function () {
        $scope.success = null;
        $scope.error = null;

        if((!angular.isUndefined($scope.tithe.selected) && $scope.tithe.amount > 0) && $scope.tithe.date != null){
            var tithe  = {
                member: $scope.tithe.selected,
                date: $scope.tithe.date,
                amount: $scope.tithe.amount
            }
            if(!checkIfExistsInList(tithe)){
                $scope.tithes.push(tithe);
            }
            else{
                SweetAlert.swal("Hey...","Looks like you already have a similar transaction on the list", "warning");
                return;
            }
        }else{
            $scope.error = "Please complete all fields";
            return;
        }


        // Clear input fields after push

        $scope.tithe.amount = "";

        $scope.success = "Tithe has been added to the list";

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
            if(((tithe.member.id === $scope.tithes[i].member.id) && (tithe.date === $scope.tithes[i].date)) && (tithe.amount === $scope.tithes[i].amount) ){
                return true;
            }
        }
        return false;
    };





});
