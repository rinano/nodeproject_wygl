var myApp = angular.module('myApp', [])

myApp.controller('AffCtrl',['$scope','$http',function($scope,$http){

  var refresh= function(){
    $http.get('/viewallAff').success(function(response){
      console.log('获得用户数据')
      $scope.affairList=response
      $scope.aff=''    
    })
  }
  refresh()

  $scope.edit=function(id){
    console.log(id)
    $http.get('/affList/'+id).success(function(response){
      $scope.aff=response
    })
  }

  $scope.viewuserMsg=function(userid){
    console.log(userid)
    $http.get('/viewuserMsg/'+userid).success(function(response){
      $scope.viewmsg=response
      alert('姓名：'+$scope.viewmsg.name+'\n'+'单元号：'+$scope.viewmsg.unit+'\n'+'房间号：'+$scope.viewmsg.room+'\n'+'手机号：'+$scope.viewmsg.phone+'\n')
    })
  }

  $scope.udAffair=function(){
    console.log($scope.aff._id)
    $http.put('/affList/staff/'+$scope.aff._id,$scope.aff).success(function(response){
      setTimeout(() => {
        refresh()
      }, 3000)
    })
  }
}])