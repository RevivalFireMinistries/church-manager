'use strict';
/**
 * controller for Messages
 */


app.controller('TitheCtrl', function ($scope, $state,SweetAlert,Members,$localStorage,$filter, ngTableParams) {

    $scope.person = {};
    $scope.tithes = {};
    $scope.members = $localStorage.members;


    $scope.data = [];

    $scope.processForm = function(form){
        if(form.$valid){
            $scope.tithe.member = form.member;
            $scope.data.push($scope.tithe);
            $scope.tithe = {};
            $scope.tableParams.reload();

            SweetAlert.swal("Success!", "The report has been captured successfully", "success");
        }
        else{
            SweetAlert.swal("Error!", "The report has been captured successfully", "error");
        }
    }

    $scope.tableParams = new ngTableParams({
        page: 1, // show first page
        count: 10, // count per page
        filter: {
            name: 'M' // initial filter
        }
    }, {
        total: $scope.data.length, // length of data
        getData: function ($defer, params) {
            // use build-in angular filter
            var orderedData = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
            $scope.tithes = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
            params.total($scope.data.length);
            // set total for recalc pagination
            $defer.resolve($scope.tithes);
        }
    });


});
