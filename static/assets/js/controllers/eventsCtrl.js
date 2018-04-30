/**
 * Created by rmupfumira on 2015-07-10.
 */
'use strict';
/**
 * controller for Messages
 */
app.controller('EventsCtrl', function ($scope, $state,SweetAlert,Events,Finance,$localStorage,toaster) {


    $scope.event = {};
/*    $scope.event.assemblyId = $localStorage.user.assembly;*/
    $scope.comment = {};
    $scope.eventDateString = "";


    $scope.master = $scope.event;
    $scope.form = {

        submit: function (form) {
            waitingDialog.show("Please wait...");
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
                waitingDialog.hide();
                angular.element('.ng-invalid[name=' + firstError + ']').focus();
                toaster.pop('error', 'Error', 'Failed to submit form : validation errors!');
                return;

            } else {
                var eventdate = moment($scope.event.eventDate).format('YYYY-MM-DD');
                //$scope.event.eventDate =  eventdate;
                $scope.event.comment = "".concat($scope.comment.comment1,"|"+$scope.comment.comment2,"|"+$scope.comment.comment3,"|"+$scope.comment.comment4);
               //now create a finance dashboard txn
                var transaction = {
                     created : eventdate,
                     type:"Income",
                     amount:$scope.event.offerings,
                     description:$scope.event.eventType+" Offering",
                     beneficiary:"Church"
                }
                Finance.create(JSON.stringify(transaction),$scope.event.assemblyId,undefined);

                Events.create(JSON.stringify($scope.event),function(response){

                    waitingDialog.hide();
                    if(response.status === 0){
                        $state.go("app.dashboard");
                        toaster.pop("Success!", "The event has been captured successfully", "success");
                        //clear form
                        $scope.event = angular.copy($scope.master);
                        form.$setPristine(true);
                    }else{
                        toaster.pop('error',"Error!", response.message);
                    }

                } );
            }

        },
        reset: function (form) {

            $scope.myModel = angular.copy($scope.master);
            form.$setPristine(true);

        }
    };


});
