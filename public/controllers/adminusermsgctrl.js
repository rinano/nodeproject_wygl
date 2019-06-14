var myApp = angular.module('myApp', [])

myApp.controller('viewUser',['$scope','$http',function($scope,$http){

  var refresh= function(){
    $http.get('/viewallUser').success(function(response){
      console.log('获得用户数据')
      $scope.userList=response
      $scope.msg=''    
    })
  }
  refresh()
  $scope.editMsg=function(id){
    console.log(id)
    $http.get('/editMsg/'+id).success(function(response){
      $scope.msg=response
    })
  }
  $scope.sendMsg=function(){
    console.log($scope.msg.userid)
    $http.put('/sendMsg/'+$scope.msg.userid,$scope.msg).success(function(response){
      setTimeout(() => {
        refresh()
      }, 3000)
    })
  }

}])