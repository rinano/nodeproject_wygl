var myApp = angular.module('myApp', ['ui.bootstrap'])
myApp.controller('newctrl',['$scope','$http',function($scope,$http){

  var refresh= function(){
    editor.txt.html('<p>请输入通知内容...</p>')
    $http.get('/viewNew').success(function(response){
      $scope.newsList=response
      $scope.new=''  
      $scope.add=false
      $scope.ud=true
      $scope.new.addDate=new Date()
      $scope.inputDate=false
    })
  }
  refresh()
  $scope.new=''
  $scope.new.addDate=new Date()
  $scope.day='yyyy/MM/dd'
  $scope.inputDay=['yyyy/MM/dd']
  $scope.popupDay={
    opened1:false
  }
  $scope.inputDate=false
  $scope.openDay=function(){
    $scope.popupDay.opened1=true
    $scope.inputDate = !$scope.inputDate
  }
  $scope.openEditor=function(){
    $scope.inputDate=false
  }
  $scope.refreshEditor=function(){
    refresh()
  }  
  $scope.addNew=function(){
    var test=editor.txt.html()
    $scope.new.addNew= test
    console.log($scope.new)
    $http.post('/viewNew',$scope.new).success(function(response){
      setTimeout(() => {
        refresh()
      }, 3000);
    })
  }
  $scope.delectNew=function(id){
    var chooseDel= confirm('是否删除')
    if(chooseDel){
        console.log(id)
        $http.get('/delectNew/'+id).success(function(response){
          setTimeout(() => {
            alert('删除成功')
            refresh()
          }, 3000);
        })

    }else{
      alert('返回')
    }
  }
  $scope.changeNew=function(id){
    $http.get('/changeNew/'+id).success(function(response){
      console.log(response)
      $scope.new=response
      editor.txt.html(response.body)
      $scope.add=true
      $scope.ud=false
    })
  }
  $scope.udNew=function(id){
    console.log(id)
    var test=editor.txt.html()
    $scope.new.addNew= test
    $http.put('/changeNew/'+id,$scope.new).success(function(response){
      setTimeout(() => {
        alert('修改成功')
        refresh()
      }, 3000);
    })
  }
}])