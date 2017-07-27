/**
 * Created by Flow on 24/04/2017.
 */

angular.module('daeNG')

    .controller('HomeController', function ($scope, $mdMenu) {

        $scope.user.thePwd='';
        $scope.user.theEmail='';
        $scope.master = {};


        $scope.update = function(user) {
            var firebase = require("firebase");

            var config = {
                apiKey: "AIzaSyBcuwhwkzvIIcEA95THJr3wfzJV56qwunU",
                authDomain: "dae-ng.firebaseapp.com",
                databaseURL: "https://dae-ng.firebaseio.com",
                projectId: "dae-ng",
                storageBucket: "dae-ng.appspot.com",
                messagingSenderId: "445799919658"
            };
            var fb = firebase.initializeApp(config);

            $scope.master = angular.copy(user);
            var pswd = $scope.user.thePwd
            var email = $scope.user.theEmail

            fb.auth().createUserWithEmailAndPassword(email, pswd).catch(function(error) {
                console.log(error);
            });
        };

        $scope.reset = function() {
            $scope.user = angular.copy($scope.master);
        };

        $scope.reset();


        $scope.toggleSignIn= function() {
            var pswd = $scope.user.thePwd
            var email = $scope.user.theEmail

            if (fb.auth().currentUser) {
                fb.auth().signOut();
            } else {
                fb.auth().signInWithEmailAndPassword(email, pswd).catch(function(error) {

                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (firebase.auth().currentUser) {
                        fb.auth().currentUser.sendEmailVerification().then(function () {
                            // Email Verification sent!
                            // [START_EXCLUDE]
                            alert('Email Verification Sent!');
                            // [END_EXCLUDE]
                        });
                    }
                    if (errorCode === 'auth/wrong-password') {
                        alert('Wrong password.');
                    } else {
                        alert(errorMessage);
                    }
                    console.log(error);
                });
            }
        }

    });


angular.module("daeNG")
    .directive('wjValidationError', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctl) {
            scope.$watch(attrs['wjValidationError'], function (errorMsg) {
                elm[0].setCustomValidity(errorMsg);
                ctl.$setValidity('wjValidationError', errorMsg ? false : true);
            });
        }
    };
});

