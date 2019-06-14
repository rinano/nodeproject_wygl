var myApp = angular.module('myApp',[])
myApp.controller('tradesctrl',['$scope','$http',function($scope,$http){
  $scope.viewUser = function(){
    alert('黄西\n手机号：13412345432')
  }
  $scope.updateImg = ()=>{
    prompt('请输入图片地址')
  }
}])