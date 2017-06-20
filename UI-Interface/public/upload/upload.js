angular.module('daeNG')
    .controller('UploadController', function ($scope,$http) {

        // $scope.value = "Upload";
        //
        // $scope.changeTitle = function(){
        //     $scope.title = $scope.title + $scope.title
        // }

        $scope.dataUpload = {}

        $scope.testEnvoi = function(){
            $http({
                method:'POST',
                url: '/upload/'
            })
        }

        $scope.test = ['USA', 'France', 'China', 'Japan', 'Spain', 'Italia']
    })