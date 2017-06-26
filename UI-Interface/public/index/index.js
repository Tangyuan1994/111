/**
 * Created by Flow on 24/04/2017.
 */

angular.module('daeNG')
    .controller('IndexController', function ($scope,$mdMedia,$window/*, principal*/, $stateParams,$mdSidenav, $http, $log, $mdDialog) {

        /**
         ------------------------------------------------------------------
         HERITAGE
         ------------------------------------------------------------------
         **/

        $scope.token = null;

        $scope.getToken = function(token){
            $scope.token = token;
        }

        $scope.testHeritage = function(title){
            $scope.title = title
        };

        $scope.hasClicked = function(){
            $scope.clickedSearch = !$scope.clickedSearch;
        }

        $scope.username = "Flow"
        $scope.password = "123456"

        $scope.tmpUser = $stateParams.data

        $scope.tmpAdmin = {username:"Flow", password: "123456"}
        $scope.tmpAnon = {username:"", password: ""}

        $scope.isAdmin = false;

        $scope.title = "Document Analysis and Exploitation";
        $scope.clickedSearch = false;

        $scope.random = function(taille){
            var text = "";
            var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

            for( var i=0; i < taille; i++ )
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        };

        $scope.login = function(){
            $scope.isAdmin = !$scope.isAdmin;
        }

        $scope.heightWindow = $window.innerHeight - 85;

        $scope.isTablet = $mdMedia("md");
        $scope.isLarge = $mdMedia("lg");

        // $scope.principal = principal



        /**
         ------------------------------------------------------------------
         CONTROLLER
         ------------------------------------------------------------------
         **/

        $scope.user = {"username":"", "password":""};


        $scope.connection = function(name){
            $scope.userConnected = {"name":name,"gender":"H"}
        };
        $scope.disconnection = function(){
            $scope.userConnected = {"name":""};
            $scope.tmpUsername = "";
            $scope.tmpPassword = "";
        };


        /**
         ------------------------------------------------------------------
         SIDENAV
         ------------------------------------------------------------------
         */
        $scope.toggleRight = buildToggler('right');
        $scope.signIn = {};
        $scope.isOpenRight = function(){
            return $mdSidenav('right').isOpen();
        };
        $scope.closeButton = function () {
            // Component lookup should always be available since we are not using `ng-if`
            $scope.signIn = {};
            $mdSidenav('right').close()
                .then(function () {
                    $log.debug("close RIGHT is done");
                });
        };

        $scope.error = false;

        $scope.showAlert = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            // Modal dialogs should fully cover application
            // to prevent interaction outside of dialog
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('This is an alert title')
                    .textContent('You can specify some description text in here.')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Got it!')
                    .targetEvent(ev)
            );
        };

        $scope.validate = function(){
            var fname = $scope.signIn.firstName;
            var lname = $scope.signIn.lastName;
            var email = $scope.signIn.email;
            var password = $scope.signIn.password2;
            $http({
                method: 'GET',
                url: '/signin/' + fname + '/'+ lname +'/'+ email +'/'+ password
            }).then(function successCallback(response) {
                console.log(response)
                if (response.data == 200){
                    $scope.error = false
                    $mdSidenav('right').close()
                        .then(function () {
                            $log.debug("close RIGHT is done");
                        });
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Registration confirmation')
                            .textContent('Your registration have been made with success' )
                            .ariaLabel('Alert Dialog Demo')
                            .ok('ok')
                            .targetEvent()
                    );
                } else if (response.data == 409){
                    $scope.error = true
                } else {

                }
            }, function errorCallback(err) {
                console.log(err)
            });
        };

        function buildToggler(navID) {
            return function() {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            };
        }
    });