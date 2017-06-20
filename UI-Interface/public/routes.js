var daeNG = angular.module('daeNG', ['ngMessages','ngMaterial', 'ngAnimate', 'ngAria','ui.router']);

(function(app) {
    app
    // .factory('principal', ['$q', '$http', '$timeout',
    //     function($q, $http, $timeout) {
    //         var _identity = undefined,
    //             _authenticated = false;
    //
    //         return {
    //             isIdentityResolved: function() {
    //                 return angular.isDefined(_identity);
    //             },
    //             getIdentity: function(){
    //                 return _identity
    //             },
    //             isAuthenticated: function() {
    //                 return _authenticated;
    //             },
    //             isInRole: function(role) {
    //                 if (!_authenticated || !_identity.roles) return false;
    //
    //                 return _identity.roles.indexOf(role) != -1;
    //             },
    //             isInAnyRole: function(roles) {
    //                 if (!_authenticated || !_identity.roles) return false;
    //
    //                 for (var i = 0; i < roles.length; i++) {
    //                     console.log(roles[i])
    //                     if (this.isInRole(roles[i])) return true;
    //                 }
    //
    //                 return false;
    //             },
    //             authenticate: function(identity) {
    //                 _identity = identity;
    //                 _authenticated = true;
    //             },
    //             identity: function(/*force,*/username, password) {
    //                 var deferred = $q.defer();
    //
    //                 // if (force === true) _identity = undefined;
    //
    //                 // check and see if we have retrieved the
    //                 // identity data from the server. if we have,
    //                 // reuse it by immediately resolving
    //                 // if (angular.isDefined(_identity)) {
    //                 //     deferred.resolve(_identity);
    //                 //     return deferred.promise;
    //                 // }
    //                 $http.get('/getCredentials/'+username+"/"+password,
    //                     { ignoreErrors: true })
    //                     .then(function(data) {
    //                         console.log("Data récupérée",data)
    //                         _identity = data.data;
    //                         _authenticated = true;
    //                         deferred.resolve(_identity);
    //                     }, function(error){
    //                         console.error(error)
    //                     })
    //
    //                 return deferred.promise;
    //             }
    //         };
    //     }
    // ])
    //     .factory('authorization', ['$rootScope', '$state', 'principal',
    //         function($rootScope, $state, principal) {
    //             return {
    //                 authorize: function(username,password) {
    //                     // console.log("Test-1",principal.identity())
    //                     // console.log("Username = " + username)
    //                     // console.log("Password = " + password)
    //                     return principal.identity(username,password)
    //                         .then(function() {
    //                             var isAuthenticated = principal.isAuthenticated();
    //                             // console.log("Test0", principal.identity("Bart","123456qsdqdqsdqsd789"))
    //                             // console.log("Test1",$rootScope.toState.data.roles);
    //                             // console.log("Test2",$rootScope.toState.data.roles.length > 0);
    //                             var test = $rootScope.toState.data.roles;
    //                             console.log("Test3 ",$rootScope.toState.data.roles && $rootScope.toState.data.roles.length>0 && !principal.isInAnyRole(test));
    //                             if (($rootScope.toState.data.roles)
    //                                 && ($rootScope.toState
    //                                     .data.roles.length > 0)
    //                                 && !(principal.isInAnyRole(test))) {
    //                                 console.log("Hello world !")
    //                                 console.log(!principal.isInAnyRole(test))
    //                                 if (isAuthenticated && !principal.isInAnyRole(test)) {
    //                                     console.log(isAuthenticated)
    //                                     // user is signed in but not
    //                                     // authorized for desired state
    //                                     $state.go("Home")
    //                                 } else {
    //                                     console.log("Coucou bis")
    //
    //                                     // user is not authenticated. Stow
    //                                     // the state they wanted before you
    //                                     // send them to the sign-in state, so
    //                                     // you can return them when you're done
    //                                     $rootScope.returnToState
    //                                         = $rootScope.toState;
    //                                     $rootScope.returnToStateParams
    //                                         = $rootScope.toStateParams;
    //
    //                                     // now, send them to the signin state
    //                                     // so they can log in
    //                                     $state.go('signin');
    //                                 }
    //                             }
    //
    //                         });
    //                 }
    //             };
    //         }
    //     ])


        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider,$controller,$stateParams) {

            $urlRouterProvider.otherwise('/home');

            $stateProvider
                // .state('site', {
                //     'abstract': true,
                //     params: {
                //         username: "Flow",
                //         password: "123456dqqd"
                //     },
                //     resolve: {
                //         params: ['$stateParams', function($stateParams){
                //             return $stateParams;
                //         }],
                //
                //         authorize: ['authorization','$stateParams',
                //             function(authorization, params) {
                //                 console.log(params);
                //                 if (params.username == "" || params.username == ""){
                //                     return authorization.authorize("anon","anon")
                //                 }
                //                 return authorization.authorize(params.username,params.password);
                //             }
                //         ]
                //     },
                //     template: '<div ui-view />'
                // })
                .state('home', {
                    url: '/home',
                    templateUrl: 'home/home.html',
                    controller: 'HomeController',
                    // parent: 'site',
                    // params: {
                    //     username: "",
                    //     password: ""
                    // },
                    //
                    // data: {
                    //     roles: ["Admin","Test1","Anonymous"]
                    // },
                })
                .state('admin', {
                    url: '/admin.css',
                    templateUrl: 'admin/admin.html',
                    controller: 'AdminController',
                    // parent: 'site',
                    // params: {
                    //     username: "Flow",
                    //     password: "123456qdsd"
                    // },
                    // data: {
                    //     roles: ["Admin","SuperUser"]
                    // },
                    // onEnter: function () {
                    //     console.log("Attention, vous entrez dans une zone sécurisée !");
                    // }
                })
                .state('browse', {
                    url: '/browse',
                    templateUrl: 'browse/browse.html',
                    controller: 'BrowseController',
                    // parent: 'site',
                    // params: {
                    //     username: "Flow",
                    //     password: "123456qdsqs"
                    // },
                    // onEnter: function(){
                    //     console.log("Vous êtes en train de naviguer sur la page Browse")
                    // },
                    // onExit: function(){
                    //     console.log("Vous êtes en train de quitter la page Browse")
                    // },
                    // data: {
                    //     roles: ["Admin","SuperUser"]
                    // },
                })
                .state('search', {
                    url: '/search',
                    templateUrl: 'search/search.html',
                    controller: 'SearchController',
                    // parent: 'site',
                    // params: {
                    //     username: "",
                    //     password: ""
                    // },
                    // data: {
                    //     roles: ["Admin","SuperUser","Anonymous"]
                    // },
                })
                .state('tutorial', {
                    url: '/tutorial',
                    templateUrl: 'tutorial/tutorial.html',
                    controller: 'TutorialController',
                    // parent: 'site',
                    // params: {
                    //     username: "",
                    //     password: ""
                    // },
                    // data: {
                    //     roles: ["Admin","SuperUser","Anonymous"]
                    // }
                })
                .state('algorithms', {
                    url: '/algo',
                    templateUrl: 'algo/algo.html',
                    controller: 'AlgoController',
                    // parent: 'site',
                    // params: {
                    //     username: "",
                    //     password: ""
                    // },
                    // data: {
                    //     roles: ["Admin","SuperUser","Anonymous"]
                    // }
                })
                .state('upload', {
                    url: '/upload',
                    templateUrl: 'upload/upload.html',
                    controller: 'UploadController',
                    // parent: 'site',
                    // params: {
                    //     username: "",
                    //     password: ""
                    // },
                    // data: {
                    //     roles: ["Admin", "Test1", "Test2", "Test3", "Anonymous"]
                    // }
                })
                .state('contact', {
                    url: '/contact',
                    templateUrl: 'contact/contact.html',
                    controller: 'ContactController',
                    // parent: 'site',
                    // params: {
                    //     username: "",
                    //     password: ""
                    // },
                    // data: {
                    //     roles: ["Admin","SuperUser","Anonymous"]
                    // }
                })
                .state('sign_in', {
                    url: '/SignIn',
                    templateUrl: 'sign_in/sign_in.html',
                    controller: 'SignInController',
                    // parent: 'site',
                    // params: {
                    //     username: "",
                    //     password: ""
                    // },
                    // data: {
                    //     roles: ["Admin","SuperUser","Anonymous"]
                    // }
                })
                .state('perso', {
                    url: '/perso',
                    templateUrl: 'perso/perso.html',
                    controller: 'PersoController',
                    // parent: 'site',
                    // params: {
                    //     username: "",
                    //     password: ""
                    // },
                    // data: {
                    //     roles: ["Admin","SuperUser","Anonymous"]
                    // },
                })
                .state('import', {
                    url: '/import',
                    templateUrl: 'import/import.html',
                    controller: 'ImportController',
                    // parent: 'site',
                    // params: {
                    //     username: "",
                    //     password: ""
                    // },
                    // data: {
                    //     roles: ["Admin","SuperUser","Anonymous"]
                    // },
                })

        }]);
        // .run(['$rootScope', '$state', '$stateParams',
        //     'authorization', 'principal',
        //     function($rootScope, $state, $stateParams,
        //              authorization, principal)
        //     {
        //         $rootScope.$on('$stateChangeStart',
        //             function(event, toState, toStateParams)
        //             {
        //                 // track the state the user wants to go to;
        //                 // authorization service needs this
        //                 $rootScope.toState = toState;
        //                 $rootScope.toStateParams = toStateParams;
        //                 // if the principal is resolved, do an
        //                 // authorization check immediately. otherwise,
        //                 // it'll be done when the state it resolved.
        //                 if (principal.isIdentityResolved())
        //                     authorization.authorize();
        //             });
        //     }
        // ]);
})(daeNG);
