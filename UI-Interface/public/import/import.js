angular.module('daeNG')

    .controller('ImportController', function ($scope, $http) {
        $scope.title1 = 'Button';
        $scope.title4 = 'Warn';
        $scope.isDisabled = true;

        $scope.googleUrl = 'http://google.com';


        $scope.fonctiontst = function () {
            console.log("dfhovshdpi");
            $http({
                    method: 'GET',
                    url: 'oracleConnect',

                }
                , function successCallback(response) {
                    console.log(response);
                }, function errorCallBack(error) {
                    console.log(error)
                });

        };


    });