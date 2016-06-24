'use strict';

/**
 * Config constant
 */
app.constant('APP_MEDIAQUERY', {
    'desktopXL': 1200,
    'desktop': 992,
    'tablet': 768,
    'mobile': 480
});
app.constant('JS_REQUIRES', {
    //*** Scripts
    scripts: {
        //*** Javascript Plugins
        'modernizr': ['static/vendor/modernizr/modernizr.js'],
        'moment': ['static/vendor/moment/moment.min.js'],
        'spin': 'static/vendor/ladda/spin.min.js',

        //*** jQuery Plugins
        'perfect-scrollbar-plugin': ['static/vendor/perfect-scrollbar/perfect-scrollbar.min.js', 'static/vendor/perfect-scrollbar/perfect-scrollbar.min.css'],
        'ladda': ['static/vendor/ladda/spin.min.js', 'static/vendor/ladda/ladda.min.js', 'static/vendor/ladda/ladda-themeless.min.css'],
        'sweet-alert': ['static/vendor/sweet-alert/sweet-alert.min.js', 'static/vendor/sweet-alert/sweet-alert.css'],
        'chartjs': 'static/vendor/chartjs/Chart.min.js',
        'jquery-sparkline': 'static/vendor/sparkline/jquery.sparkline.min.js',
        'ckeditor-plugin': 'static/vendor/ckeditor/ckeditor.js',
        'jquery-nestable-plugin': ['static/vendor/ng-nestable/jquery.nestable.js', 'static/vendor/ng-nestable/jquery.nestable.css'],
        'touchspin-plugin': 'static/vendor/bootstrap-touchspin/jquery.bootstrap-touchspin.min.js',

        //*** Controllers
        'dashboardCtrl': 'static/assets/js/controllers/dashboardCtrl.js',
        'iconsCtrl': 'static/assets/js/controllers/iconsCtrl.js',
        'vAccordionCtrl': 'static/assets/js/controllers/vAccordionCtrl.js',
        'ckeditorCtrl': 'static/assets/js/controllers/ckeditorCtrl.js',
        'laddaCtrl': 'static/assets/js/controllers/laddaCtrl.js',
        'ngTableCtrl': 'static/assets/js/controllers/ngTableCtrl.js',
        'cropCtrl': 'static/assets/js/controllers/cropCtrl.js',
        'asideCtrl': 'static/assets/js/controllers/asideCtrl.js',
        'toasterCtrl': 'static/assets/js/controllers/toasterCtrl.js',
        'sweetAlertCtrl': 'static/assets/js/controllers/sweetAlertCtrl.js',
        'mapsCtrl': 'static/assets/js/controllers/mapsCtrl.js',
        'chartsCtrl': 'static/assets/js/controllers/chartsCtrl.js',
        'calendarCtrl': 'static/assets/js/controllers/calendarCtrl.js',
        'nestableCtrl': 'static/assets/js/controllers/nestableCtrl.js',
        'validationCtrl': ['static/assets/js/controllers/validationCtrl.js'],
        'userCtrl': ['static/assets/js/controllers/userCtrl.js'],
        'selectCtrl': 'static/assets/js/controllers/selectCtrl.js',
        'wizardCtrl': 'static/assets/js/controllers/wizardCtrl.js',
        'uploadCtrl': 'static/assets/js/controllers/uploadCtrl.js',
        'treeCtrl': 'static/assets/js/controllers/treeCtrl.js',
        'inboxCtrl': 'static/assets/js/controllers/inboxCtrl.js',
        'xeditableCtrl': 'static/assets/js/controllers/xeditableCtrl.js',
        'chatCtrl': 'static/assets/js/controllers/chatCtrl.js',
        'eventsCtrl': 'static/assets/js/controllers/eventsCtrl.js',
        'membersCtrl': 'static/assets/js/controllers/membersCtrl.js',
        'titheCtrl': 'static/assets/js/controllers/tithesCtrl.js',
        'loginCtrl': 'static/assets/js/controllers/loginCtrl.js',

        //*** Filters
        'htmlToPlaintext': 'static/assets/js/filters/htmlToPlaintext.js'
    },
    //*** angularJS Modules
    modules: [{
        name: 'angularMoment',
        files: ['static/vendor/moment/angular-moment.min.js']
    }, {
        name: 'perfect_scrollbar',
        files: ['static/vendor/perfect-scrollbar/angular-perfect-scrollbar.js']
    }, {
        name: 'toaster',
        files: ['static/vendor/toaster/toaster.js', 'static/vendor/toaster/toaster.css']
    }, {
        name: 'angularBootstrapNavTree',
        files: ['static/vendor/angular-bootstrap-nav-tree/abn_tree_directive.js', 'static/vendor/angular-bootstrap-nav-tree/abn_tree.css']
    }, {
        name: 'angular-ladda',
        files: ['static/vendor/ladda/angular-ladda.min.js']
    }, {
        name: 'ngTable',
        files: ['static/vendor/ng-table/ng-table.min.js', 'static/vendor/ng-table/ng-table.min.css']
    }, {
        name: 'ui.select',
        files: ['static/vendor/ui-select/select.min.js', 'static/vendor/ui-select/select.min.css', 'static/vendor/ui-select/select2.css', 'static/vendor/ui-select/select2-bootstrap.css', 'static/vendor/ui-select/selectize.bootstrap3.css']
    }, {
        name: 'ui.mask',
        files: ['static/vendor/ui-utils/mask/mask.js']
    }, {
        name: 'angular-bootstrap-touchspin',
        files: ['static/vendor/bootstrap-touchspin/angular.bootstrap-touchspin.js', 'static/vendor/bootstrap-touchspin/jquery.bootstrap-touchspin.min.css']
    }, {
        name: 'ngImgCrop',
        files: ['static/vendor/ngImgCrop/ng-img-crop.js', 'static/vendor/ngImgCrop/ng-img-crop.css']
    }, {
        name: 'angularFileUpload',
        files: ['static/vendor/angular-file-upload/angular-file-upload.min.js', 'static/vendor/angular-file-upload/directives.js']
    }, {
        name: 'ngAside',
        files: ['static/vendor/angular-aside/angular-aside.min.js', 'static/vendor/angular-aside/angular-aside.min.css']
    }, {
        name: 'truncate',
        files: ['static/vendor/angular-truncate/truncate.js']
    }, {
        name: 'oitozero.ngSweetAlert',
        files: ['static/vendor/sweet-alert/ngSweetAlert.min.js']
    }, {
        name: 'monospaced.elastic',
        files: ['static/vendor/angular-elastic/elastic.js']
    }, {
        name: 'ngMap',
        files: ['static/vendor/angular-google-maps/ng-map.min.js']
    }, {
        name: 'tc.chartjs',
        files: ['static/vendor/chartjs/tc-angular-chartjs.min.js']
    }, {
        name: 'sparkline',
        files: ['static/vendor/sparkline/angular-sparkline.js']
    }, {
        name: 'flow',
        files: ['static/vendor/ng-flow/ng-flow-standalone.min.js']
    }, {
        name: 'uiSwitch',
        files: ['static/vendor/angular-ui-switch/angular-ui-switch.min.js', 'static/vendor/angular-ui-switch/angular-ui-switch.min.css']
    }, {
        name: 'ckeditor',
        files: ['static/vendor/ckeditor/angular-ckeditor.min.js']
    }, {
        name: 'mwl.calendar',
        files: ['static/vendor/angular-bootstrap-calendar/angular-bootstrap-calendar.js', 'static/vendor/angular-bootstrap-calendar/angular-bootstrap-calendar-tpls.js', 'static/vendor/angular-bootstrap-calendar/angular-bootstrap-calendar.min.css']
    }, {
        name: 'ng-nestable',
        files: ['static/vendor/ng-nestable/angular-nestable.js']
    }, {
        name: 'vAccordion',
        files: ['static/vendor/v-accordion/v-accordion.min.js', 'static/vendor/v-accordion/v-accordion.min.css']
    }, {
        name: 'xeditable',
        files: ['static/vendor/angular-xeditable/xeditable.min.js', 'static/vendor/angular-xeditable/xeditable.css']
    }, {
        name: 'config-xeditable',
        files: ['static/vendor/angular-xeditable/config-xeditable.js']
    }, {
        name: 'checklist-model',
        files: ['static/vendor/checklist-model/checklist-model.js']
    }]
});
