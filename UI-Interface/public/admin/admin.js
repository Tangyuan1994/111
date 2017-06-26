angular.module('daeNG')
    .controller('AdminController', function ($scope, $mdMenu, $http) {

        $scope.getAll = function () {
            $http({
                method: 'GET',
                url: '/datasets/all'
            }).then(function successCallback(response) {
                $scope.rates = [];
                $scope.tags = [];
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
                $scope.rates = [];
                $scope.tags = [];
                $scope.browsedImages = [{"value": {}}];
                $scope.browsedImages[0].value.image = response.data.image;
                console.log("L'image d'ID " + id + " a été récupérée !")
            }, function errorCallback(response) {
                console.log(response)
            });
        };

        $scope.addView = function () {
            $http({
                method: 'POST',
                url: 'add/view'
            })
        };

        $scope.initBDD = function () {
            $http({
                method: 'POST',
                url: 'init'
            })
        };

        $scope.initBDDImages = function () {
            $http({
                method: 'POST',
                url: 'initBDDImages'
            })
        };

        $scope.initES = function () {
            $http({
                method: 'POST',
                url: 'initES'
            })
        };

        $scope.deleteES = function () {
            $http({
                method: 'POST',
                url: 'deleteES'
            })
        };

        $scope.test = function () {
            $http({
                method: 'POST',
                url: '/upload/a/a/a/a'
            })
        };

        $scope.createDatabase = function () {
            var token = $scope.random(10);
            $http({
                method: 'POST',
                url: '/create/newDb/' + token
            })
        };

        $scope.getTags = function () {
            var id = "5330e2f3a0dd8ee433e3e702df012c19";
            $http({
                method: 'GET',
                url: '/document/' + id + '/getTags'
            }).then(function successCallback(response) {
                console.log(response.data);
                $scope.browsedImages = [{"value": {}}];
                $scope.rates = [];
                $scope.tags = response.data.tags;
                console.log("Le tableau de tags de l'ID " + id + " a été récupéré !")
            }, function errorCallback(response) {
                console.log(response)
            });
        };

        $scope.getRates = function () {
            var id = "5330e2f3a0dd8ee433e3e702df012c19";
            $http({
                method: 'GET',
                url: '/document/' + id + '/getRates'
            }).then(function successCallback(response) {
                //console.log("Get Rates")
                console.log(response.data);
                $scope.browsedImages = [{"value": {}}];
                $scope.tags = [];
                $scope.rates = response.data.rates;
                console.log("Le tableau de notes de l'ID " + id + " a été récupéré !")
            }, function errorCallback(response) {
                console.log(response)
            });
        };

        $scope.addTag = function () {
            var id = "5330e2f3a0dd8ee433e3e702df012c19";
            var tag = "test3";
            $http({
                method: 'POST',
                url: '/document/' + id + '/addTag/' + tag
            }).then(function successCallback(response) {
                console.log(response.data);
            }, function errorCallback(response) {
                console.log(response)
            });
        };

        $scope.addRates = function () {
            console.log("entree");
            var id = "5330e2f3a0dd8ee433e3e702df012c19";
            var rate = 56;
            $http({
                method: 'POST',
                url: '/document/' + id + '/addRate/' + rate
            }).then(function successCallback(response) {
                console.log(response.data);
            }, function errorCallback(response) {
                console.log(response)
            });
        };


        $scope.modifyTag = function () {
            var id = "5330e2f3a0dd8ee433e3e702df012c19";
            var tag1 = "Test3";
            var tag2 = "Test4";
            $http({
                method: 'POST',
                url: '/document/' + id + '/modifyTag/' + tag1 + '/' + tag2
            }).then(function successCallback(response) {
                console.log(response.data);
            }, function errorCallback(response) {
                console.log(response)
            });
        };

        $scope.modifyRates = function () {
            var id = "5330e2f3a0dd8ee433e3e702df012c19";
            var rate1 = 56;
            var rate2 = 0;
            $http({
                method: 'POST',
                url: '/document/' + id + '/modifyRate/' + rate1 +'/' + rate2
            }).then(function successCallback(response) {
                console.log(response.data);
            }, function errorCallback(response) {
                console.log(response)
            });

        };

        $scope.deleteTag = function () {
            var id = "5330e2f3a0dd8ee433e3e702df012c19";
            var tag = "Test3";
            $http({
                method: 'POST',
                url: '/document/' + id + '/deleteTag/' + tag
            }).then(function successCallback(response) {
                console.log(response.data);
            }, function errorCallback(response) {
                console.log(response)
            });
        };

        $scope.deleteRate = function () {
            var id ="5330e2f3a0dd8ee433e3e702df012c19";
            var rate = "56";
            $http({
                method: 'POST',
                url: '/document/' + id + '/deleteRate/' + rate
            }).then(function successCallback(response) {
                console.log(response.data);
            }, function errorCallback(response) {
                console.log(response)
            });
        };

        $scope.connectSsh = function () {
            var username = "cpineau"
            var privateKey = ""

        }

        /**
         * --------------------------------------------------------------------------------------------------------------------
         * SECURITY
         * --------------------------------------------------------------------------------------------------------------------
         */

        $scope.firebaseLogin = function(number){
            if (number==1){
                var username = "capfloy77@gmail.com";
                var password = "123456";
            } else {
                var username = "florian.bertot@depinfonancy.net";
                var password = "123456";
            }
            $http({
                method: 'GET',
                url: '/connexion/'+username+'/'+password
            }).then(function successCallBack(response){
                console.log(response.data)
                $scope.getToken(response.data)
            }, function errorCallBack(err){
                console.log(err)
            })
        }

        $scope.firebaseCreate = function(){
            var username = "capfloy77@gmail.com";
            var password = "123456";
            $http({
                method: 'POST',
                url: '/createAccount/'+username+'/'+password
            }).then(function successCallBack(response){
                console.log(response)
            }, function errorCallBack(err){
                console.log(err)
            })
        }

        $scope.firebaseLogout = function(){
            $http({
                method: 'GET',
                url: 'logOut'
            }).then(function successCallBack(response){
                console.log(response)
            }, function errorCallBack(err){
                console.log(err)
            })
        };

        $scope.firebaseIsConnected = function(){
            $http({
                method: 'GET',
                url: '/isConnected/'
            }).then(function successCallBack(response){
                console.log(response.data)
                if (response.data != null){

                }
            }, function errorCallBack(err){
                console.log(err)
            })
        }

        $scope.firebaseToken = function() {
            $http({
                method: 'GET',
                url: 'tokens'
            }).then(function successCallBack(response) {
                $scope.tokenArray = response.data
                console.log(response)
            }, function errorCallBack(err) {
                console.log(err)
            })
        }

        $scope.requestToken = function(token){
            console.log()
            $http({
                method:'GET',
                url: '/getData/'+token
            }).then(function successCallBack(response){
                $scope.dataToken = response.data;
            })
        }

        $scope.checkToken = function(taille){
            var token = $scope.random(taille);
            $http({
                method: 'GET',
                url: '/checkToken/'+token
            })
        }
    });