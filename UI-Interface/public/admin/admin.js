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

        /**
            * --------------------------------------------------------------------------------------------------------------------
            * XML2JS
            * --------------------------------------------------------------------------------------------------------------------
            */

        // $scope.xmlConversion = {}
        // $scope.xmlConversion.xml = "<?xml version='1.0' encoding='UTF-8'?><dataset> <record> <id>1</id> <first_name>Rodrigo</first_name> <last_name>Hewes</last_name> <email>rhewes0@webnode.com</email> <gender>Male</gender> <ip_address>35.121.71.255</ip_address> </record> <record> <id>2</id> <first_name>Aloin</first_name> <last_name>Weatherall</last_name> <email>aweatherall1@people.com.cn</email> <gender>Male</gender> <ip_address>161.53.65.169</ip_address> </record> <record> <id>3</id> <first_name>Gilly</first_name> <last_name>Spikins</last_name> <email>gspikins2@free.fr</email> <gender>Female</gender> <ip_address>144.156.57.161</ip_address> </record> <record> <id>4</id> <first_name>Chaddy</first_name> <last_name>Waterstone</last_name> <email>cwaterstone3@nature.com</email> <gender>Male</gender> <ip_address>143.174.240.24</ip_address> </record> <record> <id>5</id> <first_name>Lea</first_name> <last_name>Kohnemann</last_name> <email>lkohnemann4@state.gov</email> <gender>Female</gender> <ip_address>20.212.142.23</ip_address> </record> <record> <id>6</id> <first_name>Jackqueline</first_name> <last_name>Debenham</last_name> <email>jdebenham5@indiegogo.com</email> <gender>Female</gender> <ip_address>170.168.233.9</ip_address> </record> <record> <id>7</id> <first_name>Susanetta</first_name> <last_name>Yuryichev</last_name> <email>syuryichev6@jigsy.com</email> <gender>Female</gender> <ip_address>126.138.180.216</ip_address> </record> <record> <id>8</id> <first_name>Devlin</first_name> <last_name>Howden</last_name> <email>dhowden7@yolasite.com</email> <gender>Male</gender> <ip_address>175.7.189.239</ip_address> </record> <record> <id>9</id> <first_name>Thebault</first_name> <last_name>Aspinal</last_name> <email>taspinal8@dell.com</email> <gender>Male</gender> <ip_address>111.225.97.10</ip_address> </record> <record> <id>10</id> <first_name>Krissy</first_name> <last_name>Felgate</last_name> <email>kfelgate9@patch.com</email> <gender>Female</gender> <ip_address>195.189.4.112</ip_address> </record> </dataset>"
        // $scope.xmlConversion.json = ""
        //
        // $scope.jsonConversion = {}
        // $scope.jsonConversion.json = [{
        //     "id": 1,
        //     "first_name": "Aurelia",
        //     "last_name": "Tille",
        //     "email": "atille0@simplemachines.org",
        //     "gender": "Female",
        //     "ip_address": "187.104.105.17"
        // }, {
        //     "id": 2,
        //     "first_name": "Eamon",
        //     "last_name": "Rude",
        //     "email": "erude1@boston.com",
        //     "gender": "Male",
        //     "ip_address": "239.28.63.6"
        // }, {
        //     "id": 3,
        //     "first_name": "Duff",
        //     "last_name": "Sinkins",
        //     "email": "dsinkins2@msn.com",
        //     "gender": "Male",
        //     "ip_address": "115.166.93.147"
        // }, {
        //     "id": 4,
        //     "first_name": "Korry",
        //     "last_name": "Clarridge",
        //     "email": "kclarridge3@constantcontact.com",
        //     "gender": "Female",
        //     "ip_address": "125.199.121.154"
        // }, {
        //     "id": 5,
        //     "first_name": "Benjamin",
        //     "last_name": "Robb",
        //     "email": "brobb4@hao123.com",
        //     "gender": "Male",
        //     "ip_address": "150.132.31.179"
        // }, {
        //     "id": 6,
        //     "first_name": "Eugenio",
        //     "last_name": "Craven",
        //     "email": "ecraven5@tumblr.com",
        //     "gender": "Male",
        //     "ip_address": "41.36.21.140"
        // }, {
        //     "id": 7,
        //     "first_name": "Rozella",
        //     "last_name": "Lebourn",
        //     "email": "rlebourn6@360.cn",
        //     "gender": "Female",
        //     "ip_address": "100.249.231.166"
        // }, {
        //     "id": 8,
        //     "first_name": "Bryan",
        //     "last_name": "McGrail",
        //     "email": "bmcgrail7@state.tx.us",
        //     "gender": "Male",
        //     "ip_address": "30.40.198.142"
        // }, {
        //     "id": 9,
        //     "first_name": "Anjela",
        //     "last_name": "Crusham",
        //     "email": "acrusham8@yellowpages.com",
        //     "gender": "Female",
        //     "ip_address": "88.132.157.241"
        // }, {
        //     "id": 10,
        //     "first_name": "Janella",
        //     "last_name": "Pavie",
        //     "email": "jpavie9@imdb.com",
        //     "gender": "Female",
        //     "ip_address": "184.130.157.3"
        // }]
        // $scope.jsonConversion.xml = ""
        //
        // $scope.xml2json = function(){
        //     console.log("Hello world !")
        //     $http({
        //         method:'GET',
        //         url: 'parseXML/'+$scope.xmlConversion.xml
        //     }).then(function successCallBack(response){
        //         $scope.xmlConversion.json = response.data;
        //     })
        // }
        //
        // $scope.json2xml = function(){
        //     console.log("Hello world !")
        //     $http({
        //         method:'GET',
        //         url: 'parseJSON/'+$scope.jsonConversion.json
        //     }).then(function successCallBack(response){
        //         $scope.jsonConversion.xml = response.data;
        //     })
        // }
    });