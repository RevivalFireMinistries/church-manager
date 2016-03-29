/**
 * Created by rmupfumira on 2015-07-10.
 */
'use strict';
/**
 * controller for Messages
 */
app.controller('ReportsCtrl', function ($scope, $state,SweetAlert,Reports,$localStorage) {


    $scope.report = {};
    $scope.report.assemblyId = $localStorage.user.assemblyId;

    $scope.master = $scope.report;
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
                SweetAlert.swal("The form cannot be submitted because it contains validation errors!", "Errors are marked with a red, dashed border!", "error");
                return;

            } else {
                var eventdate = moment($scope.report.eventDateString).format('YYYY-MM-DD');
                $scope.report.eventDateString =  eventdate;
                Reports.create(JSON.stringify($scope.report),function(response){
                    waitingDialog.hide();
                    $state.go("app.dashboard");
                    SweetAlert.swal("Success!", "The report has been captured successfully", "success");
                    //clear form
                    $scope.report = angular.copy($scope.master);
                    form.$setPristine(true);
                } );
            }

        },
        reset: function (form) {

            $scope.myModel = angular.copy($scope.master);
            form.$setPristine(true);

        }
    };


});
