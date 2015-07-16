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
         Members.all($localStorage.user.assemblyId).then(function(data){
             $localStorage.members = data
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
