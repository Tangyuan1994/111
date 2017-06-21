/*
angular.module('daeNG')
    .controller('AlgoController', function ($scope) {

        $scope.value = "Algorithms"

    });
*/
angular.module('daeNG')
    .controller('AlgoController', function ($q, $timeout, $log, $scope) {

        $scope.simulateQuery = false;
        $scope.isDisabled    = false;

        // list of `type` value/display objects
        $scope.types = loadAllTypes();
        $scope.dataset = loadAllDataset();
        $scope.querySearchTypes   = querySearchTypes;
        $scope.querySearchDataset  = querySearchDataset;
        $scope.selectedItemChange = selectedItemChange;
        $scope.searchTextChange   = searchTextChange;


        $scope.newType= newType;

        function newType(type) {
            alert("Sorry! You'll need to create a Constitution for " + type + " first!");
        }

        // ******************************
        // Internal methods
        // ******************************

        /**
         * Search for types... use $timeout to simulate
         * remote dataservice call.
         */
        function querySearchTypes (query) {
            var results = query ? $scope.types.filter( createFilterFor(query) ) : $scope.types,
                deferred;
            if ($scope.simulateQuery) {
                deferred = $q.defer();
                $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }

        function querySearchDataset (query) {
            var results = query ? $scope.dataset.filter( createFilterFor(query) ) : $scope.dataset,
                deferred;
            if ($scope.simulateQuery) {
                deferred = $q.defer();
                $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }

        function searchTextChange(text) {
            $log.info('Text changed to ' + text);
        }

        function selectedItemChange(item) {
            $log.info('Item changed to ' + JSON.stringify(item));
        }

        /**
         * Build `types` list of key/value pairs
         */
        function loadAllTypes() {
            var allTypes = '2B-File, 3A-File, 3B-File, 3G-File, 4B-File';

            return allTypes.split(/, +/g).map( function (type) {
                return {
                    value: type.toLowerCase(),
                    display: type
                };
            });
        }

        function loadAllDataset() {
            var allDataset = '2, 2_B, 3, 3_B, 3_G';

            return allDataset.split(/, +/g).map( function (ds) {
                return {
                    value: ds.toLowerCase(),
                    display: ds
                };
            });
        }

        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(type) {
                return (type.value.indexOf(lowercaseQuery) === 0);
            };

        }

        /**
         * Function for a customized query
         */
        $scope.submitQuery = function(){

        }

        $scope.cancel = function (){
            //console.log("entré")
            //$scope.selectedItem ={};
            $scope.selectedItem1 ="";
            $scope.selectedItem2 ="";
            $scope.selectedItem3 ="";
            $scope.selectedItem4 ="";
            $scope.selectedItem5 ="";

        }
    });
