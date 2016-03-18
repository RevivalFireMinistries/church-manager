/**
 * Created by rmupfumira on 2015-07-10.
 */
'use strict';
/**
 * controller for Messages
 */
app.controller('ReportsCtrl', function ($scope, $state,SweetAlert,Reports) {

    $scope.report = {};
    $scope.report.assemblyId = 6;

/*
 $scope.processForm = function(form){
     if(form.$valid){
         var eventdate = moment($scope.report.eventDateString).format('YYYY-MM-DD');
         $scope.report.eventDateString =  eventdate;
         Reports.create(JSON.stringify($scope.report),function(response){
             $state.go("app.dashboard");
             SweetAlert.swal("Success!", "The report has been captured successfully", "success");
         } );

     }
     else{
         SweetAlert.swal("The form cannot be submitted because it contains validation errors!", "", "error");
         return;
     }
 }*/

    $scope.master = $scope.report;
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
                SweetAlert.swal("The form cannot be submitted because it contains validation errors!", "Errors are marked with a red, dashed border!", "error");
                return;

            } else {
                SweetAlert.swal("Good job!", "Your form is ready to be submitted!", "success");
                //your code for submit
            }

        },
        reset: function (form) {

            $scope.myModel = angular.copy($scope.master);
            form.$setPristine(true);

        }
    };


});
