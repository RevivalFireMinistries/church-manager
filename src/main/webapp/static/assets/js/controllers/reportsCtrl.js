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


 $scope.processForm = function(form){
     if(form.$valid){
         console.log($scope.report);
         var eventdate = new Date($scope.report.eventDateString);
         $scope.report.eventDateString =  eventdate.toLocaleFormat('%Y-%m-%d');
         Reports.create(JSON.stringify($scope.report),function(response){
             $state.go("app.dashboard");
             SweetAlert.swal("Success!", "The report has been captured successfully", "success");
         } );

     }
     else{
         SweetAlert.swal("The form cannot be submitted because it contains validation errors!", "", "error");
         return;
     }
 }


});
