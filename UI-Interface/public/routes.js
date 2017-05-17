var daeNG = angular.module('daeNG', ['ngMaterial', 'ngAnimate', 'ngAria','ui.router']);

(function(app) {
    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider,$controller) {


        $urlRouterProvider.otherwise('/');

        $stateProvider

            .state('index', {
                templateUrl: '../views/index.html',
                controller: 'IndexController'
            })
            .state('admin', {
                url: '/admin',
                templateUrl: 'admin/admin.html',
                controller: 'AdminController'
            })
            .state('browse', {
                url: '/browse',
                templateUrl: 'browse/browse.html',
                controller: 'BrowseController'
            })
            .state('search', {
                url: '/search',
                templateUrl: 'search/search.html',
                controller: 'SearchController'
            })
            .state('tutorial', {
                url: '/tutorial',
                templateUrl: 'tutorial/tutorial.html',
                controller: 'TutorialController'
            })
            .state('algorithms', {
                url: '/algo',
                templateUrl: 'algo/algo.html',
                controller: 'AlgoController'
            })
            .state('upload', {
                url: '/upload',
                templateUrl: 'upload/upload.html',
                controller: 'UploadController'
            })
        
    }]);
})(daeNG);
