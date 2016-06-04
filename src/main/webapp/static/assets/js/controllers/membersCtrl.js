/**
 * Created by rmupfumira on 2015-07-10.
 */
'use strict';
/**
 * controller for Messages
 */


app.controller('MembersCtrl', function ($scope, $state,SweetAlert,Members,$filter, ngTableParams,$localStorage) {

    var data = {};
    waitingDialog.show('Please Wait...');

     if (!angular.isDefined($localStorage.members)) {

         //load from REST
         console.log("No members in local...load from rest")

         Members.all($localStorage.user.assemblyId, function (response,members) {
             if (response.success) {

                 $localStorage.members = members;

                 data = $localStorage.members;

                 $scope.tableParams = new ngTableParams({
                     page: 1, // show first page
                     count: 10, // count per page
                     filter: {
                         name: 'M' // initial filter
                     }
                 }, {
                     total: data.length, // length of data
                     getData: function ($defer, params) {
                         // use build-in angular filter
                         var orderedData = params.filter() ? $filter('filter')(data, params.filter()) : data;
                         $scope.members = data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                         params.total(data.length);
                         // set total for recalc pagination
                         $defer.resolve($scope.members);
                     }
                 });
                 waitingDialog.hide();
             } else {
                 waitingDialog.hide();
                 SweetAlert.swal("Error!", "Could not load members list", "error");
             }
         });

    }else{
         data = $localStorage.members;

         $scope.tableParams = new ngTableParams({
             page: 1, // show first page
             count: 10, // count per page
             filter: {
                 name: 'M' // initial filter
             }
         }, {
             total: data.length, // length of data
             getData: function ($defer, params) {
                 // use build-in angular filter
                 var orderedData = params.filter() ? $filter('filter')(data, params.filter()) : data;
                 $scope.members = data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                 params.total(data.length);
                 // set total for recalc pagination
                 $defer.resolve($scope.members);
             }
         });
         waitingDialog.hide();
     }



    $scope.createMember = function(form){
        if(form.$valid){
            Members.create(JSON.stringify($scope.member) ,function(response){
                if(response.status == 0){
                    $state.go("app.dashboard");
                    SweetAlert.swal("Success!", "The member has been created successfully", "success");
                }else{
                    $state.go("app.dashboard");
                    SweetAlert.swal("Error!", response.message, "error");
                }
            });

        }
        else{
            SweetAlert.swal("The form cannot be submitted because it contains validation errors!", "", "error");
            return;
        }
    }


});

app.controller('NewMembersCtrl', ['$scope', 'toaster','$rootScope','Members','$state','$localStorage',
    function ($scope, toaster,$rootScope,Members,$state,$localStorage) {
        $scope.myModel = {};
        $scope.countries = rfm.countries;
        $scope.currentStep = 1;
        // Initial Value
        $scope.form = {

            next: function (form) {

                $scope.toTheTop();

                if (form.$valid) {
                    nextStep();
                } else {
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
                    errorMessage();
                }
            },
            prev: function (form) {
                $scope.toTheTop();
                prevStep();
            },
            goTo: function (form, i) {
                if (parseInt($scope.currentStep) > parseInt(i)) {
                    $scope.toTheTop();
                    goToStep(i);

                } else {
                    if (form.$valid) {
                        $scope.toTheTop();
                        goToStep(i);

                    } else
                        errorMessage();
                }
            },
            submit: function (form) {
                if(form.$invalid){
                    errorMessage(3);
                }else{
                    waitingDialog.show('Please Wait...');
                    Members.create($scope.myModel ,function(response){
                        if(response.status == 0){
                            delete $localStorage.members;  //force server sync
                            waitingDialog.hide();
                            goToStep(4);
                        }else{
                            waitingDialog.hide();
                            goToStep(5);
                        }
                    });
                }

            },
            exit: function () {
                $scope.myModel = {};
                $state.go("app.dashboard");
            }
        };


        var nextStep = function () {
            $scope.currentStep++;
        };
        var prevStep = function () {
            $scope.currentStep--;
        };
        var goToStep = function (i) {
            $scope.currentStep = i;
        };
        var errorMessage = function (i) {
            toaster.pop('error', 'Error', 'please complete the form in this step before proceeding');
        };

}]);

app.controller('ViewMemberCtrl', function ($scope, $state, $stateParams,$localStorage,toaster,Members) {

    var memberId = $stateParams.id;

    $scope.member = {};

    var found = false;

    if (angular.isDefined($localStorage.members)) {
        for(var i = 0; i < $localStorage.members.length;i++){
            if(memberId == $localStorage.members[i].id){
                $scope.member = $localStorage.members[i];
                found = true;
                break;
            }
        }
        if(!found){
            toaster.pop('info', 'Info', 'Failed to find member with id '+memberId);
            $state.go("app.dashboard");
        }

    }else{
        toaster.pop('error', 'Error', 'Failed to load member');
        $state.go("app.dashboard");
    }

    $scope.saveChanges = function(form) {

        if(form.$valid){
            Members.edit($scope.member,function(response){

                if(response.status == 0){
                   $scope.success = "Member details have been updated successfully";
                }else{
                   $scope.error = response.message;
                }
            });
        }
    }

});