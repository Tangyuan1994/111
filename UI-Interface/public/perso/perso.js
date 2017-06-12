angular.module('daeNG')
    .controller('PersoController', function ($scope) {

        $scope.value = "perso";

        $scope.changeTitle = function(){
            $scope.title = $scope.title + $scope.title
        }
        $scope.user ={}
        $scope.user.fname = "myFname"
        $scope.user.name = "myName"
        $scope.user.mail = "myMail"
        $scope.user.password = "myPwd"
        $scope.user.affiliation = "myAff"
        $scope.user.inscription = "myInsc"




    });