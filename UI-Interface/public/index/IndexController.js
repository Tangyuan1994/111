/**
 * Created by Flow on 24/04/2017.
 */

angular.module('daeNG')
    .controller('IndexController', function ($scope,$mdMedia,$window) {

        $scope.changeView = function(view){
            $scope.view = view;
        };

        $scope.heightWindow = $window.innerHeight - 85;

        $scope.isTablet = $mdMedia("md");

        $scope.userConnected = {"name":""};
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

        $scope.title = "Document Analysis and Exploitation";

    });