angular.module('daeNG')
    .controller('PersoController', function ($scope, $http) {

        $scope.value = "perso";


        $scope.changeTitle = function () {
            $scope.title = $scope.title + $scope.title
        };


        $scope.user = {};


        $scope.getLname = function () {
            var id = "1a";
            $http({
                method: 'GET',
                url: '/perso/' + id + '/getLname'
            }).then(function successCallback(response) {
                console.log(response.data);
                $scope.user.lname = response.data.lname;
                console.log("Le tableau de lname " + id + " a été récupéré !")
            }, function errorCallback(response) {
                console.log(response)
            });
        };


        $scope.getFname = function () {
            var id = "1a";
            $http({
                method: 'GET',
                url: '/perso/' + id + '/getFname'
            }).then(function successCallback(response) {
                console.log(response.data);
                $scope.user.fname = response.data.fname;
                console.log("Le tableau de fname " + id + " a été récupéré !")
            }, function errorCallback(response) {
                console.log(response)
            });
        };




        $scope.getMail = function () {
            var id = "1a";
            $http({
                method: 'GET',
                url: '/perso/' + id + '/getMail'
            }).then(function successCallback(response) {
                console.log(response.data);
                $scope.user.mail = response.data.mail;
                console.log("Le tableau de mail " + id + " a été récupéré !")
            }, function errorCallback(response) {
                console.log(response)
            });
        };

        $scope.getAff = function () {
            var id = "1a";
            $http({
                method: 'GET',
                url: '/perso/' + id + '/getAff'
            }).then(function successCallback(response) {
                console.log(response.data);
                $scope.user.affiliation = response.data.affiliation;
                console.log("Le tableau de lname " + id + " a été récupéré !")
            }, function errorCallback(response) {
                console.log(response)
            });
        };

        $scope.getPwd = function () {
            var id = "1a";
            $http({
                method: 'GET',
                url: '/perso/' + id + '/getPwd'
            }).then(function successCallback(response) {
                console.log(response.data);
                $scope.user.passWord = response.data.passWord;
                console.log("Le tableau de passWord " + id + " a été récupéré !")
            }, function errorCallback(response) {
                console.log(response)
            });
        };

        $scope.getDate = function () {
            var id = "1a";
            $http({
                method: 'GET',
                url: '/perso/' + id + '/getDate'
            }).then(function successCallback(response) {
                console.log(response.data);
                $scope.user.date = response.data.date.substring(0,16);
                console.log("Le tableau de inscription " + id + " a été récupéré !")
            }, function errorCallback(response) {
                console.log(response)
            });
        };

        $scope.getLname();
        $scope.getFname();
        $scope.getMail();
        $scope.getPwd();
        $scope.getAff();
        $scope.getDate();



        $scope.modifyLname = function () {
            var id = '1a';
            var news = $scope.user.lastname;
            $http({
                method: 'POST',
                url: '/perso/' + id + '/modifyLname/' + news
            }).then(function successCallback(response) {
                console.log(response.data);
            }, function errorCallback(response) {
                console.log(response)
            });
            $scope.user.lastname = "";

        };




        $scope.modifyFname = function () {
            var id = '1a';
            var news = $scope.user.firstname;
            $http({
                method: 'POST',
                url: '/perso/' + id + '/modifyFname/' + news
            }).then(function successCallback(response) {
                console.log(response.data);
            }, function errorCallback(response) {
                console.log(response)
            });
            $scope.user.firstname = "";
        };


        $scope.modifyMail = function () {
            var id = '1a';
            var news = $scope.user.email;
            $http({
                method: 'POST',
                url: '/perso/' + id + '/modifyMail/' + news
            }).then(function successCallback(response) {
                console.log(response.data);
            }, function errorCallback(response) {
                console.log(response)
            });
            $scope.user.email = "";
        };

        $scope.modifyAff = function () {
            var id = '1a';
            var news = $scope.user.aff;
            $http({
                method: 'POST',
                url: '/perso/' + id + '/modifyAffil/' + news
            }).then(function successCallback(response) {
                console.log(response.data);
            }, function errorCallback(response) {
                console.log(response)
            });
            $scope.user.aff = "";
        };

        $scope.modifyPwd = function () {
            var id = '1a';
            var news = $scope.user.pwd1;
            var old = $scope.user.oldPwd;
            $http({
                method: 'POST',
                url: '/perso/' + id + '/modifyPwd/' + old + '/' + news
            }).then(function successCallback(response) {
                console.log(response.data);
            }, function errorCallback(response) {
                console.log(response)
            });
            $scope.user.pwd1 = "";
            $scope.user.pwd2 = "";
            $scope.user.oldPwd="";
        };


        $scope.update = function () {

            $scope.getLname();
            $scope.getFname();
            $scope.getMail();
            $scope.getAff();
            $scope.getPwd();

        };


    })
;