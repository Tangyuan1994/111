/**
 * Created by Flow on 24/04/2017.
 */

angular.module('daeNG')
    .controller('BrowseController', function ($scope, $mdMenu) {
        
        $scope.value = "Browse Data"
        $scope.typeSort = "popularity"

        $scope.openSortMenu = function($mdMenu, ev) {
            originatorEv = ev;
            $mdMenu.open(ev);
        };
        
        $scope.changeTypeSort = function(type){
            $scope.typeSort = type
        }


    });