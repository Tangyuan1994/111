angular.module('daeNG')
    .controller('UploadController', function ($scope) {

        $scope.value = "Upload";

        $scope.changeTitle = function(){
            $scope.title = $scope.title + $scope.title
        }

    });