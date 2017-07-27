/**
 * Created by Flow on 24/04/2017.
 */
var browse = angular.module('daeNG');

/*
browse.factory('BrowseFactory', function ($q, elasticsearch, $location) {
    var elasticsearch = require('elasticsearch');
    var client = new elasticsearch.Client({
        host: 'localhost:9200',
        log: 'trace'
    });



    client.ping({
        // ping usually has a 3000ms timeout
        requestTimeout: 1000
    }, function (error) {
        if (error) {
            console.trace('elasticsearch cluster is down!');
        } else {
            console.log('All is well');
        }
    });


    client.search({
        q: 'pants'
    }).then(function (body) {
        var hits = body.hits.hits;
    }, function (error) {
        console.trace(error.message);
    });


    client.search({
        index: 'dae',
        type: 'logs',
        body: {
            query: {
                match: {
                    body: 'elasticsearch'
                }
            }
        }
    }).then(function (resp) {
        var hits = resp.hits.hits;
    }, function (err) {
        console.trace(err.message);
    });


    });
    /!*

*/
/*

    ['$q', 'esFactory', '$location', function($q, elasticsearch, $location){
        var client = elasticsearch({
            host: $location.host() + ":9200"
        });
        console.log ("inf à 6")

        var search = function(term, offset){
            var deferred = $q.defer();
            var query = {
                "match": {
                    "_all": term
                }
            };

            client.search({
                "index": 'dae',
                "body": {
                    "size": 10,
                    "from": (offset || 0) * 10,
                    "query": query
                }
            }).then(function(result) {
                var ii = 0, hits_in, hits_out = [];
                hits_in = (result.hits || {}).hits || [];
                for(;ii < hits_in.length; ii++){
                    hits_out.push(hits_in[ii]._source);
                }
                deferred.resolve(hits_out);
            }, deferred.reject);

            return deferred.promise;
        };

        return {
            "search": search
        };
    }]
);
*!/
*/


browse.controller('BrowseController', function ($scope, $mdMenu, $http, $mdDialog,$location) {

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