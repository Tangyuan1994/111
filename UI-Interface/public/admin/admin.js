angular.module('daeNG')
    .controller('AdminController', function ($scope, $mdMenu, $http) {

        $scope.getAll = function () {
            $http({
                method: 'GET',
                url: '/datasets/all'
            }).then(function successCallback(response) {
                $scope.browsedImages = response.data.rows;
                console.log($scope.browsedImages)

            }, function errorCallback(response) {
                console.log(response)
            });
        };

        $scope.getOne = function () {
            var id = "5330e2f3a0dd8ee433e3e702df012c19";
            $http({
                method: 'GET',
                url: '/datasets/' + id
            }).then(function successCallback(response) {
                console.log(response.data);
                $scope.browsedImages = [{"value":{}}];
                $scope.browsedImages[0].value.image = response.data.image;
                console.log("L'image d'ID " + id + " a été récupérée !")
            }, function errorCallback(response) {
                console.log(response)
            });
        };

        $scope.addView = function(){
            $http({
                method: 'POST',
                url: 'add/view'
            })
        };

        $scope.initBDD = function(){
            $http({
                method: 'POST',
                url: 'init'
            })
        };

        $scope.initES = function(){
            $http({
                method:'POST',
                url: 'initES'
            })
        }

        $scope.deleteES = function(){
            $http({
                method: 'POST',
                url: 'deleteES'
            })
        }

        $scope.createDatabase = function () {
            var token = $scope.random(10);
            $http({
                method: 'POST',
                url: '/create/newDb/' + token
            })
        }
    });