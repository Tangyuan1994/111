/**
 * Created by Flow on 24/04/2017.
 */



/*
angular.module('daeNG')
    .controller('HomeController', ['$scope', function($scope) {
        $scope.customer = {
            name: 'Naomi',
            address: '1600 Amphitheatre'
        };
    }])
    .directive('myCustomer', function() {
        return {
            template: 'Name: {{customer.name}} Address: {{customer.address}}'
        };

    });
*/

angular.module('daeNG')
    .controller('HomeController', function ($scope, $mdMenu) {

        $scope.value = "Home"

    });
