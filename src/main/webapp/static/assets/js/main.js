var app = angular.module('clipApp', ['clip-two','ngStorage']);
app.run(['$rootScope', '$state', '$stateParams','$localStorage',
function ($rootScope, $state, $stateParams,$localStorage,$location) {

    // Attach Fastclick for eliminating the 300ms delay between a physical tap and the firing of a click event on mobile browsers
    FastClick.attach(document.body);

    // Set some reference to access them from any scope
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    if(angular.isDefined($localStorage.user)){
        var firstName = $localStorage.user.username;
        var job = $localStorage.user.roleToString;
        var assembly = $localStorage.user.assemblyName;
    }


    // GLOBAL APP SCOPE
    // set below basic information
    $rootScope.app = {
        name: 'eSavvy', // name of your project
        author: 'rfmDigitalMedia', // author's name or company name
        description: 'Intelligent Church Management', // brief description
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
        name: firstName,
        job: job,
        assembly: assembly,
        picture: 'app/img/user/02.jpg'
    };

    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams){

            if(fromState.name.includes("login") || toState.name.includes("login")){
                console.log("PASS............");
                return;
            }
            else{
                if(angular.isDefined($localStorage.user)){//already logged in - pass
                    console.log("proceed user is there : "+$localStorage.user.username);
                    return;
                }else{
                    console.log("no user found in storage....login please")
                    event.preventDefault();
                    $state.go("login.signin");

                }
            }

        })


}]);
// translate config
app.config(['$translateProvider',
function ($translateProvider) {

    // prefix and suffix information  is required to specify a pattern
    // You can simply use the static-files loader with this pattern:
    $translateProvider.useStaticFilesLoader({
        prefix: 'static/assets/i18n/',
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
