(function(window, angular, undefined){
  angular.module('app')
  .controller('classCtrl',['$scope', '$http','$state','userSvc','cacheSvc', function($scope, $http, $state,userSvc, cacheSvc){
    
    
      
    var config = {
        headers: {
            'auth-token':userSvc.token
        }
    }
      
    
    
      
    $http.get('/secure-api/class/get_myClasses',config).then(function(response){
        console.log(response);
        $scope.classes = response.data.data;
    },function(err){
        console.log(err);
    })
    
    
    
    $scope.viewClass = function(classInfo){
        
        cacheSvc.classInfo = classInfo;
        localStorage.setItem('classInfo', JSON.stringify(cacheSvc.classInfo));
        $state.go('classDetail');
        console.log(cacheSvc.classInfo);
    }
    
    
      
  }])
})(window, window.angular);