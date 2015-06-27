var eSavvyApp = angular.module('eSavvyApp', ['ui.router','esavvy.services','esavvy.controllers']);

eSavvyApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'static/views/_home.html'
        })

        // nested list with custom controller
        .state('home.list', {
            url: '/list',
            templateUrl: 'static/views/_home-list.html'

        })

        // nested list with just some random string data
        .state('home.paragraph', {
            url: '/paragraph',
            templateUrl: 'static/views/_about.html'
        })

        .state('report', {
            url: '/report',
            templateUrl: 'static/views/service/_new-report.html',
            controller : 'ReportsController'
        })

        .state('tithe', {
            url: '/tithe',
            templateUrl: 'static/views/tithe/_new-tithe.html',
            controller : 'Reports1Controller'
        });

});

