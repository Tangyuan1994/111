/**
 * Created by Flow on 24/04/2017.
 */

angular.module('daeNG')
    .controller('IndexController', function ($scope,$mdMedia,$window) {

/**
 ------------------------------------------------------------------
 HERITAGE
 ------------------------------------------------------------------
 **/

        $scope.testHeritage = function(title){
            $scope.title = title
        };

        $scope.hasClicked = function(){
            $scope.clickedSearch = !$scope.clickedSearch;
        }

        $scope.title = "Document Analysis and Exploitation";
        $scope.clickedSearch = false;

        $scope.random = function(taille){
            var text = "";
            var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

            for( var i=0; i < taille; i++ )
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        };

        $scope.heightWindow = $window.innerHeight - 85;

        $scope.isTablet = $mdMedia("md");
        $scope.isLarge = $mdMedia("lg");


/**
 ------------------------------------------------------------------
 CONTROLLER
 ------------------------------------------------------------------
 **/

        $scope.user = {"username":"", "password":""};
        $scope.tmpUsername = "";
        $scope.tmpPassword = "";

        $scope.connection = function(name){
            $scope.userConnected = {"name":name,"gender":"H"}
        };
        $scope.disconnection = function(){
            $scope.userConnected = {"name":""};
            $scope.tmpUsername = "";
            $scope.tmpPassword = "";
        };



    });