angular.module('daeNG')
    .controller('SearchController', function ($scope,$http) {

        $scope.value = "Search"


        $scope.dataSearch = {}
        $scope.chercher = function () {
            var id = $scope.dataSearch.id
            $http({
                method: 'GET',
                url: '/search/' + id
            }).then(function successCallback(response) {

                $scope.image = response.data.image
                console.log($scope.image)
                console.log(id)
                //console.log(response)
                console.log("L'image d'ID " + id + " a été récupérée !")
            }, function errorCallback(response) {
                console.log(response)
            });
        };
    });
