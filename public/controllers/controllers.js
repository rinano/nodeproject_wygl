var myApp=angular.module('myApp',[])
myApp.controller('AppCtrl',['$scope','$http',function($scope,$http){
  var refresh=function(){
    $http.get('/newsList').success(function(response){
      console.log('get data')
      $scope.newsList=response
    })
  }
  refresh()
  $scope.detailsMsg=function(_id){
    console.log(_id)
    /*
    $http.get('/detailsMsg/'+_id).success(function(response){
      console.log(response)
      $scope.Msg=response
      alert($scope.Msg.news)
      $scope.Msg.news=''
    })
    */
    $http.get('/detailsMsg/'+_id)
  }
}])
