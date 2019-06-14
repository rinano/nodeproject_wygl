var myApp = angular.module('myApp', [])

myApp.controller('AffCtrl',['$scope','$http',function($scope,$http){

  var refresh= function(){
    $http.get('/viewAff').success(function(response){
      console.log('获得用户数据')
      $scope.affairList=response
      $scope.aff=''    
    })
  }
  refresh()
  $scope.addAffair=function(){
    console.log('发送用户数据')
    $http.post('/viewAff',$scope.aff).success(function(response){
      console.log(response)
      $scope.ad=response
      setTimeout(() => {
        refresh()
      }, 3000);
    })
  }
}])