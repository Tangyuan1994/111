angular.module('daeNG')
    .controller('UploadController', function ($scope,$http) {

        // $scope.value = "Upload";
        //
        // $scope.changeTitle = function(){
        //     $scope.title = $scope.title + $scope.title
        // }

        $scope.dataUpload = {}

        $scope.testEnvoi = function(){
            // Get data to send
            var path = $scope.dataUpload.path
            var type = $scope.dataUpload.type
            var name = $scope.dataUpload.name
            var country = $scope.dataUpload.country

            // Send data to server
            $http({
                method:'POST',
                url: '/upload/'+path+"/"+type+"/"+name+"/"+country
            }).then(function successCallBack(response){

                //Define success callback
                console.log(response)
            }, function errorCallBack(error){

                //Define error callback
                console.log(error)
            })
        }

        $scope.test = ['USA', 'France', 'China', 'Japan', 'Spain', 'Italia']
    })