angular.module('daeNG')
    .controller('SearchController', function ($scope,$stateParams) {

        $scope.value = "Search"
        $scope.test = $stateParams.data.username;
    });