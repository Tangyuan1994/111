
angular.module('daeNG')
.controller('ContactController',function($scope,$http){

  $scope.value = "Contact"
  $scope.data=[];
  $scope.email='';
  $scope.subject='';
  $scope.username='';
  $scope.mes='';
  $scope.id = ''


  $scope.add=function(){

    if($scope.username && $scope.email && $scope.subject){

      var username = $scope.username
      var email = $scope.email
      var subject= $scope.subject
      var mes = $scope.mes

      $scope.data.push({
        username:$scope.username,
        email:$scope.email,
        subject:$scope.subject,
        mes:$scope.mes
      });

      // Send data to server
      $http({
        method:'POST',
        url: '/contact/'+username+"/"+email+"/"+subject+"/"+mes
      }).then(function successCallBack(response){

        //Define success callback
        console.log(response)
        console.log('Hello')
      }, function errorCallBack(error){

        //Define error callback
        console.log(error)
      })


      localStorage.username=$scope.username;
      localStorage.email=$scope.email;
      localStorage.subject=$scope.subject;
      localStorage.mes=$scope.mes;


      console.log(localStorage);
      $scope.username='';
      $scope.email='';
      $scope.subject='';
      $scope.mes='';
    }else{
      alert('Please input all of your information');
    }

  };

  $scope.delete=function(index){

    var id =$scope.id
    $scope.data.splice(index,1);
    localStorage.clear();

    $http({
      method:'GET',
      url: '/deleteMsg/'+id
    }).then(function successCallBack(response){

      //Define success callback

    }, function errorCallBack(error){

      //Define error callback
      console.log(error)
    })


  };

  $scope.keyup=function(){
    if(ev.keyCode==13){
      this.add();
    }
  };
});