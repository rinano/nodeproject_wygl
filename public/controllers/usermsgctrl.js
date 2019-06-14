var myApp = angular.module('myApp', [])

myApp.controller('viewMsg',['$scope','$http',function($scope,$http){
  $http.get('/viewMsg').success(function(response){
    console.log('获得用户数据')
    $scope.user=response    
  })
  $scope.update=function(){
    console.log('更新用户数据')
    $http.post('/viewMsg/ud' ,$scope.ud).success(function(response){
      $scope.ud=response
    })
  }

  $scope.modify=function(){
    console.log('修改密码')
    $http.post('/viewMsg/md' ,$scope.md).success(function(response){
      $scope.md=response
    })
  }

}])