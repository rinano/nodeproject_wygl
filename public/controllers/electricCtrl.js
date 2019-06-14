var myApp = angular.module('myApp', [])
myApp.controller('electricCtrl',['$scope','$http',function($scope,$http){
  $scope.electric = {now:"0.551",price:"123"}
  $scope.priceSelect = (num)=>{
    console.log(num)
    $scope.electric.price = num
  }
  $scope.add = (price)=>{
    $scope.addElectric = price*$scope.electric.now
    $http.put('/user/electric',$scope.addElectric).success(function(res){
      console.log(res)
    })
    console.log($scope.addElectric)
  }

}])