/**
 * Created by rmupfumira on 2015-07-10.
 */
'use strict';
/**
 * controller for Messages
 */
app.controller('FinanceCtrl', function ($scope, $state,SweetAlert,Finance,$localStorage,toaster) {


    $scope.transaction = {};
    $scope.assemblyId = $localStorage.user.assembly;
    $scope.eventDateString = "";


    $scope.master = $scope.transaction;
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
                $scope.transaction.type = "Expense";
                $scope.transaction.created = form.txnDateString.$viewValue;
                Finance.create(JSON.stringify($scope.transaction),$scope.assemblyId,function(response){
                    waitingDialog.hide();

                        toaster.pop("Success!", "The expense has been captured successfully", "success");
                        //clear form
                        $scope.transaction = {};
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
