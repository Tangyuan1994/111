var daeNG = angular.module('daeNG', ['ngMessages','ngMaterial', 'ngAnimate', 'ngAria','ui.router']);

(function(app) {

    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider,$controller) {
        
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/home.html',
                controller: 'HomeController'
            })
            .state('admin', {
                url: '/admin',
                templateUrl: 'admin/admin.html',
                controller: 'AdminController'
            })
            .state('browse', {
                url: '/browse',
                templateUrl: 'browse/browse.html',
                controller: 'BrowseController',
                authorized: true,
                onEnter: function(){
                    console.log("Vous êtes en train de naviguer sur la page Browse")
                },
                onExit: function(){
                    console.log("Vous êtes en train de quitter la page Browse")
                }
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
            .state('contact', {
                url: '/contact',
                templateUrl: 'contact/contact.html',
                controller: 'ContactController'
            })
            .state('sign_in', {
                url: '/SignIn',
                templateUrl: 'sign_in/sign_in.html',
                controller: 'SignInController'
            })

    }]);
})(daeNG);
