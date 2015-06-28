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

.controller('MembersController', ['$scope','Members','localStorageService','ngTableParams', function($scope, Members,localStorageService,ngTableParams) {
        waitingDialog.show('Please Wait...');
        $('#example').DataTable();
        var members = localStorageService.get('members');

        if(typeof(members) !== "undefined" && members !== null){
            console.log("...Load the local storage values...")
            members = localStorageService.get('members');
            waitingDialog.hide();
        }else{
            console.log("...REst call required...")
            Members.all(1).then(function(data){
                members = data;
                localStorageService.add('members',members);
                waitingDialog.hide();
            });
        }

        $scope.tableParams = new ngTableParams({
            page: 1, // show first page
            count: 5 // count per page
        }, {
            total: members.length, // length of data
            getData: function ($defer, params) {
                $defer.resolve(members.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });

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