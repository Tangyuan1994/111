/**
 * Created by Flow on 24/04/2017.
 */

angular.module('daeNG')

    .controller('HomeController', function ($scope,$http, $window) {

      $scope.master = {};
      $scope.user.theName='';
      $scope.user.thePwd='';
      $scope.user.theEmail = ''

      $scope.update = function(user) {
        var username=$scope.user.theName
        var email=$scope.user.theEmail
        var password= $scope.user.thePwd
        console.log( "username est:"+username)
        console.log( "email est:"+email)
        $scope.master = angular.copy(user);

        //$window.open('http://www.google.fr', 'C-Sharpcorner', 'width=500,height=400');
        //$window.open('home/home2.html', 'C-Sharpcorner', 'width=500,height=400');
        $http({
          method:'POST',
          url: '/homeCreateAccount/'+username+"/"+email
        }).then(function successCallBack(response){
          //console.log("Server Response: " + response)
          console.log('Hello1')
        }, function errorCallBack(error){
          console.log('Hello2')
          //console.log("Account creation Error " + error.message)
        })
      };

        $scope.reset = function() {
            $scope.user = angular.copy($scope.master);
        };

        $scope.reset();



      $scope.toggleSignIn = function(user) {
        var username=$scope.user.theName
        var email=$scope.user.theEmail
        var password= $scope.user.thePwd

        $scope.master = angular.copy(user);

        $http({
          method:'POST',
          url: '/homeSignIn/'+username+"/"+email
        }).then(function successCallBack(response){
          console.log(response)
          console.log('Hello')
        }, function errorCallBack(error){
          console.log(error)
        })


      };

