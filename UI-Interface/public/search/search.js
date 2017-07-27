

angular.module('daeNG')
    .controller('SearchController', function ($scope,$http) {
        $scope.browsedImagesTop=new Array();
        $scope.browsedImages=new Array();
        $scope.browsedImages2=new Array();
        $scope.value = "Search"


        $scope.dataSearch = {}

        $scope.chercher = function () {
            // var id = $scope.dataSearch.id
            $http({
                method: 'GET',
                //url: '/searchh/' + id
                url: '/searchh/'
            }).then(function successCallback(response) {
                $scope.image = response.data.image
                console.log($scope.image)
                //console.log(id)
                //console.log(response)
                // console.log("L'image d'ID " + id + " a été récupérée !")
            }, function errorCallback(response) {
                console.log(response)
            });

        };



        $scope.chercher2 = function () {

            //var id1 = "2";
            //var id2 = "d62200215e21c556bd419a035c1515f6";

            // var id = $scope.dataSearch.id

            /* $http({
             method: 'GET',
             url: '/searchhh/'
             }).then(function successCallback(response) {
             console.log(response)
             $scope.image2 = response.data.length;
             $scope.image3 = response.data[1]._source.doc.image;

             //$scope.browsedImagesTop.push(response.data[0]._source.doc.image);
             for(i=1;i<3;i++) {
             $scope.browsedImagesTop.push(response.data[i]._source.doc.image);
             }

             // $scope.browsedImagesTop.push(response.data[3]._source.doc.image);
             // $scope.browsedImagesTop.push(response.data[4]._source.doc.image);


             }, function errorCallback(response) {
             console.log(response)
             });*/




            /*$http({
             method: 'GET',
             url: '/searchhh/'
             }).then(function successCallback(response) {
             console.log(response)
             $scope.image2 = response;
             $scope.image3 = response;

             //$scope.browsedImagesTop.push(response.data[0]._source.doc.image);
             //for(i=1;i<3;i++) {
             // $scope.browsedImagesTop.push(response.data[i]._source.doc.image);
             // }

             // $scope.browsedImagesTop.push(response.data[3]._source.doc.image);
             // $scope.browsedImagesTop.push(response.data[4]._source.doc.image);


             }, function errorCallback(response) {
             console.log(response)
             });
             */


            $http({
                method: 'GET',
                //url: '/searchh/' + id
                url: '/hits/'

            }).then(function successCallback(response) {
                $scope.hits = response
            }, function errorCallback(response) {
                console.log(response)
            });


            for (id=0;id<$scope.hits.data.length;id++) {
                $http({
                    method: 'GET',
                    //url: '/searchh/' + id
                    url: '/image3/' + id

                }).then(function successCallback(response) {

                    $scope.imagee=response.data.image
                    $scope.browsedImages2.push($scope.imagee);


                }, function errorCallback(response) {
                    console.log(response)
                });

            }


        };


        $scope.newSearch = function () {
            //alert('Hello world ')
            $http({
                method:'GET',
                url:'/getImages'
            }).then(function successCallBack(response){
                $scope.image1 = response.data
               // $scope.image1 = response
            })
        }


        $scope.chercher5 = function () {

            $http({
                method:'GET',
                url:'/getTags'
            }).then(function successCallBack(response){
                $scope.Tagg = response.data
                // $scope.image1 = response
            })
        }



        $scope.chercher3 = function () {
            // var id = $scope.dataSearch.id
            $http({
                method: 'GET',
                //url: '/searchh/' + id
                url: '/searc/'
            }).then(function successCallback(response) {

                //$scope.image2 = response.data.image
                //console.log($scope.image2)
                $scope.browsedImages = response.data.rows;
                // $scope.browsedImagesTop = [];
                //  for (var i=0; i< 3; i++){

                //    $scope.browsedImagesTop.push(response.data.rows[i].image);
                // console.log($scope.browsedImagesTop)
                //    }

                //console.log(id)
                //console.log(response)
                // console.log("L'image d'ID " + id + " a été récupérée !")
            }, function errorCallback(response) {
                console.log(response)
            });
        };




    });
