/**
 * Created by Flow on 24/04/2017.
 */

angular.module('daeNG')
    .controller('BrowseController', function ($scope, $mdMenu, $http, $mdDialog) {

        $scope.value = "Browse Data"
        $scope.typeSort = "popularity"

        $scope.openSortMenu = function($mdMenu, ev) {
            originatorEv = ev;
            $mdMenu.open(ev);
        };

        $scope.changeTypeSort = function(type){
            $scope.typeSort = type
        };

        $scope.zoom = function(ev) {
            //console.log('Hello world ')
            $mdDialog.show({
                scope : $scope,
                preserveScope: true,
                templateUrl: 'browse/zoomPopup.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
                .then(function(answer) {
                    console.log(answer)
                }, function(err){
                    console.log(err)
                });
        };

        $scope.hideTest = function(){
            $mdDialog.hide();
            console.log('Fermeture de la popup')
        }

        $http({
            method: 'GET',
            url: '/datasets/all'
        }).then(function successCallback(response) {
            console.log(response.data)
            $scope.browsedImagesTop = [];
            $scope.browsedImagesBot = [];
            if (response.data.total_rows > 6){
                for (var i=0; i< 6; i++){
                    if (i<3){
                        $scope.browsedImagesTop.push(response.data.rows[i]);
                        console.log($scope.browsedImages)
                    }else {
                        $scope.browsedImagesBot.push(response.data.rows[i]);
                        console.log($scope.browsedImages)
                    }
                }
                console.log("sup à 6")
            }else {
                console.log ("inf à 6")
                console.log("nombre image" , response.data.total_rows);
                for (var i=0; i<response.data.total_rows; i++){
                    if (i<3) {
                        console.log("i<3");
                        $scope.browsedImagesTop.push(response.data.rows[i]);
                        console.log($scope.browsedImagesTop)
                    }else{
                        console.log("i>3");
                        $scope.browsedImagesBot.push(response.data.rows[i]);
                        console.log($scope.browsedImagesBot)
                    }
                }
            }
        }, function errorCallback(response) {
            console.log(response)
        });



    });