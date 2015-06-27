/**
 * Created by rmupfumira on 2015-05-06.
 */


angular.module('esavvy.controllers', [])

.controller('DashBoardController', function ($scope,Members,$state) {
    //$scope.user = localStorageService.get('user');

     $scope.message = "Russel"

     $scope.viewMembers =  function(){
         $state.go('members');
     }

})
.controller('ReportsController', ['$scope','Reports', function($scope, Reports) {
    console.log("show create report form...");
    $scope.report = {};
    $scope.NumberRegex = /^\d+(\.\d{1,3})?$/;

    $scope.processForm = function(){
        console.log("now submitting the report...")

    }

        $scope.submitForm = function() {

            // check to make sure the form is completely valid
            if ($scope.reportForm
                    .$valid) {
                Reports.create(JSON.stringify($scope.report) )
                $scope.success = true;
                $scope.report = {};
            }else{
                $scope.errors = true;
            }
        }
    }])

.controller('MembersController', ['$scope','Members', function($scope, Members) {
    console.log("list members...");
        $('#example').DataTable();
    $scope.viewMember = function(){
        console.log("now submitting the report...")

    }

    $scope.submitForm = function() {

        // check to make sure the form is completely valid
        if ($scope.reportForm
                .$valid) {
            Reports.create(JSON.stringify($scope.report) )
            $scope.success = true;
            $scope.report = {};
        }else{
            $scope.errors = true;
        }
    }
}])
.controller('Reports1Controller', ['$scope','Reports', function($scope, Reports) {
    console.log("show create tithe form...");
    $scope.report = {};

    $scope.processForm = function(){
        console.log("now submitting the report...")
        Reports.create(JSON.stringify($scope.report) )
        $scope.success = true;
        $scope.report = {};
    }
}]);