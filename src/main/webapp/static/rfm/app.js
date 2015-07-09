var app = angular.module('app', [
    'ui.router',
    'esavvy.services',
    'esavvy.controllers',
    'LocalStorageModule',
    'ui.bootstrap',
    'ngTable',
    'ngAnimate',
    'ngCookies',
    'ngStorage',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.bootstrap',
    'oc.lazyLoad',
    'cfp.loadingBar',
    'ncy-angular-breadcrumb',
    'duScroll',
    'pascalprecht.translate',
]);

app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
        .setPrefix('ls')
        .setNotify(true, true)
})

app.config(function($stateProvider, $urlRouterProvider) {

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
        })

        .state('members', {
            url: '/members',
            templateUrl: 'static/views/members/_view-members.html',
            controller : 'MembersController'
        });

});

app.run(['$rootScope', '$state', '$stateParams',
    function ($rootScope, $state, $stateParams) {

        // Attach Fastclick for eliminating the 300ms delay between a physical tap and the firing of a click event on mobile browsers
        FastClick.attach(document.body);

        // Set some reference to access them from any scope
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        // GLOBAL APP SCOPE
        // set below basic information
        $rootScope.app = {
            name: 'eSavvy', // name of your project
            author: 'rfm', // author's name or company name
            description: 'Intelligent Church management', // brief description
            version: '2.0', // current version
            year: ((new Date()).getFullYear()), // automatic current year (for copyright information)
            isMobile: (function () {// true if the browser is a mobile device
                var check = false;
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    check = true;
                };
                return check;
            })(),
            layout: {
                isNavbarFixed: true, //true if you want to initialize the template with fixed header
                isSidebarFixed: true, // true if you want to initialize the template with fixed sidebar
                isSidebarClosed: false, // true if you want to initialize the template with closed sidebar
                isFooterFixed: false, // true if you want to initialize the template with fixed footer
                theme: 'theme-2', // indicate the theme chosen for your project
                logo: 'static/assets/images/logo.png' // relative path of the project logo
            }
        };
        $rootScope.user = {
            name: 'Russel',
            job: 'ng-Dev',
            picture: 'app/img/user/02.jpg'
        };
    }]);
// translate config
app.config(['$translateProvider',
    function ($translateProvider) {

        // prefix and suffix information  is required to specify a pattern
        // You can simply use the static-files loader with this pattern:
        $translateProvider.useStaticFilesLoader({
            prefix: 'assets/i18n/',
            suffix: '.json'
        });

        // Since you've now registered more then one translation table, angular-translate has to know which one to use.
        // This is where preferredLanguage(langKey) comes in.
        $translateProvider.preferredLanguage('en');

        // Store the language in the local storage
        $translateProvider.useLocalStorage();

    }]);
// Angular-Loading-Bar
// configuration
app.config(['cfpLoadingBarProvider',
    function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeBar = true;
        cfpLoadingBarProvider.includeSpinner = false;

    }]);


