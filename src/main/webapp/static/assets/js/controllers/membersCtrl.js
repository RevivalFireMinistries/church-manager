/**
 * Created by rmupfumira on 2015-07-10.
 */
'use strict';
/**
 * controller for Messages
 */


app.controller('MembersCtrl', function ($scope, $state,SweetAlert,Members,$filter, ngTableParams,$localStorage) {

    var data = {};

     if (angular.isDefined($localStorage.members)) {
        console.log("already in local storage -- found members")
         data = $localStorage.members;

    } else {
         //load from REST
         console.log("No members in local...load from rest")

         Members.all($localStorage.user.assemblyId, function (response,members) {
             if (response.success) {
                 data = members;
                 $localStorage.members = members;
             } else {
                 SweetAlert.swal("Error!", "Could not load members list", "error");
             }
         });

    }

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

    $scope.createMember = function(form){
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

app.controller('NewMembersCtrl', ['$scope', 'toaster','$rootScope',
    function ($scope, toaster,$rootScope) {
        $scope.myModel = {};

        $scope.myModel.groups = {Elders: true, Deacons: false,Ushering: false,Music: false};;
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
            submit: function () {

            },
            reset: function () {

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
