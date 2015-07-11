/**
 * Created by rmupfumira on 2015-07-10.
 */
'use strict';
/**
 * controller for Messages
 */
app.controller('ReportsCtrl', function ($scope, $state,SweetAlert,Reports) {

 $scope.processForm = function(form){
     if(form.$valid){
         Reports.create(JSON.stringify($scope.report) );
         $state.go("app.dashboard");
         SweetAlert.swal("Success!", "The report has been captured successfully", "success");
     }
     else{
         SweetAlert.swal("The form cannot be submitted because it contains validation errors!", "", "error");
         return;
     }
 }


});
